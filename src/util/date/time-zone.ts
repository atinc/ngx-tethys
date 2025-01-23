const DEFAULT_TIMEZONE = 'Asia/Shanghai';

let timeZone: string = DEFAULT_TIMEZONE;

export function setDefaultTimeZone(zone: string) {
    timeZone = zone ?? DEFAULT_TIMEZONE;
}

export function getDefaultTimeZone() {
    return timeZone;
}
