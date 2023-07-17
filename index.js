//imports
const express = require('express');
const request = require('request-promise');

//iniciamos app
const app = express()
app.use(express.json()) //para poder parseae jsons inputs

//definimos elmentos para hacer el router
const apiKey = ''
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`


//******hacemos el router
app.get('/', (req, res)=>{
  res.send('Welcome to Amazon Scraper API.')
})

// GET Product details
app.get('/products/:productId', async (req, res)=>{
  const {productId} = req.params;
  try {
    //peticion al product. dp, product details
    const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`)
    res.json(JSON.parse(response)) //mando la respuesta. La parseo a JSON para verla en ese formato
  } catch (error) {
    res.json(error) 
  }
})


//corremos app en puerto
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log('Up & running, *' + PORT))

