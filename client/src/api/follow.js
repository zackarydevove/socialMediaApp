import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/follow`;

const getToken = () => localStorage.getItem('jwtToken');

export const follow = (userIdToFollow) => {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            userIdToFollow: userIdToFollow,
        },
        withCredentials: true,
        url: `${API_URL}/follow`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })
};

export const getFollowedUsers = (userId) => {
    return axios({
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        withCredentials: true,
        url: `${API_URL}/followedUsers/${userId}`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })
}