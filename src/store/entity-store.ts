import { Store } from './store';
import { Id, PaginationInfo } from './types';
import { helpers, produce } from '../util';
import { mergeReferences, buildReferencesKeyBy, ReferenceArrayExtractAllowKeys } from '../util/references';
import { map } from 'rxjs/operators';
import { ReferencesIdDictionary, OnCombineRefsFn } from './references';

export interface EntityStoreOptions<TEntity = undefined, TReferences = undefined> {
    idKey?: string;
    referencesIdKeys?: ReferenceArrayExtractAllowKeys<TReferences>;
}

export interface EntityAddOptions {
    prepend?: boolean;
    // 如果是最后追加，自动跳转到最后一页
    autoGotoLastPage?: boolean;
}

export interface EntityState<TEntity, TReferences = undefined> {
    pagination?: PaginationInfo;
    entities: TEntity[];
    references?: TReferences;
}

export class EntityStore<
    TState extends EntityState<TEntity, TReferences>,
    TEntity,
    TReferences = undefined
> extends Store<TState> {
    protected options: EntityStoreOptions<TEntity, TReferences>;

    private internalReferencesIdMap: ReferencesIdDictionary<TReferences>;

    get entities() {
        return this.snapshot.entities;
    }

    entities$ = this.select(state => {
        return state.entities;
    });

    entitiesWithRefs$ = this.entities$.pipe(
        map(entities => {
            if (!entities) {
                return entities;
            }
            return entities.map(entity => {
                const newEntity = { ...entity };

                if (this['onCombineRefs']) {
                    if (!newEntity['refs']) {
                        newEntity['refs'] = {};
                    }
                    this['onCombineRefs'](newEntity, this.internalReferencesIdMap, this.snapshot.references);
                } else {
                    throw new Error(`onCombineRefs is not `);
                }
                return newEntity;
            });
        })
    );

    private resetPagination(pagination: PaginationInfo, count: number) {
        pagination.count = count;
        // 向上取整 21 / 20 = 1.05 = 2 pageCount is 2
        const pageCount = Math.ceil(pagination.count / pagination.pageSize);
        pagination.pageCount = pageCount;
        this.snapshot.pagination = { ...pagination };
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

    private buildReferencesIdMap() {
        if (this.snapshot.references) {
            this.internalReferencesIdMap = buildReferencesKeyBy(
                this.snapshot.references,
                this.options.referencesIdKeys
            );
        }
    }

    constructor(
        initialState: EntityState<TEntity, TReferences> = {
            entities: [] as TEntity[]
        },
        options: EntityStoreOptions<TEntity, TReferences> = { idKey: '_id' }
    ) {
        super(initialState);
        this.options = options;
        this.buildReferencesIdMap();
    }

    /**
     *
     * Replace current collection with provided collection
     *
     * @example
     * this.store.initialize([Entity, Entity], pagination: PaginationInfo);
     *
     */
    initialize(entities: TEntity[], pagination?: PaginationInfo) {
        const state = this.snapshot;
        state.entities = entities || [];
        state.pagination = pagination;
        this.next(state);
    }

    /**
     *
     * Replace current collection with provided collection with references
     *
     * @example
     * this.store.initializeWithReferences([Entity, Entity], references: TReferences, pagination: PaginationInfo);
     *
     */
    initializeWithReferences(entities: TEntity[], references: TReferences, pagination?: PaginationInfo) {
        const state = this.snapshot;
        state.entities = entities || [];
        state.pagination = pagination;
        state.references = references;
        this.buildReferencesIdMap();
        this.next(state);
    }

    /**
     * Add entity or entities for internal
     * @param entity
     * @param references
     * @param addOptions
     */
    private addInternal(entity: TEntity | TEntity[], references?: Partial<TReferences>, addOptions?: EntityAddOptions) {
        const addEntities = helpers.coerceArray(entity);
        if (addEntities.length === 0) {
            return;
        }

        const state = this.snapshot;
        state.entities = produce(state.entities).add(addEntities, addOptions);
        if (state.references) {
            mergeReferences(state.references, references, this.options.referencesIdKeys);
            this.buildReferencesIdMap();
        }
        if (state.pagination) {
            this.increasePagination(addEntities.length);
            if (addOptions && !addOptions.prepend && addOptions.autoGotoLastPage) {
                state.pagination.pageIndex = state.pagination.pageCount;
            }
        }
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
        this.addInternal(entity, undefined, addOptions);
    }

    /**
     * Add an entity or entities to the store with references.
     *
     * @example
     * this.store.add(Entity);
     * this.store.add([Entity, Entity]);
     * this.store.add(Entity, { prepend: true });
     */
    addWithReferences(entity: TEntity | TEntity[], references: Partial<TReferences>, addOptions?: EntityAddOptions) {
        this.addInternal(entity, references, addOptions);
    }

    /**
     *
     * Update an entity or entities in the store.
     *
     * @example
     * this.store.update(3, {
     *   name: 'New Name'
     * }, references);
     *
     *  this.store.update(3, entity => {
     *    return {
     *      ...entity,
     *      name: 'New Name'
     *    }
     *  }, references);
     *
     * this.store.update([1,2,3], {
     *   name: 'New Name'
     * }, references);
     */
    private updateInternal(
        idsOrFn: Id | Id[] | null,
        // | Partial<TState>
        // | ((state: Readonly<TState>) => Partial<TState>)
        // | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>,
        references?: TReferences
    ): void {
        const ids = helpers.coerceArray(idsOrFn);

        const state = this.snapshot;
        for (let i = 0; i < state.entities.length; i++) {
            const oldEntity = state.entities[i];
            if (ids.indexOf(oldEntity[this.options.idKey]) > -1) {
                const newState = helpers.isFunction(newStateOrFn) ? (newStateOrFn as any)(oldEntity) : newStateOrFn;
                state.entities[i] = { ...(oldEntity as any), ...newState };
            }
        }
        state.entities = [...state.entities];
        if (state.references) {
            mergeReferences(state.references, references, this.options.referencesIdKeys);
            this.buildReferencesIdMap();
        }
        this.next(state);
    }

    /**
     *
     * Update an entity or entities in the store with references.
     *
     * @example
     * this.store.update(3, {
     *   name: 'New Name'
     * }, references);
     *
     *  this.store.update(3, entity => {
     *    return {
     *      ...entity,
     *      name: 'New Name'
     *    }
     *  }, references);
     *
     * this.store.update([1,2,3], {
     *   name: 'New Name'
     * }, references);
     */
    update(
        idsOrFn: Id | Id[] | null,
        newStateOrFn: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>
    ): void {
        this.updateInternal(idsOrFn, newStateOrFn, undefined);
    }

    /**
     *
     * Update an entity or entities in the store with references.
     *
     * @example
     * this.store.updateWithReferences(3, {
     *   name: 'New Name'
     * }, references);
     *
     *  this.store.updateWithReferences(3, entity => {
     *    return {
     *      ...entity,
     *      name: 'New Name'
     *    }
     *  }, references);
     *
     * this.store.updateWithReferences([1,2,3], {
     *   name: 'New Name'
     * }, references);
     */
    updateWithReferences(
        idsOrFn: Id | Id[] | null,
        newStateOrFn: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>,
        references: TReferences
    ): void {
        this.updateInternal(idsOrFn, newStateOrFn, references);
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
    remove(idsOrFn?: Id | Id[] | ((entity: Readonly<TEntity>) => boolean)): void {
        const state = this.snapshot;
        const originalLength = state.entities.length;
        state.entities = produce(state.entities, this.options).remove(idsOrFn);
        this.decreasePagination(originalLength - state.entities.length);
        this.next(state);
    }

    trackBy(_index: number, entity: TEntity) {
        return entity[this.options.idKey];
    }

    clearPagination() {
        const state = this.snapshot;
        state.pagination = null;
        this.next(state);
    }

    clear() {
        const state = this.snapshot;
        state.entities = [];
        state.pagination = null;
        state.references = null;
        this.next(state);
    }
}
