import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThyTranslate {
    instant(
        key: string | Array<string>,
        interpolateParams?: Object
    ): string | any {
        return key;
    }

    get(
        key: string | Array<string>,
        interpolateParams?: Object
    ): Observable<string | any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(key);
        });
    }
}
