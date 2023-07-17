//imports
const express = require('express');
const request = require('request-promise');

//iniciamos app
const app = express()
app.use(express.json()) //para poder parseae jsons inputs

// ***** definimos elmentos para hacer el router
// const apiKey = ''
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

//la url tiene que ser dinamica de acuerdo a la key del user. La key la pasameros como queryParameters
const generateScrapeUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`


//******hacemos el router
app.get('/', (req, res)=>{
  res.send('Welcome to Amazon Scraper API.')
})

// GET Product details
// e.g., http://localhost:4005/products/B09NQLN37K
app.get('/products/:productId', async (req, res)=>{
  const {productId} = req.params;
  const {api_key} = req.query

  try {
    //peticion al product. dp, product details
    const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
    res.json(JSON.parse(response)) //mando la respuesta. La parseo a JSON para verla en ese formato
  } catch (error) {
    res.json(error) 
  }
})

// GET Product reviews
// e.g., http://localhost:4005/products/B09NQLN37K/review
app.get('/products/:productId/reviews', async (req, res)=>{
  const {productId} = req.params;
  const {api_key} = req.query

  try {
    //peticion al product. dp, product details
    const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
    res.json(JSON.parse(response)) //mando la respuesta. La parseo a JSON para verla en ese formato
  } catch (error) {
    res.json(error) 
  }
})

// GET Product offers
// e.g., http://localhost:4005/products/B09NQLN37K/offers
app.get('/products/:productId/offers', async (req, res)=>{
  const {productId} = req.params;
  const {api_key} = req.query

  try {
    //peticion al product. dp, product details
    const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
    res.json(JSON.parse(response)) //mando la respuesta. La parseo a JSON para verla en ese formato
  } catch (error) {
    res.json(error) 
  }
})

// GET Search Results
// e.g., http://localhost:4005/search/samsung%20tab%20s7
// Los espacios los transofrrma solo el navegador en %20 o +
app.get('/search/:searchQuery', async (req, res)=>{
  const {searchQuery} = req.params;
  const {api_key} = req.query
  
  try {
    //peticion al product. dp, product details
    const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
    res.json(JSON.parse(response)) //mando la respuesta. La parseo a JSON para verla en ese formato
  } catch (error) {
    res.json(error) 
  }
})


//corremos app en puerto
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log('Up & running, *' + PORT))

export default app
//e.g., con key en query
// http://localhost:4005/search/samsung%20tab%20s8?api_key=......................