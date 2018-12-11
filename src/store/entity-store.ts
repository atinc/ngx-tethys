import { Store } from './store';
import { Id, PaginationInfo } from './types';
import { helpers } from '../util';
import { Observable } from 'rxjs';

export interface EntityStoreOptions {
    idKey: string;
}

export interface EntityAddOptions {
    prepend?: boolean;
    // 如果是最后追加，自动跳转到最后一页
    autoGotoLastPage?: boolean;
}

export interface EntityState<TEntity> {
    pageIndex: number;
    pagination: PaginationInfo;
    entities: TEntity[];
    [key: string]: any;
}

export class EntityStore<
    TState extends EntityState<TEntity>,
    TEntity
> extends Store<TState> {
    protected options: EntityStoreOptions;

    private resetPagination(pagination: PaginationInfo, count: number) {
        pagination.count = count;
        // 向上取整 21 / 20 = 1.05 = 2 pageCount is 2
        const pageCount = Math.ceil(pagination.count / pagination.pageSize);
        pagination.pageCount = pageCount;
    }

    private increasePagination(amount: number) {
        const pagination = this.snapshot.pagination;
        this.resetPagination(pagination, pagination.count + amount);
    }

    private decreasePagination(amount: number) {
        const pagination = this.snapshot.pagination;
        if (pagination) {
            this.resetPagination(pagination, pagination.count - amount);
        }
    }

    get entities() {
        return this.snapshot.entities;
    }

    get entities$(): Observable<TEntity[]> {
        return this.select((state: TState) => {
            return state.entities;
        });
    }

    constructor(
        initialState = {
            pageIndex: 1,
            entities: [] as TEntity[]
        },
        options: EntityStoreOptions = { idKey: '_id' }
    ) {
        super(initialState);
        this.options = options;
    }

    /**
     *
     * Replace current collection with provided collection
     *
     * @example
     * this.store.initialize([Entity, Entity]);
     *
     */
    initialize(entities: TEntity[], pagination: PaginationInfo) {
        const state = this.snapshot;
        state.entities = entities || [];
        state.pagination = pagination;
        this.next(state);
    }

    /**
     * Add an entity or entities to the store.
     *
     * @example
     * this.store.add(Entity);
     * this.store.add([Entity, Entity]);
     * this.store.add(Entity, { prepend: true });
     */
    add(entity: TEntity | TEntity[], addOptions?: EntityAddOptions) {
        const addEntities = helpers.coerceArray(entity);
        if (addEntities.length === 0) {
            return;
        }
        const state = this.snapshot;
        if (addOptions && addOptions.prepend) {
            state.entities = [...addEntities, ...state.entities];
        } else {
            state.entities = [...state.entities, ...addEntities];
        }
        if (state.pagination) {
            this.increasePagination(addEntities.length);
            if (
                addOptions &&
                !addOptions.prepend &&
                addOptions.autoGotoLastPage
            ) {
                state.pageIndex = state.pagination.pageIndex =
                    state.pagination.pageCount;
            }
        }
        this.next(state);
    }

    /**
     *
     * Update an entity or entities in the store.
     *
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
    update(
        id: Id | Id[] | null,
        newStateFn: ((entity: Readonly<TEntity>) => Partial<TEntity>)
    ): void;
    update(id: Id | Id[] | null, newState?: Partial<TEntity>): void;
    update(
        idsOrFn:
            | Id
            | Id[]
            | null
            | Partial<TState>
            | ((state: Readonly<TState>) => Partial<TState>)
            | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn?:
            | ((entity: Readonly<TEntity>) => Partial<TEntity>)
            | Partial<TEntity>
    ): void {
        const ids = helpers.coerceArray(idsOrFn);

        const state = this.snapshot;
        for (let i = 0; i < state.entities.length; i++) {
            const oldEntity = state.entities[i];
            if (ids.indexOf(oldEntity[this.options.idKey]) > -1) {
                const newState = helpers.isFunction(newStateOrFn)
                    ? (newStateOrFn as any)(oldEntity)
                    : newStateOrFn;
                state.entities[i] = { ...(oldEntity as any), ...newState };
            }
        }
    }

    /**
     *
     * Remove one or more entities from the store:
     *
     * @example
     * this.store.remove(5);
     * this.store.remove([1,2,3]);
     * this.store.remove(entity => entity.id === 1);
     */
    remove(id: Id | Id[]): void;
    remove(predicate: (entity: Readonly<TEntity>) => boolean): void;
    remove(
        idsOrFn?: Id | Id[] | ((entity: Readonly<TEntity>) => boolean)
    ): void {
        const state = this.snapshot;
        const originalLength = state.entities.length;
        if (helpers.isFunction(idsOrFn)) {
            state.entities = state.entities.filter(entity => {
                return !(idsOrFn as any)(entity);
            });
        } else {
            const ids = helpers.coerceArray(idsOrFn);
            state.entities = state.entities.filter(entity => {
                return ids.indexOf(entity[this.options.idKey]) === -1;
            });
        }
        this.decreasePagination(originalLength - state.entities.length);
        this.next(state);
    }

    trackBy(_index: number, entity: TEntity) {
        return entity[this.options.idKey];
    }

    clear() {
        const state = this.snapshot;
        state.pageIndex = 1;
        state.entities = [];
        state.pagination = null;
    }
}
