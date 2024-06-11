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
import ns from '../styles/new.module.css'

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
    ensClient, roContract, rwContract, rolesLibrary,
    connecting, address, contractClient,
  } = useWeb3()
  const [search] = useSearchParams({ tokenId: '' })
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
        const numRoles = (await rolesLibrary(
          'roleIndexForName', ['ReservedLast']
        )) as number - 1
        const roles: Array<string> = await Promise.all(
          Array.from({ length: numRoles }).map(async (_, idx) => (
            await rolesLibrary('roleNameByIndex', [idx + 1]) as string
          ))
        )
        setRoles(roles)
      }
    }

    load() // load static list to avoid extraneous permissions
  }, [roContract, rolesLibrary])

  const reserve = useCallback(async (data: Record<string, unknown>) => {
    setWorking(true)

    try {
      if(!rwContract) {
        throw new Error('Connect your wallet to reserve an id.')
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
            console.debug({ rolesLibrary})
            const roleId = (
              await rolesLibrary('roleIndexForName', [role]) as number
            )
            if(isNaN(roleId)) {
              throw new Error(`Invalid role id for ${type}: ${role}`)
            }
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
        if(!ensClient) {
          throw new Error('ENS provider not defined.')
        }
        maintainer = (
          (await ensClient.getEnsName({ address: maintainer as '0x{string}' }))
          ?? undefined
        )
      }
      console.debug({ maintainer, grants, disables })
      const hash = await rwContract(
        'create', [maintainer, grants, disables]
      ) as '0x{string}'
      const receipt = await contractClient.waitForTransactionReceipt({ hash })
      console.debug({ receipt })
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
      console.error({ error })
    } finally {
      setWorking(false)
    }
  }, [address, contractClient, ensClient, rolesLibrary, rwContract])

  if(!rwContract || !tokenId || working) {
    return (
      <main id={ns.new}>
        <h1>Create a New Token Type</h1>
        {(() => {
          if(connecting) {
            return (
              <section>
                <CircleLoader color="#FF7301" size={100}/>
                <h2>Connecting…</h2>
              </section>
            )
          }
          if(working) {
            return (
              <section>
                <CircleLoader color="#6EA8FF" size={100}/>
                <h2>Reserving your token…</h2>
              </section>
            )
          }
          if(!tokenId) {
            return (
              <form onSubmit={handleSubmit(reserve)}>
                <label id={ns.admin}>
                  <h2>Admin</h2>
                  <input
                    {...register('maintainer')}
                    placeholder="Maintainer Address (default Creator)"
                  />
                </label>
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
                  className="full"
                  requireStorage={false}
                />
              </form>
            )
          }
          return (
            <p>¿How’d we get here?</p>
          )
        })()}
      </main>
    )
  }

  return (
    <OptionsForm {...{ tokenId }}/>
  )
}

export default New