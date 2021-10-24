const { Router } = require('express')
const router = Router()
const User = require('../models/User')
let axios = require('axios')
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_KEY
});

router.get('/testmp', async (req, res)=>{
    console.log(req.body)
    let cart = req.body.cart.map(item => ({_id: item._id, title: item.title, description: item.description, image: item.image, currency_id: 'ARS', unit_price: item.price, quantity: item.quantityAddedInCart, idCostumer: item.idCostumer}))
    console.log(cart)
    res.json({message: 'Hello'})
    /*const token = process.env.MERCADO_PAGO_ACCESS_KEY
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }
    const user = await axios.get('https://api.mercadopago.com/v1/payments/1242508970', config)
    res.json(user.data)*/
})

router.post('/preferenceId', async (req, res)=>{

    let cart = req.body.cart.map(item => ({id: item._id, title: item.title, description: item.description, picture_url: item.image, currency_id: 'ARS', unit_price: item.price, quantity: item.quantityAddedInCart/*, idCostumer: item.idCostumer*/}))
    console.log(cart)
    const preference = {
      items: cart,
      back_urls: {
        "success": "http://localhost:3000/feedback",
        "failure": "http://localhost:3000/feedback",
        "pending": "http://localhost:3000/feedback"
      },
      auto_return: "approved"
      };

    const respuesta =  await mercadopago.preferences.create(preference)
    res.json(respuesta)
    console.log(respuesta.body.id)
})

router.post('/feedback/:id', async (req, res)=>{
    const { payment_id, preference_id, status, payment_type, merchant_order_id } = req.body
    await User.findOneAndUpdate({_id: req.params.id}, {$push: {shopFeedback: {payment_id, preference_id, status, payment_type, merchant_order_id}}})
    const token = process.env.MERCADO_PAGO_ACCESS_KEY
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }
    const payment = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, config)
    console.log(req.body)
    console.log(req.params.id)
    res.json({payment: payment.data})
  
    /* http://localhost:3000/feedback?collection_id=1242508970&collection_status=approved&payment_id=1242508970&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=3444106519&preference_id=344496458-9ca7677f-5bf4-4a04-8460-108133d4fcca&site_id=MLA&processing_mode=aggregator&merchant_account_id=null */
    
    /* http://localhost:3000/feedback?collection_id=1242648132&collection_status=approved&payment_id=1242648132&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=3465788975&preference_id=344496458-f4771535-371b-4077-88d1-86bf73460b8b&site_id=MLA&processing_mode=aggregator&merchant_account_id=null */
    /*res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id
    });*/
 
})

router.get('/getPurchases/:id', async (req, res)=>{
  const token = process.env.MERCADO_PAGO_ACCESS_KEY
  const config = {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  }
  const payment = await axios.get(`https://api.mercadopago.com/v1/payments/${req.params.id}`, config)
  console.log('Se envio')
  res.json(payment.data)
})

module.exports = router
