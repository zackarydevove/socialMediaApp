import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/follow`;

export const follow = (userIdToFollow) => {
    return axios({
        method: 'POST',
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