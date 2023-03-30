import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = (usernameOrEmail, password) => {
    return axios({
      method: 'POST',
      data: {
        usernameOrEmail,
        password,
      },
      withCredentials: true,
      url: `${API_URL}/login`,
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })
};

export const register = (username, email, password, confirmPassword) => {
    return axios({
        method: 'POST',
        data: {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        },
        withCredentials: true,
        url: `${API_URL}/register`,
    }).then((res) => {
        return (res.data);
    }).catch((err) => {
        return null;
    });
}

export const logout = () => {
    return axios({
        method: 'POST',
        withCredentials: true,
        url: `${API_URL}/logout`,
    }).then((res) => {
        return (res.data);
    }).catch((err) => {
        return null;
    });
}


export const getUser = () => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/user`,
    }).then((res) => {
        return (res.data);
    }).catch((err) => {
        return null;
    });
}

export const getProfile = (username) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url:  `${API_URL}/user/profile/${username}`,
    }).then((res) => {
        return (res.data)
    })
    .catch((err) => {
        return null;
    });
}

export const getCreator = (creatorId) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url:  `${API_URL}/user/creator/${creatorId}`,
    }).then((res) => {
        return (res.data)
    })
    .catch((err) => {
        return null;
    });
}

export const getRandomUsers = () => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url:  `${API_URL}/user/random`,
    }).then((res) => {
        return (res.data)
    })
    .catch((err) => {
        return null;
    });
}
