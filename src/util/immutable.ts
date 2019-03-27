import { coerceArray, isFunction } from './helpers';
import { Id } from '../typings';

export interface EntityAddOptions {
    prepend?: boolean;
}

export class Producer<TEntity> {
    private idKey = '_id';

    private entities: TEntity[];

    constructor(entities: TEntity[]) {
        this.entities = entities;
    }

    add(entity: TEntity | TEntity[], addOptions?: EntityAddOptions) {
        const addEntities = coerceArray(entity);
        if (addEntities.length === 0) {
            return;
        }
        if (addOptions && addOptions.prepend) {
            this.entities = [...addEntities, ...this.entities];
        } else {
            this.entities = [...this.entities, ...addEntities];
        }
        return this.entities;
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
    update(id: Id | Id[] | null, newStateFn: (entity: Readonly<TEntity>) => Partial<TEntity>): TEntity[];
    update(id: Id | Id[] | null, newState?: Partial<TEntity>): TEntity[];
    update(
        idsOrFn:
            | Id
            | Id[]
            | null
            | Partial<TEntity>
            | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn?: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>
    ): TEntity[] {
        const ids = coerceArray(idsOrFn);

        for (let i = 0; i < this.entities.length; i++) {
            const oldEntity = this.entities[i];
            if (ids.includes(oldEntity[this.idKey])) {
                const newState = isFunction(newStateOrFn) ? (newStateOrFn as any)(oldEntity) : newStateOrFn;
                this.entities[i] = { ...(oldEntity as any), ...newState };
            }
        }
        return [...this.entities];
    }

    /**
     *
     * Remove one or more entities from the store:
     *
     * @example
     * produce([users]).remove(5);
     * produce([users]).remove([1,2,3]);
     * produce([users]).remove(entity => entity.id === 1);
     */
    remove(id: Id | Id[]): TEntity[];
    remove(predicate: (entity: Readonly<TEntity>) => boolean): TEntity[];
    remove(idsOrFn?: Id | Id[] | ((entity: Readonly<TEntity>) => boolean)): TEntity[] {
        if (isFunction(idsOrFn)) {
            this.entities = this.entities.filter(entity => {
                return !(idsOrFn as any)(entity);
            });
        } else {
            const ids = coerceArray(idsOrFn);
            this.entities = this.entities.filter(entity => {
                return ids.indexOf(entity[this.idKey]) === -1;
            });
        }
        return this.entities;
    }
}

export function produce<TEntity>(entities: TEntity[]) {
    return new Producer(entities);
}


// /**
//  * Add an entity or entities to the store.
//  *
//  * @example
//  * immutable.add(Entity);
//  * immutable.add([Entity, Entity]);
//  * immutable.add(Entity, { prepend: true });
//  */
// export function add<TEntity>(
//     entities: TEntity[],
//     entity: TEntity | TEntity[],
//     addOptions?: EntityAddOptions
// ): TEntity[] {
//     const addEntities = coerceArray(entity);
//     if (addEntities.length === 0) {
//         return;
//     }
//     let result: TEntity[] = null;
//     if (addOptions && addOptions.prepend) {
//         result = [...addEntities, ...entities];
//     } else {
//         result = [...entities, ...addEntities];
//     }
//     return result;
// }
