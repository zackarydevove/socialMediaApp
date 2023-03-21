import axios from 'axios';

const postTweet = (content) => {
    axios({
        method: 'POST',
        data: {
            type: 'Post',
            content: content,
        },
        withCredentials: true,
        url: 'http://localhost:5000/post',
    })
};

export default postTweet;