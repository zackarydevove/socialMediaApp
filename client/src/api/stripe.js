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
            price: 8400
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
        console.log(res.data);
        return res.data;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}