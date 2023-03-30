import axios from "axios";
import socket from "../socket";

const API_URL = `${process.env.REACT_APP_API_URL}/chat`;


export const createChat = (participants) => {
    return axios({
        method: 'POST',
        data: {
            participants: participants,
        },
        withCredentials: true,
        url: `${API_URL}/`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        if (err.response.request.status === 400) {
            return err.response.data._id;
        }
        return null;
    })
}

export const getChats = (userId) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/${userId}`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })
}

export const getParticipants = (chatId) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/participants/${chatId}`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })  
}

export const getMessages = (chatId, page) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/${chatId}/messages/${page}`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })  
}

export const sendMessage = (chatId, content, sender, receiver) => {
    socket.emit('send_message', {
      chatId,
      message: {
        content,
        sender,
        receiver,
      },
    });
};

export const getLastMessage = (chatId) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/${chatId}/lastmessage`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })  
}
