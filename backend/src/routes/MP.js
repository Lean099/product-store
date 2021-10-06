const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-900446251691980-092919-c530fb8eeabf37e3511bfbf21a90c71b-344496458'
});

router.get('/', (req, res)=>{
    res.json({message: 'Hello'})
})

router.post('/preferenceId', async (req, res)=>{
    const preference = {
        items: [
          {
            title: 'Test',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: 10.5
          }
        ]
      };

    const respuesta =  await mercadopago.preferences.create(preference)
    res.json(respuesta)
    console.log(respuesta.body.id)
})
