
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { META_KEY } from './types';

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
        const meta = this[META_KEY];
        if (!meta) {
            throw new Error(`${META_KEY} is not found, current store has not action`);
        }
        const actionMeta = meta.actions[action.type];
        if (!actionMeta) {
            throw new Error(`${action.type} is not found`);
        }
        let result = this[actionMeta.fn](this.snapshot, action.payload);

        if (result instanceof Promise) {
            result = from(result);
        }

        if (result instanceof Observable) {
            result = result.pipe(map(r => r));
        } else {
            result = of({}).pipe(shareReplay());
        }
        return result;
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
