import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/feed`;

export const getFeed = (userId, page) => {
    return axios({
        method: 'GET',
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