import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/search`;

export const searchUsers = (query) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/users/${query}`
    })
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        return null;
    })
};
