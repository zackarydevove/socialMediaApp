export const tweetCreatedDate = (date) => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 60) {
        return `${Math.round(secondsPast)}s`;
    }
    if (secondsPast < 3600) {
        return `${Math.round(secondsPast / 60)}m`;
    }
    if (secondsPast <= 86400) {
        return `${Math.round(secondsPast / 3600)}h`;
    }
    if (secondsPast > 86400) {
        const day = date.getDate();
        const month = date.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
        return `${month} ${day}`;
    }
}