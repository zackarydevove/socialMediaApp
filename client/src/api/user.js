import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/user`;

const getToken = () => localStorage.getItem('jwtToken');

export const updateUser = (userId, twitterName, description, link) => {
    return axios({
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            twitterName: twitterName,
            description: description,
            link: link,
        },
        withCredentials: true,
        url: `${API_URL}/profile/update/${userId}`,
    }).then((res) => {
        return (res.data);
    }).catch((err) => {
        return null;
    });
};

export const updateSettings = (username, phone, email, country, age) => {
    return axios({
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${getToken()}`
    },
    data: {
        username: username,
        phone: phone,
        email: email,
        country: country,
        age: age,
    },
    withCredentials: true,
    url: `${API_URL}/setting/update/`,
    }).then((res) => {
        return (res.data);
    }).catch((err) => {
        return null;
    });
};

export const updatePassword = (currentPassword, newPassword) => {
    return axios({
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        data: {
            currentPassword: currentPassword,
            newPassword: newPassword
        },
        withCredentials: true,
        url: `${API_URL}/password/update`,
        }).then((res) => {
            return (res.data);
        }).catch((err) => {
            return null;
        });
}

export const resetNotificationCount = () => {
    return axios({
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        withCredentials: true,
        url: `${API_URL}/notification/update`,
        }).then((res) => {
            console.log('user in resetnotificationcount call api:', res);
            return (res.data);
        }).catch((err) => {
            return null;
        });
}