import axios from "axios";
import socket from "../socket";

const API_URL = 'http://localhost:5000/api/chat';


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
        console.log('Chat successfully created!', res);
        return (res.data);
    })
    .catch((err) => {
        if (err.response.request.status === 400) {
            console.log('Chat already exists');
            return err.response.data._id;
        }
        console.log(err);
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
        console.log('All contacts of users successfully received!');
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
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
        console.log('Other participants successfully received!');
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
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
        console.log('Messages of chat successfully received!');
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
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
        console.log('Last messages received!');
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        return null;
    })  
}
