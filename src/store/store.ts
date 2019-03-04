import {
    Observable,
    Observer,
    BehaviorSubject,
    from,
    of,
    PartialObserver,
    Subscription
} from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { META_KEY, StoreMetaInfo } from './types';
import { helpers } from '../util';
import { RootContainer } from './rootStore';
import { OnDestroy } from '@angular/core';
import { ActionStateStore } from './actionStateStore';

interface Action {
    type: string;
    payload?: any;
}

let containerId = -1;

export class Store<T extends object> implements Observer<T>, OnDestroy {
    [key: string]: any;

    public state$: BehaviorSubject<T>;

    public apply_redux_tool = false;

    private _defaultContainerInstanceId = `${this._getClassName()}@${++containerId}`;


    constructor(initialState: any) {
        this.state$ = new BehaviorSubject<T>(initialState);
        if (this.apply_redux_tool) {
            const _rootContainer: RootContainer = RootContainer.getSingletonRootContainer();
            ActionStateStore.changeAction(`init_${this._defaultContainerInstanceId}`);
            _rootContainer.registerContainer(this);
        }
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
        const meta = this[META_KEY] as StoreMetaInfo;
        if (!meta) {
            throw new Error(
                `${META_KEY} is not found, current store has not action`
            );
        }
        const actionMeta = meta.actions[action.type];
        if (!actionMeta) {
            throw new Error(`${action.type} is not found`);
        }
        // let result: any = this[actionMeta.fn](this.snapshot, action.payload);
        let result: any = actionMeta.originalFn.call(
            this,
            this.snapshot,
            action.payload
        );

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

    select(
        selector: (state: T) => Partial<T>
    ): Observable<T> | Observable<Partial<T>>;
    select(selector: string | any): Observable<any>;
    select(selector: any): Observable<any> {
        return this.state$.pipe(
            map(selector),
            distinctUntilChanged()
        );
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

    subscribe(
        next?: (value: T) => void,
        error?: (error: any) => void,
        complete?: () => void
    ): Subscription {
        return this.state$.subscribe(next, error, complete);
    }

    setState(fn: T | ((newState: T) => T)): void {
        if (helpers.isFunction(fn)) {
            this.next((fn as any)(this.snapshot));
        } else {
            this.next(fn as T);
        }
    }

    getState(): T {
        return this.snapshot;
    }

    ngOnDestroy() {
        if (this.apply_redux_tool) {
            const _rootContainer: RootContainer = RootContainer.getSingletonRootContainer();
            _rootContainer.unregisterContainer(this);
        }
    }

    /**
     * You can override this method if you want to give your container instance a custom id.
     * The returned id must be unique in the application.
     */
    getContainerInstanceId(): string {
        return this._defaultContainerInstanceId;
    }

    private _getClassName(): string {
        return this.constructor.name;
    }
}
