import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/feed`;

const getToken = () => localStorage.getItem('jwtToken');

export const getFeed = (userId, page) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        params: {
            page: page,
        },
        withCredentials: true,
        url: `${API_URL}/${userId}`,
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return (null);
    })
}