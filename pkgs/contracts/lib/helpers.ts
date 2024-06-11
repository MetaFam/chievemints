import glob from 'glob'
import fs from 'fs'
import chalk from 'chalk'
import type { ethers as Ethers } from 'ethers'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import { HardhatUserConfig } from 'hardhat/types'

/* This function is copied over from the `ui` package
 * because I couldn't get TypeScript to import it
 * correctly. Ideally, this should be shared from
 * `@chievemints/ui/lib/helpers`.
 */
export const deregexify = (str?: string) => {
  if(!str) return str

  const matches = str.split(/(\w\{\d+\})/)
  const expanded = matches.map((m: string) => {
    const [_, char, count] = m.match(/^(.)\{(\d+)\}/) ?? []
    if(char && count) {
      return char.repeat(Number(count))
    } else {
      return m
    }
  })
  return expanded.join('')
}

export const load = (
  { filenameBase, ethers, config }:
  {
    filenameBase: string
    ethers: typeof Ethers & HardhatEthersHelpers
    config: HardhatUserConfig
  }
) => {
  const srcDir = config?.paths?.sources?.replace(/^.*\/([^\/]+)\/?$/, '$1')
  if (!srcDir) throw new Error('ERROR - could not find source directory')
  const contractsHome = `${config?.paths?.artifacts}/${srcDir}/`
  const [contractFile] = (
    glob.sync(`${contractsHome}/*/${filenameBase}`)
    .filter((name) => !/\.dbg\.json$/.test(name))
  )
  const { abi, contractName } = JSON.parse(
    fs.readFileSync(contractFile).toString()
  )
  const address = (
    fs.readFileSync(
      `${config?.paths?.artifacts}/${contractName}.address`
    )
    .toString()
    .trim()
  )
  console.debug(
    ` 🦐 Loaded ${chalk.hex('#88C677')(contractName)} From:`
    + ` ${chalk.hex('#E59AF9')(contractFile)}`
    + ` at ${chalk.hex('#E59AF9')(address)}`
  )
  const contract = new ethers.Contract(
    address, abi, ethers.provider.getSigner()
  )

  return { abi, address, name: contractName, contract }
}
