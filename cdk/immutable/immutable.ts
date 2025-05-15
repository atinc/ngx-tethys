import { coerceArray } from '@angular/cdk/coercion';
import { isFunction, isUndefinedOrNull, isArray } from '@tethys/cdk/is';
import { ObjectProducer } from './object-producer';

export type Id = string | number;

export type Ids = Id[];

export type IdOrIds = Id | Ids;

export interface EntityAddOptions {
    prepend?: boolean;

    afterId?: Id;
}

export interface EntityMoveOptions {
    afterId?: Id;

    toIndex?: number;
}

type ExtractKeysOfValueType<T, K> = { [I in keyof T]: T[I] extends K ? I : never }[keyof T];
export interface ProducerOptions<TEntity> {
    idKey?: ExtractKeysOfValueType<TEntity, Id>;
}

export class Producer<TEntity> {
    private idKey = '_id';

    private entities: TEntity[];

    constructor(entities: TEntity[], options?: ProducerOptions<TEntity>) {
        this.entities = entities || [];
        if (options && options.idKey) {
            this.idKey = options.idKey as string;
        }
    }

    /**
     * Add an entity or entities.
     *
     * @example
     * produce([users]).add(Entity);
     * produce([users]).add([Entity, Entity]);
     * produce([users]).add(Entity, { prepend: true });
     * produce([users]).add(Entity, { afterId: '' });
     */
    add(entity: TEntity | TEntity[], addOptions?: EntityAddOptions): TEntity[] {
        const addEntities = coerceArray(entity);
        if (addEntities.length === 0) {
            return this.entities;
        }
        if (addOptions && (addOptions.afterId || addOptions.prepend)) {
            if (addOptions.afterId) {
                const entities = [...this.entities];
                const index =
                    this.entities.findIndex((item: TEntity) => {
                        return item[this.idKey as keyof TEntity] === addOptions.afterId;
                    }) + 1;
                entities.splice(index, 0, ...addEntities);
                this.entities = [...entities];
            } else if (addOptions.prepend) {
                this.entities = [...addEntities, ...this.entities];
            }
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
    update(id: IdOrIds | null, newStateFn: (entity: Readonly<TEntity>) => Partial<TEntity>): TEntity[];
    update(id: IdOrIds | null, newState?: Partial<TEntity>): TEntity[];
    update(
        idsOrFn: IdOrIds | null | Partial<TEntity> | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn?: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>
    ): TEntity[] {
        const ids = coerceArray(idsOrFn);

        for (let i = 0; i < this.entities.length; i++) {
            const oldEntity = this.entities[i];
            if (ids.indexOf(oldEntity[this.idKey as keyof TEntity] as Id) >= 0) {
                const newState = isFunction(newStateOrFn) ? newStateOrFn(oldEntity) : newStateOrFn;
                this.entities[i] = { ...oldEntity, ...newState };
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
    remove(id: IdOrIds): TEntity[];
    remove(predicate: (entity: Readonly<TEntity>) => boolean): TEntity[];
    remove(idsOrFn?: IdOrIds | ((entity: Readonly<TEntity>) => boolean)): TEntity[] {
        if (isFunction(idsOrFn)) {
            this.entities = this.entities.filter(entity => {
                return !(idsOrFn as any)(entity);
            });
        } else {
            const ids = coerceArray(idsOrFn);
            this.entities = this.entities.filter(entity => {
                return ids.indexOf(entity[this.idKey as keyof TEntity] as Id) === -1;
            });
        }
        return this.entities;
    }

    /**
     *
     * Move one or more entities:
     *
     * @example
     * produce([users]).move(5, {afterId: 2});
     * produce([users]).move(5, {toIndex: 0});
     */
    move(id: Id, moveOptions?: EntityMoveOptions): TEntity[] {
        const fromIndex = this.entities.findIndex((item: TEntity) => (item[this.idKey as keyof TEntity] as Id) === id);
        let toIndex = 0;
        const newEntities = [...this.entities];

        if (!id || fromIndex < 0) {
            return [...this.entities];
        }

        if (moveOptions) {
            if (!isUndefinedOrNull(moveOptions.afterId)) {
                toIndex = this.entities.findIndex((item: TEntity) => (item[this.idKey as keyof TEntity] as Id) === moveOptions.afterId);
            } else if (moveOptions.toIndex) {
                toIndex = moveOptions.toIndex;
            }
        }
        toIndex = Math.max(0, Math.min(this.entities.length - 1, toIndex));
        if (toIndex === fromIndex) {
            return [...this.entities];
        } else {
            const target = this.entities[fromIndex];
            const delta = toIndex < fromIndex ? -1 : 1;

            for (let i = fromIndex; i !== toIndex; i += delta) {
                newEntities[i] = newEntities[i + delta];
            }
            newEntities[toIndex] = target;
            return [...newEntities];
        }
    }
}

export function produce<TEntity>(entities: TEntity[], options?: ProducerOptions<TEntity>): Producer<TEntity>;
export function produce<TEntity>(entities: TEntity): ObjectProducer<TEntity>;
export function produce<TEntity>(entities: TEntity | TEntity[], options?: ProducerOptions<TEntity>) {
    if (isArray(entities)) {
        return new Producer<TEntity>(entities, options);
    } else {
        return new ObjectProducer<TEntity>(entities);
    }
}
