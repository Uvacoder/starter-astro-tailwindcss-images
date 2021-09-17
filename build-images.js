const fs = require('fs/promises')
const { join, parse } = require('path')
const ImageHandler = require('responsiv-image-handler')

const publicPath = '/images'
const outputPath = join(__dirname, `public${publicPath}`)
const imagesPath = join(__dirname, `src/images`)
const handler = new ImageHandler({
  publicPath,
  outputPath,
})

const imageExts = ['jpg', 'png']

async function run() {
  await handler.clear()
  const files = await fs.readdir(imagesPath)
  const images = files.filter((name) => {
    const path = parse(name)
    const ext = path.ext.replace('.', '')
    return imageExts.some((e) => e === ext)
  })
  let manifest = {}
  for await (const img of images) {
    const info = await handler.optimizeImagePath(`${imagesPath}/${img}`)
    manifest[img] = info
  }
  await fs.writeFile(`${outputPath}/manifest.json`, JSON.stringify(manifest))
  console.log(`Optimized ${Object.keys(manifest).length} images`)
}
run()
