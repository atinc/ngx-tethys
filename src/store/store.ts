
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

interface Action {
    type: string;
    payload?: any;
}


export class Store<T> {

    protected state$: BehaviorSubject<T>;

    constructor(initialState: any) {
        this.state$ = new BehaviorSubject<T>(initialState);
    }

    get snapshot() {
        return this.state$.getValue();
    }

    public dispatch(type: string, payload?: any): Observable<any> {
        const result = this._dispatch({
            type: type,
            payload: payload
        });
        result.subscribe();
        return result;
    }

    private _dispatch(action: any): Observable<any> {
        const prevState = this.state$.getValue();
        console.log(`dispatch:${action}`);
        console.log(this['THY_META']);
        console.log('-----');
        return new Observable();
    }

    select(selector: (state: any) => T): Observable<T>;
    select(selector: string | any): Observable<any>;
    select(selector: any): Observable<any> {
        return this.state$.pipe(
            map(selector),
            distinctUntilChanged()
        );
    }
}
