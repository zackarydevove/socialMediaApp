import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/search`;

const getToken = () => localStorage.getItem('jwtToken');

export const searchUsers = (query) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
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
