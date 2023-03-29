import axios from "axios";

const API_URL = 'http://localhost:5000/api/user';

export const updateUser = (userId, twitterName, description, link) => {
    return axios({
        method: 'PUT',
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
        withCredentials: true,
        url: `${API_URL}/notification/update`,
        }).then((res) => {
            return (res.data);
        }).catch((err) => {
            return null;
        });
}