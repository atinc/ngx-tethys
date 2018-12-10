import { Store } from './store';
import { Id, PaginationInfo } from './types';
import { helpers } from '../util';

export interface EntityStoreOptions {
    idKey: string;
}

export interface EntityAddOptions {
    prepend?: boolean;
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
    private options: EntityStoreOptions;

    get entities() {
        return this.snapshot.entities;
    }

    constructor(
        initialState = {
            pageIndex: 1,
            entities: []
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
     * this.store.set([Entity, Entity]);
     *
     */
    set(entities: TEntity[], pagination: PaginationInfo) {
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
    );
    update(id: Id | Id[] | null, newState?: Partial<TEntity>);
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
    ) {
        const ids = helpers.coerceArray(idsOrFn);

        const state = this.snapshot;
        for (let i = 0; i < state.entities.length; i++) {
            const oldEntity = state.entities[i];
            if (ids.includes(oldEntity[this.options.idKey])) {
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
     * this.store.remove();
     */
    remove(id: Id | Id[]);
    remove(predicate: (entity: Readonly<TEntity>) => boolean);
    remove(idsOrFn?: Id | Id[] | ((entity: Readonly<TEntity>) => boolean)) {
        const state = this.snapshot;
        if (helpers.isFunction(idsOrFn)) {
            state.entities = state.entities.filter(entity => {
                return !(idsOrFn as any)(entity);
            });
        } else {
            const ids = helpers.coerceArray(idsOrFn);
            state.entities = state.entities.filter(entity => {
                return !ids.includes(entity[this.options.idKey]);
            });
        }
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
