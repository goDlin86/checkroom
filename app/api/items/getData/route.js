//import { HfInference } from '@huggingface/inference'
import * as cheerio from 'cheerio'

export const maxDuration = 20

export const POST = async (req) => {
  const { url } = await req.json()

  let body
  
  try {
    if (!url.includes('usmall.ru')) {
      const query = `
        mutation RetrieveHTML($url: String!) {
          goto(url: $url, waitUntil: networkIdle, timeout: 10000) {
            status
          }
          html(selector: "body") {
            html
          }
        }
      `

      const res = await fetch(
        `https://production-lon.browserless.io/chrome/bql?token=${process.env.BROWSERLESS_API}&proxy=residential&proxyCountry=ru&humanlike=true`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { url },
          }),
        }
      )
      const { data } = await res.json()
      body = data.html.html
    } else {
      const res = await fetch(url)
      body = await res.text()
    }
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }

  // const inference = new HfInference(process.env.HF_TOKEN)

  // try {
  //   const chatCompletion = await inference.chatCompletion({
  //     //model: 'deepseek-ai/DeepSeek-V3',
  //     model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
  //     messages: [
  //       {
  //         role: 'user',
  //         content: 'get product title, product price, url of product image from HTML ' + body
  //       }
  //     ],
  //     provider: 'together',
  //   })
  //   console.log(chatCompletion.choices[0].message)
  // } catch (e) {
  //   console.log(e)
  //   return Response.json({ message: e.message }, { status: 500 })
  // }

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
      price: $('[class^="product-delivery_price__"]').first().text()
    }
  } 
  else if (url.includes('brd.ru')) {
    json = {
      name: $('div[itemprop="name"]').text(),
      img: $('img[itemprop="image"]').first().attr('src'),
      price: $('span.price_active'). text()
    }
  }
  else { //wb
    json = {
      name: $('.product-page__title').text(),
      img: $('.zoom-image-container>img').attr('src'),
      price: $('.price-block__final-price').text()
    }
  }
  console.log(json)

  return Response.json(json)
}
