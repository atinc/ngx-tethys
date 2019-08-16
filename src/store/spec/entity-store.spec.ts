import { EntityStore, EntityState, EntityStoreOptions } from '../entity-store';

describe('Store: EntityStore', () => {
    interface UserInfo {
        _id: string;
        name: string;
    }

    interface UserEntityState extends EntityState<UserInfo> {}

    class UserEntityStore extends EntityStore<UserEntityState, UserInfo> {
        constructor(initialState?: UserEntityState, options?: EntityStoreOptions) {
            super(initialState, options);
        }
    }

    const initialUserEntities = [{ _id: '1', name: 'user 1' }, { _id: '2', name: 'user 2' }];

    it('should get store default value', () => {
        const userEntityStore = new UserEntityStore();
        const state = userEntityStore.snapshot;
        expect(state.pagination).toEqual(undefined);
        expect(state.entities).toEqual([]);

        expect(userEntityStore.trackBy(0, { _id: '111', name: 'name1' })).toEqual('111');
    });

    it('should get initialize data when call store initialize', () => {
        const userEntityStore = new UserEntityStore();
        userEntityStore.initialize(initialUserEntities, {
            pageIndex: 1,
            pageSize: 20,
            pageCount: 20
        });
        const state = userEntityStore.snapshot;
        expect(state.entities).toEqual([{ _id: '1', name: 'user 1' }, { _id: '2', name: 'user 2' }]);
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
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    count: initialUserEntities.length
                },
                pageIndex: 1
            });
        });

        it('should get 3 users when add one user', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            userEntityStore.add(addUserEntity);
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([...initialUserEntities, addUserEntity]);
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
            expect(state.entities).toEqual([addUserEntity, ...initialUserEntities]);
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
            const originalEntities = userEntityStore.snapshot.entities;
            userEntityStore.add(addUserEntities);
            const state = userEntityStore.snapshot;
            expect(state.entities).toEqual([...initialUserEntities, ...addUserEntities]);
            expect(originalEntities === state.entities).toEqual(false, 'new entities is immutable');
        });

        it('store add entities goto last page', () => {
            userEntityStore = new UserEntityStore({
                entities: initialUserEntities,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    pageCount: 1,
                    count: initialUserEntities.length
                },
                pageIndex: 1
            });
            const addUserEntities = [];
            for (let index = 0; index < 9; index++) {
                addUserEntities.push({
                    _id: index + 2,
                    name: `${index + 2} user`
                });
            }
            const state = userEntityStore.snapshot;
            const originalPagination = state.pagination;
            expect(state.pageIndex).toEqual(1);
            expect(state.pagination).toEqual({
                pageIndex: 1,
                count: initialUserEntities.length,
                pageSize: 10,
                pageCount: 1
            });
            userEntityStore.add(addUserEntities, {
                autoGotoLastPage: true
            });
            expect(state.pageIndex).toEqual(2);
            expect(state.pagination).toEqual({
                pageIndex: 2,
                count: initialUserEntities.length + addUserEntities.length,
                pageSize: 10,
                pageCount: 2
            });
            expect(originalPagination === state.pagination).toEqual(false, 'new pagination is immutable');
        });
    });

    describe('remove', () => {
        let userEntityStore: UserEntityStore;

        beforeEach(() => {
            userEntityStore = new UserEntityStore({
                entities: initialUserEntities,
                pagination: {
                    pageCount: 1,
                    pageIndex: 1,
                    pageSize: 10,
                    count: 2
                },
                pageIndex: 1
            });
        });

        it(`remove by id`, () => {
            const state = userEntityStore.snapshot;
            const originalEntities = state.entities;
            expect(state.pagination).toEqual({
                pageCount: 1,
                pageIndex: 1,
                pageSize: 10,
                count: 2
            });
            userEntityStore.remove('1');
            expect(state.pagination).toEqual({
                pageCount: 1,
                pageIndex: 1,
                pageSize: 10,
                count: 1
            });
            expect(state.entities).toEqual(
                initialUserEntities.filter(item => {
                    return item._id !== '1';
                })
            );
            expect(originalEntities === state.entities).toEqual(false, 'new state is immutable');
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

        it(`remove triggered pagination changed`, () => {
            const userEntities = [];
            for (let index = 0; index < 11; index++) {
                userEntities.push({
                    _id: `${index + 1}`,
                    name: `${index + 1} name`
                });
            }
            userEntityStore = new UserEntityStore({
                entities: userEntities,
                pagination: {
                    pageCount: 2,
                    pageIndex: 1,
                    pageSize: 10,
                    count: 11
                },
                pageIndex: 1
            });
            const state = userEntityStore.snapshot;
            const originalPagination = state.pagination;
            expect(state.pagination).toEqual({
                pageCount: 2,
                pageIndex: 1,
                pageSize: 10,
                count: 11
            });
            userEntityStore.remove('1');
            expect(state.pagination).toEqual({
                pageCount: 1,
                pageIndex: 1,
                pageSize: 10,
                count: 10
            });
            expect(originalPagination === state.pagination).toEqual(false, 'new pagination is immutable');
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
            const originalEntities = userEntityStore.snapshot.entities;
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
            expect(originalEntities === state.entities).toEqual(false, 'new state is immutable');
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
