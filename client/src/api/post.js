import axios from "axios";


const API_URL = `${process.env.REACT_APP_API_URL}/post`;

export const postTweet = (content) => {
    return axios({
        method: 'POST',
        data: {
            type: 'Post',
            content: content,
        },
        withCredentials: true,
        url: `${API_URL}/post`
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return null
    });
};

export const getPost = (postId) => {
    return axios({
        method: 'POST',
        data: {
          postId: postId,
        },
        withCredentials: true,
        url: `${API_URL}/get`
      })
      .then((res) => {
        return (res.data);
      })
      .catch((err) => {
        return null
      })
}

export const likeTweet = (postId) => {
    return axios({
        method: 'POST',
        data: {
            postId: postId,
        },
        withCredentials: true,
        url: `${API_URL}/like`
    }).then((res) => {
        return (res.data)
    })
    .catch((err) => {
        return null
    })
}

export const deleteTweet = (postId) => {
    return axios({
        method: 'DELETE',
        withCredentials: true,
        url: `${API_URL}/delete/${postId}`
    }).then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null
    })
}

export const replyTweet = (postId, replyContent) => {
    return axios({
        method: 'POST',
        data: {
            replyContent: replyContent,
            postId: postId,
        },
        withCredentials: true,
        url: `${API_URL}/reply`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null
    })
};

export const retweet = (postId) => {
    return axios({
        method: 'POST',
        data: {
            postId: postId,
        },
        withCredentials: true,
        url: `${API_URL}/retweet`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null;
    })
}

export const bookmark = (postId) => {
    return axios({
        method: 'POST',
        data: {
            postId: postId,
        },
        withCredentials: true,
        url: `${API_URL}/bookmark`
    })
    .then((res) => {
        return (res.data);
    })
    .catch((err) => {
        return null
    })
}