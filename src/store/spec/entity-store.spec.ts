import { EntityStore, EntityState } from '../entity-store';

describe('Store: EntityStore', () => {
    interface UserInfo {
        _id: string;
        name: string;
    }

    interface UserEntityState extends EntityState<UserInfo> {}

    class UserEntityStore extends EntityStore<UserEntityState, UserInfo> {
        constructor(initialState?: UserEntityState) {
            super(initialState);
        }
    }

    const initialUserEntities = [
        { _id: '1', name: 'user 1' },
        { _id: '2', name: 'user 2' }
    ];

    it('store default value', () => {
        const userEntityStore = new UserEntityStore();
        const state = userEntityStore.snapshot;
        expect(state.pagination).toEqual(undefined);
        expect(state.entities).toEqual([]);

        expect(
            userEntityStore.trackBy(0, { _id: '111', name: 'name1' })
        ).toEqual('111');
    });

    it('store set value', () => {
        const userEntityStore = new UserEntityStore();
        userEntityStore.set(initialUserEntities, {
            pageIndex: 1,
            pageSize: 20,
            pageCount: 20
        });
        const state = userEntityStore.snapshot;
        expect(state.entities).toEqual([
            { _id: '1', name: 'user 1' },
            { _id: '2', name: 'user 2' }
        ]);
        expect(state.pageIndex).toEqual(1);
        expect(state.pagination).toEqual({
            pageIndex: 1,
            pageSize: 20,
            pageCount: 20
        });
    });

    describe('add', () => {
        let userEntityStore: UserEntityStore;

        beforeEach(() => {
            userEntityStore = new UserEntityStore({
                entities: initialUserEntities,
                pagination: null,
                pageIndex: 1
            });
        });

        it('store add one entity', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            userEntityStore.add(addUserEntity);
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([
                ...initialUserEntities,
                addUserEntity
            ]);
        });

        it('store add one entity prepend', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            userEntityStore.add(addUserEntity, {
                prepend: true
            });
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([
                addUserEntity,
                ...initialUserEntities
            ]);
        });

        it('store add entities', () => {
            const addUserEntities = [
                {
                    _id: '3',
                    name: 'user 3'
                },
                {
                    _id: '4',
                    name: 'user 4'
                }
            ];
            userEntityStore.add(addUserEntities);
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([
                ...initialUserEntities,
                ...addUserEntities
            ]);
        });
    });

    describe('remove', () => {
        let userEntityStore: UserEntityStore;

        beforeEach(() => {
            userEntityStore = new UserEntityStore({
                entities: initialUserEntities,
                pagination: null,
                pageIndex: 1
            });
        });

        it(`remove by id`, () => {
            userEntityStore.remove('1');
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual(
                initialUserEntities.filter(item => {
                    return item._id !== '1';
                })
            );
        });

        it(`remove by ids`, () => {
            userEntityStore.remove(['1', '2']);
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([]);
        });

        it(`remove by predicate`, () => {
            userEntityStore.remove(entity => {
                return entity._id === '1';
            });
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });
    });

    describe('update', () => {
        let userEntityStore: UserEntityStore;

        beforeEach(() => {
            userEntityStore = new UserEntityStore({
                entities: initialUserEntities,
                pagination: null,
                pageIndex: 1
            });
        });

        it(`update by id`, () => {
            userEntityStore.update('1', {
                name: 'new 1 user'
            });
            const state = userEntityStore.snapshot;
            const entity = state.entities.find(item => {
                return item._id === '1';
            });
            expect(entity).toEqual({
                _id: '1',
                name: 'new 1 user'
            });
        });

        it(`update by ids`, () => {
            userEntityStore.update(['1', '2'], {
                name: 'new 1 user'
            });
            const state = userEntityStore.snapshot;

            expect(state.entities).toEqual([
                {
                    _id: '1',
                    name: 'new 1 user'
                },
                {
                    _id: '2',
                    name: 'new 1 user'
                }
            ]);
        });

        it(`update by id and newStateFn`, () => {
            userEntityStore.update('1', user => {
                return {
                    ...user,
                    name: 'new 1 user'
                };
            });
            const state = userEntityStore.snapshot;
            const entity = state.entities.find(item => {
                return item._id === '1';
            });
            expect(entity).toEqual({
                _id: '1',
                name: 'new 1 user'
            });
        });
    });
});
