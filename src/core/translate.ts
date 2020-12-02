import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThyTranslate {
    instant(key: string | Array<string>, interpolateParams?: object): string | any {
        return key;
    }

    get(key: string | Array<string>, interpolateParams?: object): Observable<string | any> {
        return new Observable((observer: Observer<any>) => {
            observer.next(key);
        });
    }
}
