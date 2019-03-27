import { coerceArray, isFunction } from './helpers';
import { Id } from '../typings';

export interface EntityAddOptions {
    prepend?: boolean;
}

export interface ProducerOptions {
    idKey?: string;
}

export class Producer<TEntity> {
    private idKey = '_id';

    private entities: TEntity[];

    constructor(entities: TEntity[], options?: ProducerOptions) {
        this.entities = entities;
        if (options && options.idKey) {
            this.idKey = options.idKey;
        }
    }

    /**
     * Add an entity or entities.
     *
     * @example
     * produce([users]).add(Entity);
     * produce([users]).add([Entity, Entity]);
     * produce([users]).add(Entity, { prepend: true });
     */
    add(entity: TEntity | TEntity[], addOptions?: EntityAddOptions): TEntity[] {
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
     * Update an entity or entities.
     *
     * @example
     * produce([users]).update(3, {
     *   name: 'New Name'
     * });
     *
     * produce([users]).update(3, entity => {
     *    return {
     *      ...entity,
     *      name: 'New Name'
     *    }
     *  });
     *
     * produce([users]).update([1,2,3], {
     *   name: 'New Name'
     * });
     */
    update(id: Id | Id[] | null, newStateFn: (entity: Readonly<TEntity>) => Partial<TEntity>): TEntity[];
    update(id: Id | Id[] | null, newState?: Partial<TEntity>): TEntity[];
    update(
        idsOrFn: Id | Id[] | null | Partial<TEntity> | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn?: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>
    ): TEntity[] {
        const ids = coerceArray(idsOrFn);

        for (let i = 0; i < this.entities.length; i++) {
            const oldEntity = this.entities[i];
            if (ids.indexOf(oldEntity[this.idKey]) >= 0) {
                const newState = isFunction(newStateOrFn) ? (newStateOrFn as any)(oldEntity) : newStateOrFn;
                this.entities[i] = { ...(oldEntity as any), ...newState };
            }
        }
        return [...this.entities];
    }

    /**
     *
     * Remove one or more entities:
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

export function produce<TEntity>(entities: TEntity[], options?: ProducerOptions) {
    return new Producer(entities, options);
}
