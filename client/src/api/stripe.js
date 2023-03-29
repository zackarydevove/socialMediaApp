import axios from "axios"

const API_URL = 'http://localhost:5000/api/stripe'

export const checkout = (plan) => {
    let item;
    if (plan === 1) {
        item = {
            name: 'Twitter blue billed yearly',
            price: 8400
        }
    } else {
        item = {
            name: 'Twitter blue billed monthly',
            price: 800
        }

    }
    return axios({
        method: 'POST',
        data: {
            item: item
        },
        withCredentials: true,
        url: `${API_URL}/checkout`
    })
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return null;
    })
}