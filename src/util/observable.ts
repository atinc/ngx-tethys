import { isObservable, Observable, of } from 'rxjs';
import { SafeAny } from 'ngx-tethys/types';

export function isPromise<T>(obj: SafeAny): obj is Promise<T> {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
    if (isObservable(value)) {
        return value;
    }

    if (isPromise(value)) {
        return new Observable<T>(subscriber => {
            Promise.resolve(value)
                .then(result => {
                    subscriber.next(result);
                    subscriber.complete();
                })
                .catch(error => subscriber.error(error));
        });
    }

    return of(value);
}
