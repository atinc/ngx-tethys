## Usage

1. 导入 ThyStoreModule, 并使用 ThyStoreModule.forRoot(定义应用程序的 Stores)

 ```
 import { ThyStoreModule } from 'ngx-tethys';

 @NgModule({
     imports: [ThyStoreModule.forRoot([AppStateStore])]
 })
 class AppModule {}
 ```

2. 定义 Store、State、Actions

 ```
 import { Store, Action } from 'ngx-tethys';

export interface UserInfo {
    _id: string;
    name: string;
}

export interface TeamInfo {
    _id: string;
    name: string;
}

export interface AppState {
    me: UserInfo;
    team: TeamInfo;
}

export class AppStateStore extends Store<AppState> {
    constructor() {
        super({
            me: null,
            team: null
        });
    }

    @Action()
    initialize(team: TeamInfo, me: UserInfo) {
        const state = this.snapshot; // or this.getState();
        state.team = team;
        state.me = me;
        this.next(state); // or this.setState(state);
    }

    // 已经不建议使用
    @Action('loadMe')
    loadMe(state: AppState, payload: UserInfo) {
        state.me = payload;
        this.next(state);
    }
}

 ```

3. 在组件中注入 Store 使用

 ```
 export class AppComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<void>();

    title = 'state-management';

    subscription: Subscription;

    me: UserInfo;

    constructor(private appStateStore: AppStateStore) {}

    ngOnInit() {
        // 通过 select 取当前组件需要的状态数据，记得取消订阅
        this.appStateStore
            .select(state => {
                return state.me;
            })
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(me => {
                this.me = me;
            });

        // 调用 Action 可以来自任何地方, Angular 初始化器， 路由 Resolver，某个路由组件初始化调用 API 后
        this.appStateStore.initialize(
            { _id: '1', name: 'at' },
            {
                _id: '1',
                name: 'peter'
            }
        );

        // this.appStateStore.dispatch('loadMe', {
        //     _id: '1',
        //     name: 'lily'
        // });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
 ```

## APIs

### Action

给某个 Store 的方法加上装饰器 `@Action()` 表示这是一个被其他组件或者服务调用的方法，不加 Action 表示内部方法

1. 加上 Action 后如果返回的是一个 Observable 会自动进行 shareReplay;
1. 加上 Action 后如果返回的是一个 Observable 会自动进行一次 subscribe;
1. 加上 Action 后改变状态会使用 redux_devtools 记录状态，方便开发环境调试.

### select

一个 Store 可以存很多数据, 比如上面示例中的 `AppStateStore` 就存储了 `me` 和 `team`, 某个组件只需要显示当前登录的用户, 不需要 team, 使用 AppStateStore.select 过滤不需要的数据订阅, 只订阅组件需要的状态数据.

注意事项:

1. 可以不需要订阅就不订阅, 直接使用 select 返回需要的 Observable, 在模版中使用 `async` 管道订阅使用, 如果模版中多处使用可以使用 `as` 关键字保存为临时对象;
1. 一旦订阅, 必须取消订阅, 推荐 `takeUntil` 操作符取消订阅;
1. selector 一般会统一定义到 Store 的静态函数中, 将来会支持直接字符串的方式取数据.


### snapshot

有时候为了方便在模版中直接使用某个状态, 可以把 Store 设置为公开, 然后在模版中通过 `store.snapshot.xxx` 表达式直接使用某个状态, 在用 snapshot 的时候注意:

1. 尽量只在模版中使用;
1. 在代码中使用时除非你确定此时一定是你需要的值, 且是一次性使用, 使用后数据变更不应该影响此功能;
1. 严禁在 Store 外直接修改该 Store snapshot 中的数据.

### dispatch

在过去的版本中, 通过使用 `store.dispatch('actionName', payload)` 的方式调用某个 Action 更新状态, 新版本直接调用 Action 方法 `store.action(payload)`.
改成这样的优势:

1. 不需要给每个 Action 取一个名字;
1. 可以使用 TypeScript 提供的类型进行约束, 编译时类型检查, 避免不必要的错误出现;


### Change State

1. 使用 `this.snapshot` 或者 `this.getState()` 获取最新的状态;
2. 使用 `this.next(newState)` 更改最新的状态;
3. 使用 `this.setState()` 更改最新的状态, 支持更改所有状态, 单个状态, 状态函数;
 ```
   * @example
    * this.setState(newState);
    * this.setState({ users: produce(this.snapshot.users).add(user) });
    * this.setState((state) => {
    *    return {
    *        users: produce(state.users).add(user)
    *    }
    * });
 ```
4. 尽量使用不可变数据, 数组使用封装的 `produce` 作增删改操作, 使用不可变数据后, 模版使用状态绑定数组使用;`trackBy: trackByFn` 指定 `trackBy` 函数提高性能, 同时为特殊的场景采用 `changeDetection: ChangeDetectionStrategy.OnPush` 提高性能作铺垫.



### EntityStore

> EntityStore 继承于 Store, 封装了一个配置管理页面的列表数据操作, 包括分页, add, update, remove, clear 等方法

1. 定义状态和 Store 的时候继承 `EntityState<TEntity>` `EntityStore<EntityState<TEntity>, TEntity>`;
2. 使用 `this.initialize(entities: TEntity[], pagination: PaginationInfo)` 初始化数据, 一般会在 `fetchXXX` 的 Action 获取到数据后调用;
3. `this.entities$` 获取实体数据的流, `this.entities` 获取实体数据的快照;
4. 使用 `this.add(entity: TEntity | TEntity[], addOptions?: EntityAddOptions` 添加实体;
 ```
  /**
    * Add an entity or entities to the store.
    *
    * @example
    * this.store.add(Entity);
    * this.store.add([Entity, Entity]);
    * this.store.add(Entity, { prepend: true });
    */
```
5. 使用 `this.update(id: Id | Id[], newState?: Partial<TEntity>)` 修改实体;
 ```
    /**
    * @example
    * this.store.update(3, {
    *   name: 'New Name'
    * });
    *
    *  this.store.update(3, entity => {
    *    return {
    *      ...entity,
    *      name: 'New Name'
    *    }
    *  });
    *
    * this.store.update([1,2,3], {
    *   name: 'New Name'
    * });
    */
 ```
6. 使用 `remove(id: Id | Id[]): void;` 移除实体;
 ```
    /**
    * @example
    * this.store.remove(5);
    * this.store.remove([1,2,3]);
    * this.store.remove(entity => entity.id === 1);
    */
 ```
7. `this.clear()` 清除所有数据;
8. `this.trackBy` 方便模版中循环 entities 直接使用的 trackBy 函数;
