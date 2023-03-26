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
        console.log('All chats of users successfully received!', res);
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        return null;
    })
}

export const getParticipant = (chatId) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/participant/${chatId}`
    })
    .then((res) => {
        console.log('Other participant successfully received!', res);
        return (res.data);
    })
    .catch((err) => {
        console.log(err);
        return null;
    })  
}

export const getMessages = (chatId) => {
    return axios({
        method: 'GET',
        withCredentials: true,
        url: `${API_URL}/${chatId}/messages`
    })
    .then((res) => {
        console.log('Messages of chat successfully received!', res);
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

// export const sendMessage = (chatId, content, sender, receiver) => {
//     return axios({
//         method: 'POST',
//         data: {
//             content: content,
//             sender: sender,
//             receiver: receiver,
//         },
//         withCredentials: true,
//         url: `${API_URL}/${chatId}/message`
//     })
//     .then((res) => {
//         console.log('Message successfully sent!', res);
//         return (res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//         return null;
//     })  
// }