import axios from "axios";

const API_URL = 'http://localhost:5000/api/feed';

export const getFeed = (userId, page) => {
    console.log('step2 receive userId sent with axios:', userId);
    return axios({
        method: 'GET',
        params: {
            page: page,
        },
        withCredentials: true,
        url: `${API_URL}/${userId}`,
    })
    .then((res) => {
        console.log('step3, receive res:', res);
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        return (null);
    })
}