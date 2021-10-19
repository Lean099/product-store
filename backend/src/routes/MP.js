const { Router } = require('express')
const router = Router()
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_KEY
});

router.post('/testmp', (req, res)=>{
    console.log(req.body)
    let cart = req.body.cart.map(item => ({_id: item._id, title: item.title, description: item.description, image: item.image, currency_id: 'ARS', unit_price: item.price, quantity: item.quantityAddedInCart, idCostumer: item.idCostumer}))
    console.log(cart)
    res.json({message: 'Hello'})
})

router.post('/preferenceId', async (req, res)=>{

    let cart = req.body.cart.map(item => ({_id: item._id, title: item.title, description: item.description, image: item.image, currency_id: 'ARS', unit_price: item.price, quantity: item.quantityAddedInCart, idCostumer: item.idCostumer}))
    console.log(cart)
    const preference = {
      items: cart,
      back_urls: {
        "success": "http://localhost:3001/feedback",
        "failure": "http://localhost:3001/feedback",
        "pending": "http://localhost:3001/feedback"
      },
      auto_return: "approved"
        /*items: [
          {
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
          }
        ]*/
      };

    const respuesta =  await mercadopago.preferences.create(preference)
    res.json(respuesta)
    console.log(respuesta.body.id)
})

router.get('/feedback', (req, res)=>{
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id
    });
})

module.exports = router
