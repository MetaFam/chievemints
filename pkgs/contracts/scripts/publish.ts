import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import hre from 'hardhat'
import JSON5 from 'json5'

type PubParams = { name: string, container: string }

const shortDir = (path: string) => {
  const [, start] = process.env.PWD?.match(/^(.*\/packages\/).*$/) ?? []
  if(path.startsWith(start)) {
    path = path.substring(start.length)
  }
  return path
}

let publishDir = path.join(
  process.cwd(),
  '../ui/src/contracts/',
  hre.network.name,
)
let artifactsDir = hre.config.paths.artifacts
const [, sourceDir = 'contracts'] = (
  hre.config.paths.sources.match(/^.*\/([^\/]+)\/?$/) ?? []
)

const graphDir = path.join(process.cwd(), '../subgraph')

const publishContract = ({ name, container }: PubParams) => {
  console.log(
    `\n 💽 Publishing ${chalk.cyan(name)}`
    + ` to ${chalk.gray(shortDir(publishDir))}`
  )
  try {
    const contractJSON = path.join(
      artifactsDir, sourceDir,
      `${container}.sol/${name}.json`,
    )
    console.log(
      `\n 📖 Reading: ${chalk.magentaBright(shortDir(contractJSON))}`
    )  
    let contract = (
      JSON.parse(fs.readFileSync(contractJSON).toString())
    )

    const addressJSON = (
      `${artifactsDir}/${name}.address`
    )
    console.log(
      ` 📖 Reading: ${chalk.greenBright(shortDir(addressJSON))}`
    )  
    const address = (
      fs.readFileSync(addressJSON).toString().trim()
    )

    // let graphConfigPath = `${graphDir}/config/config.json`
    // let graphConfig
    // try {
    //   if (fs.existsSync(graphConfigPath)) {
    //     graphConfig = (
    //       fs.readFileSync(graphConfigPath).toString()
    //     )
    //   } else {
    //     graphConfig = '{}'
    //   }
    // } catch (e) {
    //   console.error(e)
    // }
    // graphConfig = JSON.parse(graphConfig)
    // graphConfig[contractName + 'Address'] = address

    const outs = {
      [`${publishDir}/${name}.address.ts`]: (
        `export default '${address}'`
      ),
      [`${publishDir}/${name}.abi.ts`]: (
        `export default ${JSON5.stringify(contract.abi, null, 2)}`
      ),
      // [`${publishDir}/${contractName}.bytecode.ts`]: (
      //   `export default '${contract.bytecode}'`
      // ),
      
      // [graphConfigPath]: JSON.stringify(graphConfig, null, 2),
      // [`${graphDir}/abis/${contractName}.json`]: (
      //   JSON.stringify(contract.abi, null, 2)
      // ),
    }
    Object.entries(outs).forEach(([file, content]) => {
      const dir = path.dirname(file)
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true })
      }
  
      console.info(
        ` 💁 Writing: ${chalk.hex('#FF8D1A')(shortDir(file))}`
      )
      fs.writeFileSync(file, content)
    })

    console.log(
      `\n 📠 Published ${chalk.green(name)} to the frontend.`
    )

    return true
  } catch (e) {
    console.error(e)
    if(/no such file or directory/i.test((e as Error).message)) {
      console.log(chalk.yellowBright(
        ` ⚠️  Can't find ${name}.json. (Is it deployed?)`
      ))
    } else {
      console.error(e)
    }
    return false
  }
}

async function main() {
  if(!fs.existsSync(publishDir)) {
    fs.mkdirSync(publishDir, { recursive: true })
  }
  const finalContractList: Array<PubParams> = []
  const parent = path.join(artifactsDir, sourceDir)
  fs.readdirSync(parent).forEach(
    (file) => {
      if(file.endsWith('.sol')) {
        const container = file.replace(/\..+?$/, '')
        fs.readdirSync(`${parent}/${file}`).forEach(
          (sub) => {
            if(/^[^.]+.json$/.test(sub)) {
              const name = sub.replace(/\..+?$/, '')
              const params = { name, container }
              if(publishContract(params)) {
                finalContractList.push(params)
              }
            }
          }
        )
      }
    }
  )
  // fs.writeFileSync(
  //   `${publishDir}/index.ts`,
  //   `export default ${JSON5.stringify(finalContractList, null, 2)}`
  // )
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error)
  process.exit(1)
})
