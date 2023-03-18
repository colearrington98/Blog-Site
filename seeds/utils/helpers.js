module.exports = {
    get_emoji: () => {
        const randomNum = Math.floor(Math.random() * 5);
        return emojis[randomNum];
    }
};
