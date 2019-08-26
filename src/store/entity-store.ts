import { Store } from './store';
import { Id, PaginationInfo } from './types';
import { helpers, produce } from '../util';

import {
    mergeReferences,
    ReferenceExtractAllowKeys,
    ReferenceObjectExtract,
    ReferenceExtractAllowNames,
    buildReferencesKeyBy,
    ArrayInferExtract,
    ReferenceArrayExtractAllowKeys
} from '../util/helpers';
import { map } from 'rxjs/operators';

export type ReferencesPropertyKey<T, TEntity> = {
    [key in keyof ReferenceExtractAllowNames<T>]: keyof TEntity | Array<keyof TEntity>
};

export type PropertyKeyReferences<T, TEntity> = {
    [key in keyof TEntity]?: {
        referenceName: keyof ReferenceExtractAllowNames<T>;
        refsName: string;
    }
};

export type ReferencesIdKeyAndPropertyKeys<T, TEntity> = {
    [key in keyof ReferenceExtractAllowNames<T>]: {
        idKey?: keyof ReferenceObjectExtract<T>[key];
        propertyKey?: keyof TEntity;
    }
};

export type ReferenceIdMap<TReferences> = {
    [key in keyof TReferences]?: { [key: string]: ArrayInferExtract<TReferences[key]> }
};

type s = ReferencesIdKeyAndPropertyKeys<
    {
        users: { uid: string; name: string }[];
        info: { id: number; name: string };
        departments: { dept: number }[];
        ids: string[];
        id: string;
    },
    { id: string; name: number }
>;

export interface EntityStoreOptions<TEntity = undefined, TReferences = undefined> {
    idKey?: string;
    referencesIdKeys?: ReferenceArrayExtractAllowKeys<TReferences>;
    referencesPropertyKeys?: Partial<ReferencesPropertyKey<TReferences, TEntity>>;
    propertyKeys?: PropertyKeyReferences<TReferences, TEntity>;
    // referencesKeys?: Partial<ReferencesIdKeyAndPropertyKeys<TReferences, TEntity>>;
}

export interface EntityAddOptions {
    prepend?: boolean;
    // 如果是最后追加，自动跳转到最后一页
    autoGotoLastPage?: boolean;
}

export interface EntityState<TEntity, TReferences = undefined> {
    pageIndex?: number;
    pagination?: PaginationInfo;
    entities: TEntity[];
    references?: TReferences;
}

export interface OnCombineRefs<TEntity, TReferences> {
    onCombineRefs(entity: TEntity, referenceIdMap: ReferenceIdMap<TReferences>): void;
}

export class EntityStore<
    TState extends EntityState<TEntity, TReferences>,
    TEntity,
    TReferences = undefined
> extends Store<TState> {
    protected options: EntityStoreOptions<TEntity, TReferences>;

    private internalReferencesIdMap: ReferenceIdMap<TReferences>;

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
            // let propertyKeys: string[] = [];
            // if (this.options && this.options.propertyKeys) {
            //     propertyKeys = Object.keys(this.options.propertyKeys);
            // }
            return entities.map(entity => {
                const newEntity = { ...entity };

                if (this.onCombineRefs) {
                    if (!newEntity['refs']) {
                        newEntity['refs'] = {};
                    }
                    this.onCombineRefs(newEntity, this.internalReferencesIdMap);
                }
                // propertyKeys.forEach(propertyKey => {
                //     const propertyValue = entity[propertyKey];
                //     if (propertyValue) {
                //         const referenceName = this.options.propertyKeys[propertyKey].referenceName;
                //         const refsName = this.options.propertyKeys[propertyKey].refsName;
                //         const referenceIdMap = this.internalReferencesIdMap[referenceName];
                //         if (referenceIdMap && referenceIdMap[propertyValue]) {
                //             newEntity['refs'][refsName] = referenceIdMap[propertyValue];
                //         }
                //     }
                // });
                return newEntity;
            });
        })
    );

    onCombineRefs(entity: TEntity, referenceIdMap: ReferenceIdMap<TReferences>) {}

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
            pageIndex: 1,
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
     * this.store.initialize([Entity, Entity]);
     *
     */
    initialize(entities: TEntity[], pagination: PaginationInfo, references?: TReferences) {
        const state = this.snapshot;
        state.entities = entities || [];
        state.pagination = pagination;
        state.references = references;
        this.buildReferencesIdMap();
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
    add(entity: TEntity | TEntity[], addOptions?: EntityAddOptions, references?: Partial<TReferences>) {
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
                state.pageIndex = state.pagination.pageIndex = state.pagination.pageCount;
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
        newStateFn: (entity: Readonly<TEntity>, references?: TReferences) => Partial<TEntity>
    ): void;
    update(id: Id | Id[] | null, newState?: Partial<TEntity>, references?: TReferences): void;
    update(
        idsOrFn:
            | Id
            | Id[]
            | null
            | Partial<TState>
            | ((state: Readonly<TState>) => Partial<TState>)
            | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn?: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>,
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
        state.entities = produce(state.entities).remove(idsOrFn);
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
