import { helpers } from 'ngx-tethys/util';
import { BehaviorSubject, from, Observable, Observer, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { Directive, isDevMode, OnDestroy } from '@angular/core';
import { MiniAction } from './action';
import { MiniActionState } from './action-state';
import { META_KEY, StoreMetaInfo } from './types';
import { SafeAny } from 'ngx-tethys/types';

@Directive()
export class MiniStore<T = unknown> implements Observer<T>, OnDestroy {
    initialStateCache!: any;

    public state$!: BehaviorSubject<T>;

    public reduxToolEnabled = isDevMode();

    private _defaultStoreInstanceId: string | null = null;

    public initialize(initialState: any) {
        this._defaultStoreInstanceId = this._getClassName();
        this.state$ = new BehaviorSubject<T>(initialState);
        this.initialStateCache = { ...initialState };
    }

    get snapshot() {
        return this.state$.getValue();
    }

    public dispatch(type: string, payload?: any): Observable<any> {
        MiniActionState.changeAction(`${this._defaultStoreInstanceId}-${type}`);
        const result = this._dispatch({
            type: type,
            payload: payload
        });
        result.subscribe();
        return result;
    }

    private _dispatch(action: any): Observable<any> {
        const meta = (this as SafeAny)[META_KEY] as StoreMetaInfo;
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !meta) {
            throw new Error(`${META_KEY} is not found, current store has not action`);
        }
        const actionMeta = meta.actions[action.type];
        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !actionMeta) {
            throw new Error(`${action.type} is not found`);
        }
        // let result: any = this[actionMeta.fn](this.snapshot, action.payload);
        let result: any = actionMeta.originalFn.call(this, this.snapshot, action.payload);

        if (result instanceof Promise) {
            result = from(result);
        }

        if (result instanceof Observable) {
            result = result.pipe(map(r => r));
        } else {
            result = new Observable((observer: Observer<any>) => {
                observer.next({});
            });
        }
        return result.pipe(shareReplay());
    }

    select<TResult>(selector: (state: T) => TResult): Observable<TResult> | Observable<TResult>;
    select(selector: string | any): Observable<any> {
        return this.state$.pipe(map(selector), distinctUntilChanged());
    }

    next(state: T) {
        this.state$.next(state);
    }

    error(error: any) {
        this.state$.error(error);
    }

    complete() {
        this.state$.complete();
    }

    subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.state$.subscribe(next, error, complete);
    }

    /**
     * set store new state
     *
     * @example
     * this.setState(newState);
     * this.setState({ users: produce(this.snapshot.users).add(user) });
     * this.setState((state) => {
     *    return {
     *        users: produce(state.users).add(user)
     *    }
     * });
     * @param fn
     */
    setState(fn: Partial<T> | ((newState: T) => Partial<T>)): void {
        if (helpers.isFunction(fn)) {
            this.next({
                ...this.snapshot,
                ...(fn as any)(this.snapshot)
            });
        } else {
            this.next({
                ...this.snapshot,
                ...(fn as T)
            });
        }
    }

    getState(): T {
        return this.snapshot;
    }

    @MiniAction()
    clearState() {
        this.setState(this.initialStateCache);
    }

    ngOnDestroy() {}

    /**
     * You can override this method if you want to give your container instance a custom id.
     * The returned id must be unique in the application.
     */
    getStoreInstanceId(): string | null {
        return this._defaultStoreInstanceId;
    }

    private _getClassName(): string | null {
        const name = this.constructor.name || /function (.+)\(/.exec(`${this.constructor}`)![1];
        return name;
    }
}
