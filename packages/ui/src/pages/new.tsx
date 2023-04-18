import React, { useCallback, useEffect, useState } from 'react'
import { Event } from 'ethers'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom'
import { OptionsForm, Header, SubmitButton } from '@/components'
import { useWeb3 } from '@/lib/hooks'
import { extractMessage } from '@/lib/helpers'
import { rolePermissions, tokenPermissions } from '@/config'
import { CircleLoader } from 'react-spinners'
import Tippy from '@tippyjs/react'
import { toast } from 'react-toastify'
import '../styles/new.css'

export const New = () => (
  <section>
    <Helmet>
      <title>’𝖈𝖍𝖎𝖊𝖛𝖊: Ⲛⲉⲱ Ⲧⲟⲕⲉⲛ</title>
    </Helmet>
    <Header/>
    <Content/>
  </section>
)

const Content: React.FC = () => {
  const {
    ensProvider, roContract, rwContract, rolesLibrary,
    connecting, connect, chain, address,
  } = useWeb3()
  const [search, setSearch] = useSearchParams({ tokenId: '' })
  const id = search.get('tokenId')
  const [tokenId, setTokenId] = (
    useState(Array.isArray(id) ? id[0] : id)
  )
  const [roles, setRoles] = (
    useState<Array<string>>(tokenPermissions)
  )
  const [working, setWorking] = useState(false)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if(typeof id === 'string') {
      setTokenId(id)
    }
  }, [id])

  useEffect(() => {
    const load = async () => {
      if(roContract) {
        const numRoles = (await rolesLibrary.roleIndexForName('ReservedLast')) - 1
        const roles: Array<string> = await Promise.all(
          Array.from({ length: numRoles }).map(async (_, idx) => (
            await rolesLibrary.roleNameByIndex(idx + 1)
          ))
        )
        setRoles(roles)
      }
    }

    // load() // load static list to avoid extraneous permissions
  }, [roContract])

  const reserve = useCallback(async (data: Record<string, unknown>) => {
    setWorking(true)

    try {
      if(!rwContract) {
        throw new Error(
          'Connect your wallet to reserve an id.'
        )
      }
      if(!rolesLibrary){
        throw new Error('Library not loaded.')
      }
      const grants: Array<number> = []
      const disables: Array<number> = []
      await Promise.all(Object.entries(data).map(
        async ([key, value]: [key: string, value: unknown]) => {
          if(typeof value === 'boolean' && value) {
            const [, type, role] = key.match(/^(grant|disable)\((.+)\)$/) ?? []
            const roleId = await rolesLibrary.roleIndexForName(role)
            switch(type) {
              case 'grant': {
                grants.push(roleId)
                break
              }
              case 'disable': {
                disables.push(roleId)
                break
              }
              default: {
                throw new Error(`Unknown operation: ${type}`)
              }
            }
          }
        }
      ))

      let { maintainer }: { maintainer?: string } = data
      if(maintainer === '') {
        maintainer = address
      }
      if(maintainer == null) {
        throw new Error('`maintainer` is not set.')
      }
      if(maintainer.includes('.')) {
        if(!ensProvider) {
          throw new Error('ENS provider not defined.')
        }
        maintainer = (
          (await ensProvider.resolveName(maintainer))
          ?? undefined
        )
      }
      const tx = await rwContract['create(address,uint8[],uint8[])'](
        maintainer, grants, disables
      )
      const receipt = await tx.wait()
      const event = receipt.events.find(
        (evt: Event) => evt.event === 'Created'
      )
      if(!event) {
        throw new Error(
          'Couldn’t find a creation event.'
        )
      }
      const [id] = event.args
      setTokenId(id.toHexString())
    } catch(error) {
      toast.error(extractMessage(error))
      console.error((error as Error).stack)
    } finally {
      setWorking(false)
    }
  }, [address, ensProvider, rolesLibrary, rwContract])

  if(!rwContract || !tokenId || working) {
    return (
      <main>
        <div className="flexCol">
          <h1>Create a New Token Type</h1>
          {(() => {
            if(connecting) {
              return (
                <section>
                  <CircleLoader color="#FF7301" size={100}/>
                  <p>Connecting…</p>
                </section>
              )
            }
            if(working) {
              return (
                <section>
                  <CircleLoader color="#6EA8FF" size={100}/>
                  <p>Reserving your token…</p>
                </section>
              )
            }
            if(!tokenId) {
              return (
                <form onSubmit={handleSubmit(reserve)}>
                  <div>
                    <label>Admin</label>
                    <input
                      {...register('maintainer')}
                      placeholder="Maintainer Address (default Creator)"
                    />
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>
                          <Tippy content="Give the admin these roles:">
                            <span>Grant</span>
                          </Tippy>
                        </th>
                        <th>
                          <Tippy content="Prevent these permissions from being checked:">
                            <span>Disable</span>
                          </Tippy>
                        </th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((role, idx) => (
                        <tr key={idx}>
                          <td>{role}</td>
                          <td>
                            <input type="checkbox" {...register(`grant(${role})`)}/>
                          </td>
                          <td>
                            <input type="checkbox" {...register(`disable(${role})`)}/>
                          </td>
                          <td>
                            {rolePermissions[role as keyof typeof rolePermissions]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <SubmitButton
                    purpose="create"
                    label="Reserve an ID"
                    requireStorage={false}
                  />
                </form>
              )
            }
            return (
              <p>¿How’d we get here?</p>
            )
          })()}
        </div>
      </main>
    )
  }

  return (
    <OptionsForm {...{ tokenId }}/>
  )
}

export default New