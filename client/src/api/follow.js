import axios from "axios";

const API_URL = 'http://localhost:5000/api/follow';

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
        console.log(res.data);
        return (res.data);
    })
    .catch((err) => {
        console.log(err)
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
        console.log('in get followed', res);
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}