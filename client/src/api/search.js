import axios from "axios";

const API_URL = 'http://localhost:5000/api/search'

export const searchUsers = (query) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/users/${query}`
    })
    .then((res) => {
        console.log(res.data);
        return res.data;
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
};
