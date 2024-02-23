const getExpiryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    return now;
};