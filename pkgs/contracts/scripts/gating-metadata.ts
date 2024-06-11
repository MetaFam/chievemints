#!/usr/bin/env node
// @ts-nocheck

import path from 'path'
// import { fileURLToPath } from 'url'
import { CarReader } from '@ipld/car'
import glob from 'glob'
import JSON5 from 'json5'
import chalk from 'chalk'
import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import { packToFs } from 'ipfs-car/pack/fs'
import { FsBlockStore } from 'ipfs-car/blockstore/fs'
import hardhat from 'hardhat'
import { load } from '../lib/helpers'

const { config, ethers } = hardhat
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
const artifactsDir = config.paths.artifacts

const capitalize = (str) => (
  str.replace(
    /\w\S*/g,
    (w) => (
      w.replace(/^\w/, (c) => c.toUpperCase())
    )
  )
)

const main = async () => {
  if(!process.env.NFT_STORAGE_API_KEY) {
    throw new Error('Missing `NFT_STORAGE_API_KEY`.')
  }
  const storage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })

  const { contract } = load({ filenameBase: 'Bulk*', ethers, config })
  const metadataDir = path.join(__dirname, '../metadata')
  const assetsDir = path.join(metadataDir, 'assets')
  const assetsCar = path.join(metadataDir, 'assets.car')

  const relative = (path) => {
    const CWD = process.cwd()
    if(path.startsWith(CWD)) {
      path = path.substring(CWD.length)
      path = path.replace(/^\//, '')
    }
    return path
  }

  const carResult = await packToFs({
    input: assetsDir,
    output: assetsCar,
    blockstore: new FsBlockStore(),
    wrapWithDirectory: false,
  })

  const assetsCID = carResult.root.toString()
  console.info(
    ` 🎼 Saved contents of ${chalk.hex('#FF7011')(relative(assetsDir))}`
    + ` to ${chalk.hex('#4CFF0B')(relative(assetsCar))}`
    + ` with root ${chalk.hex('#9E59FF')(assetsCID)}.`
  )

  const nftStorageAssetsCID = await storage.storeCar(
    await CarReader.fromIterable(
      fs.createReadStream(carResult.filename)
    )
  )
  console.info(
    ` 🍿 Uploaded ${chalk.hex('#4CFF0B')(relative(assetsCar))}`
    + ` with root ${chalk.hex('#9E59FF')(nftStorageAssetsCID)}.`
  )

  const templates = path.join(metadataDir, 'templates', '*.json5')
  const files = await Promise.all(  
    glob.sync(templates).map(async (file) => {
      const type = file.replace(/^.*\//, '').replace(/\.json5$/, '')
      console.debug(
        ` 🤖 Loading ${chalk.hex('#FF40CC')(type.toUpperCase())} template:`
        + ` ${chalk.hex('#FFF01D')(relative(file))}.`
      )
      const template = await JSON5.parse(
        await fs.promises.readFile(file)
      )
      ;['image', 'animation_url'].forEach((prop) => {
        if(template[prop]) {
          template[prop] = (
            template[prop].replace(/\{assets-cid\}/g, assetsCID)
          )
        }
      })
      return new File(
        [JSON.stringify(template, null, 2)],
        `${type}.json`,
        { type: 'application/json' },
      )
    })
  )

  console.log(' 🍤 Uploading to //nft.storage.')

  const metadataCID = await storage.storeDirectory(files)
  console.info(
    ` 🍿 Transformed ${chalk.hex('#4CFF0B')(relative(templates))}`
    + ` & uploaded to root ${chalk.hex('#9E59FF')(metadataCID)}.`
  )
  const { contract: rolesLibrary } = (
    load({ filenameBase: 'Roles*', ethers, config })
  )
  for(const file of files) {
    const type = file.name.replace(/\.json$/, '')
    const typeId = await rolesLibrary.roleIndexForName(capitalize(type))  
    const tokenId = await contract['roleToken(uint8)'](typeId)

    if(!tokenId) {
      console.debug(
        `Couldn't find \`${type}\` on ${contractName}.`
      )
    } else {
      const uri = `ipfs://${metadataCID}/${file.name}`
      const hex = (
        tokenId.toHexString()
        .replace(/^0x/, '')
        .padStart(64, '0')
        .toUpperCase()
      )
      const existing = await contract.uri(tokenId)
      if(existing === uri) {
        console.info(
          ` ✴ Token URI for`
          + ` ${chalk.hex('#6E9AFF')(`0x${hex}`)}`
          + ` already set to ${chalk.hex('#FF069C')(uri)}.`
        )
      } else {
        console.info(
          ` ✂ Setting token id`
          + ` ${chalk.hex('#6E9AFF')(`0x${hex}`)}`
          + ` URI to ${chalk.hex('#FF069C')(uri)}.`
        )
        const tx = await contract.setURI(tokenId, uri)
        await tx.wait()
      }
    }
  }
}

main()
.then(() => process.exit(0))
.catch((err) => {
  console.error(err)
  process.exit(2)
})