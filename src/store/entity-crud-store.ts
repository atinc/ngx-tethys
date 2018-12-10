import { EntityStore, EntityState, EntityStoreOptions } from './entity-store';
import { HttpClient } from '@angular/common/http';

export class EntityCrudStore<
    TState extends EntityState<TEntity>,
    TEntity
> extends EntityStore<TState, TEntity> {
    constructor(
        initialState = {
            pageIndex: 1,
            entities: []
        },
        private http: HttpClient,
        options: EntityStoreOptions = { idKey: '_id' }
    ) {
        super(initialState, options);
    }

    fetchEntities() {}
}
