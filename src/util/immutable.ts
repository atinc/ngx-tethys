import { Id } from 'ngx-tethys/types';
import { coerceArray, isFunction, isUndefinedOrNull } from './helpers';

export interface EntityAddOptions {
    prepend?: boolean;

    afterId?: Id;
}

export interface EntityMoveOptions {
    afterId?: Id;

    toIndex?: number;
}

export interface ProducerOptions {
    idKey?: string;
}

export class Producer<TEntity> {
    private idKey = '_id';

    private entities: TEntity[];

    constructor(entities: TEntity[], options?: ProducerOptions) {
        this.entities = entities || [];
        if (options && options.idKey) {
            this.idKey = options.idKey;
        }
    }

    private getEntityId(entity: TEntity): Id {
        return (entity as any)[this.idKey] as Id;
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
                    this.entities.findIndex(item => {
                        return this.getEntityId(item) === addOptions.afterId;
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
    update(id: Id | Id[] | null, newStateFn: (entity: Readonly<TEntity>) => Partial<TEntity>): TEntity[];
    update(id: Id | Id[] | null, newState?: Partial<TEntity>): TEntity[];
    update(
        idsOrFn: Id | Id[] | null | Partial<TEntity> | ((entity: Readonly<TEntity>) => boolean),
        newStateOrFn?: ((entity: Readonly<TEntity>) => Partial<TEntity>) | Partial<TEntity>
    ): TEntity[] {
        const ids = coerceArray(idsOrFn);

        for (let i = 0; i < this.entities.length; i++) {
            const oldEntity = this.entities[i];
            if (ids.indexOf(this.getEntityId(oldEntity)) >= 0) {
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
                return ids.indexOf(this.getEntityId(entity)) === -1;
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
        const fromIndex = this.entities.findIndex(item => this.getEntityId(item) === id);
        let toIndex = 0;
        const newEntities = [...this.entities];

        if (!id || fromIndex < 0) {
            return [...this.entities];
        }

        if (moveOptions) {
            if (!isUndefinedOrNull(moveOptions.afterId)) {
                toIndex = this.entities.findIndex(item => this.getEntityId(item) === moveOptions.afterId);
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

export function produce<TEntity>(entities: TEntity[], options?: ProducerOptions) {
    return new Producer(entities, options);
}
