import { Store } from './store';
import { Inject, SkipSelf, Optional, OnDestroy, isDevMode } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import getReduxDevToolsPlugin, { StorePlugin } from './plugins/redux_devtools';
import { ActionState } from './action-state';

export type StoreInstanceMap = Map<string, Store<any>>; // Map key：string，value：状态数据

/**
 * @internal
 */
export class RootStore implements OnDestroy {
    private static _rootStore: RootStore;
    /**
     * 数据流 数据是一个Map，k,v键值对，关键字->状态数据
     */
    private readonly _containers = new BehaviorSubject<StoreInstanceMap>(
        new Map<string, Store<any>>()
    );
    private _plugin: StorePlugin = getReduxDevToolsPlugin();
    private _combinedStateSubscription: Subscription = new Subscription();
    public static getSingletonRootStore() {
        if (!this._rootStore) {
            this._rootStore = new RootStore();
        }
        return this._rootStore;
    }
    constructor(
    ) {
        if (this._plugin.isConnectSuccessed()) {
            this._assignCombinedState(); // 最终调用handleNewState
            console.log(`是否在Angular开发环境：${isDevMode()}, 初始化root-store`);
        }
    }

    private _assignCombinedState() {
        this._combinedStateSubscription = this._containers
            .pipe(switchMap(containers => this._getCombinedState(containers)))
            .pipe(
                map(states => {
                    const actionName = ActionState.getActionName();
                    const state = states.reduce(
                        (acc, curr) => {
                            acc[curr.containerName] = curr.state;
                            return acc;
                        },
                        <{ [key: string]: any }>{}
                    );
                    return { state: state, actionName: actionName };
                })
            )
            .subscribe(c => {
                this._plugin.handleNewState(c.actionName, c.state);
            });
    }

    /**
     * 合并数据流
     * 合并状态数据，把状态数据转换为这样的数据：{ containerName: string, state: any }，并且
     * 通过combineLatest合并成一个数据数据流，这样状态数据只有涉及更新，那么这边就会得到通知
     * @param containers 状态数据的Map
     */
    private _getCombinedState(containers: StoreInstanceMap) {
        return combineLatest(
            ...Array.from(containers.entries()).map(([containerName, container]) => {
                return container.state$.pipe(map(state => ({ containerName, state })), tap((data) => {
                }));
            })
        );
    }

    /**
     * @internal
     */
    ngOnDestroy() {
        this._combinedStateSubscription.unsubscribe();
    }

    /**
     * @internal
     */
    registerStore(store: Store<any>) {
        const containers = new Map(this._containers.value);
        if (containers.has(store.getStoreInstanceId())) {
            throw new Error(
                `Store: Store with duplicate instance ID found! ${store.getStoreInstanceId()}` +
                ` is already registered. Please check your getStoreInstanceId() methods!`
            );
        }
        containers.set(store.getStoreInstanceId(), store);
        this._containers.next(containers);
    }

    existStoreInstanceId(instanceId: string): boolean {
        const containers = new Map(this._containers.value);
        if (containers.has(instanceId)) {
            return true;
        }
        return false;
    }

    /**
     * @internal
     */
    unregisterStore(store: Store<any>) {
        const containers = new Map(this._containers.value);
        containers.delete(store.getStoreInstanceId());
        this._containers.next(containers);
    }
}
