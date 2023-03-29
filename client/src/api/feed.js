import axios from "axios";

const API_URL = 'http://localhost:5000/api/feed';

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