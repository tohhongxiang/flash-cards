import parse from "postgres-interval";

export const intervalToMilliseconds = (interval: string) => {
    const parsedInterval = parse(interval);
    return (
        parsedInterval.years * 365 * 24 * 60 * 60 * 1000 +
        parsedInterval.months * 30 * 24 * 60 * 60 * 1000 +
        parsedInterval.days * 24 * 60 * 60 * 1000 +
        parsedInterval.hours * 60 * 60 * 1000 +
        parsedInterval.minutes * 60 * 1000 +
        parsedInterval.seconds * 1000 +
        parsedInterval.milliseconds
    );
};
