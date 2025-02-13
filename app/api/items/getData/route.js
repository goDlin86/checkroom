//import { auth } from '../../../lib/auth'
//import { request } from 'https'

// export const POST = auth(async (req) => {
  // if (!req.auth) return Response.json({ message: 'Not authenticated' }, { status: 401 })
  
  // const { url } = await req.json()

  // const options = {
  //   method: 'POST',
  //   hostname: 'api.browse.ai',
  //   port: null,
  //   path: `/v2/robots/${process.env.BROWSEAI_ROBOT_ID}/tasks`,
  //   headers: {
  //     Authorization: `Bearer ${process.env.BROWSEAI_SECRET}`,
  //   },
  // }

  // const r = request(options, async (res) => {
  //   const chunks = []

  //   res.on('data', (chunk) => {
  //     chunks.push(chunk)
  //   })

  //   res.on('end', async () => {
  //       try {
  //         const body = Buffer.concat(chunks);
  //         return Response.json(JSON.parse(body.toString())?.result, { status: 200 })
  //       } catch (e) {
  //         return Response.json({ message: e.message }, { status: 500 })
  //       }
  //     })
  // })

  // //r.on('error', Response.json({ message: 'Error!' }, { status: 500 }))

  // r.write(
  //   JSON.stringify({
  //     inputParameters: {
  //       originUrl: url,
  //     },
  //   })
  // )
  // r.end()

  // return Response.json({ message: 'Extraction data...' }, { status: 200 })
// })

import { gotScraping } from 'got-scraping'
import * as cheerio from 'cheerio'

const delay = (time) => (new Promise(resolve => setTimeout(resolve, time)))

export const POST = async (req) => {
  const { url } = await req.json()
  const { body } = await gotScraping({ url })

  if (url.includes('wildberries.ru')) await delay(2000) //for wb load
  
  const $ = cheerio.load(body)

  let json = {}
  if (url.includes('usmall.ru'))
    json = { 
      name: $('a.__brand-name').text(),
      img: $('.c-product-photo-desk__inner>img').attr('src'),
      price: $('div.c-product-action__price-value').text()
    }
  else if (url.includes('poizonshop.ru')) {
    const srcset = $('[class^="product-images_image__"]>img').attr('srcset')
    const img = srcset.split(',')
    json = {
      name: $('[class^="product_name__"]>h1').text(),
      img: img[8].slice(0, -5),
      price: $('[class^="product-delivery_price__"]').text()
    }
  } else { //wb
    json = {
      name: $('.product-page__title').text(),
      img: $('.zoom-image-container>img').attr('src'),
      price: $('.price-block__wallet-price').text()
    }
  }

  return Response.json(json)
}