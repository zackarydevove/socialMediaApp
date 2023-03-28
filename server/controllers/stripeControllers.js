
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

module.exports.stripe = (req, res) => {
    const item = req.body.item;
    const session = stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price,
                    },
                    quantity: 1,
            },
        ],
        success_url: 'http://localhost:3000/home',
        cancel_url: 'http://localhost:3000/home'
    })
    .then((response) => {
        console.log(response);
        if (response.success_url === 'http://localhost:3000/home') {
            console.log('payment success');
        } else {
            console.log('error during payment');
        }
        res.send({url : response.url });
        console.log('response sent');
    })
    .catch((err) => console.log(err));
}