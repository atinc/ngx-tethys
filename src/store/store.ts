import { Observable, Observer, BehaviorSubject, from, of, PartialObserver, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { META_KEY, StoreMetaInfo } from './types';
import { helpers } from 'ngx-tethys/util';
import { RootStore } from './root-store';
import { OnDestroy, isDevMode, Injectable } from '@angular/core';
import { ActionState } from './action-state';
import { Action } from './action';

interface Action {
    type: string;
    payload?: any;
}

@Injectable()
export class Store<T = unknown> implements Observer<T>, OnDestroy {
    initialStateCache: any;

    public state$: BehaviorSubject<T>;

    public reduxToolEnabled = isDevMode();

    private _defaultStoreInstanceId: string;

    constructor(initialState: any) {
        this._defaultStoreInstanceId = this._getClassName();
        this.state$ = new BehaviorSubject<T>(initialState);
        this.initialStateCache = { ...initialState };
        if (this.reduxToolEnabled) {
            const _rootStore: RootStore = RootStore.getSingletonRootStore();
            ActionState.changeAction(`Add-${this._defaultStoreInstanceId}`);
            _rootStore.registerStore(this);
        }
    }

    get snapshot() {
        return this.state$.getValue();
    }

    public dispatch(type: string, payload?: any): Observable<any> {
        ActionState.changeAction(`${this._defaultStoreInstanceId}-${type}`);
        const result = this._dispatch({
            type: type,
            payload: payload
        });
        result.subscribe();
        return result;
    }

    private _dispatch(action: any): Observable<any> {
        const meta = this[META_KEY] as StoreMetaInfo;
        if (!meta) {
            throw new Error(`${META_KEY} is not found, current store has not action`);
        }
        const actionMeta = meta.actions[action.type];
        if (!actionMeta) {
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
            result = Observable.create((observer: Observer<any>) => {
                observer.next({});
            });
            // result = of({});
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

    @Action()
    clearState() {
        this.setState(this.initialStateCache);
    }

    ngOnDestroy() {
        if (this.reduxToolEnabled) {
            const _rootStore: RootStore = RootStore.getSingletonRootStore();
            _rootStore.unregisterStore(this);
        }
    }

    /**
     * You can override this method if you want to give your container instance a custom id.
     * The returned id must be unique in the application.
     */
    getStoreInstanceId(): string {
        return this._defaultStoreInstanceId;
    }

    private _getClassName(): string {
        const name = this.constructor.name || /function (.+)\(/.exec(this.constructor + '')[1];
        if (this.reduxToolEnabled) {
            const rootStore: RootStore = RootStore.getSingletonRootStore();
            if (!rootStore.existStoreInstanceId(name)) {
                return name;
            }
            let j = 0;
            for (let i = 1; i < 20; i++) {
                if (!rootStore.existStoreInstanceId(`${name}-${i}`)) {
                    j = i;
                    break;
                }
            }
            return `${name}-${j}`;
        }
        return name;
    }
}
