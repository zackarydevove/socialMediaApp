import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

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
        console.error('Error during login:', err);
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
        console.error('Error during login:', err);
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        return null;
    });
}

export const getCreator = (creatorId) => {
    console.log('getcreator creatorid: ', creatorId);
    return axios({
        method: 'GET',
        withCredentials: true,
        url:  `${API_URL}/user/creator/${creatorId}`,
    }).then((res) => {
        console.log('getCreator res:', res);
        return (res.data)
    })
    .catch((err) => {
        console.log(err);
        return null;
    });
}

export const getRandomUsers = () => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url:  `${API_URL}/user/random`,
    }).then((res) => {
        console.log('getRandom res:', res);
        return (res.data)
    })
    .catch((err) => {
        console.log(err);
        return null;
    });
}
