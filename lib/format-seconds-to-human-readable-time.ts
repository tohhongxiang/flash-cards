const formatSecondsToHumanReadableTime = (seconds: number) => {
    if (seconds < 60) {
        return `${seconds} seconds`;
    }

    if (seconds < 60 * 60) {
        const minutes = Math.floor(seconds / 60);
        const suffix = minutes === 1 ? "minute" : "minutes";
        return `${minutes} ${suffix}`;
    }

    if (seconds < 60 * 60 * 24) {
        const hours = Math.floor(seconds / 60 / 60);
        const suffix = hours === 1 ? "hour" : "hours";
        return `${hours} ${suffix}`;
    }

    const days = Math.floor(seconds / 60 / 60 / 24);
    const suffix = days === 1 ? "day" : "days";
    return `${days} ${suffix}`;
};

export default formatSecondsToHumanReadableTime;
