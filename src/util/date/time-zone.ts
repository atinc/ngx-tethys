import { SafeAny } from 'ngx-tethys/types';

export function setGlobalTimezone(timezone: string) {
    if (!(window as SafeAny)['__ngx_tethys_timezone']) {
        (window as SafeAny)['__ngx_tethys_timezone'] = timezone;
    }
}

export function getGlobalTimezone() {
    if ((window as SafeAny)['__ngx_tethys_timezone']) {
        return (window as SafeAny)['__ngx_tethys_timezone'];
    }
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function clearGlobalTimezone() {
    delete (window as SafeAny)['__ngx_tethys_timezone'];
}
