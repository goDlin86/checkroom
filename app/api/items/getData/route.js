import * as cheerio from 'cheerio'

export const POST = async (req) => {
  const { url } = await req.json()

  const res = await fetch(url)
  const body = await res.text()

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
