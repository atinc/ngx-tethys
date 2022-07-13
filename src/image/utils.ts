import { fromEvent } from 'rxjs';
import { map, take } from 'rxjs/operators';

export const getImageSizeByUrl = (url: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    const loadedXhr$ = fromEvent(xhr, 'load').pipe(
        take(1),
        map(data => {
            return xhr.response;
        })
    );
    xhr.send();
    return loadedXhr$;
};
