import { EntityStore, EntityState, EntityStoreOptions } from '../entity-store';

describe('Store: EntityStore', () => {
    interface TaskInfo {
        _id: string;
        name: string;
    }

    interface TasksState extends EntityState<TaskInfo> {}

    class TasksEntityStore extends EntityStore<TasksState, TaskInfo> {
        constructor(initialState?: TasksState, options?: EntityStoreOptions) {
            super(initialState, options);
        }
    }

    const initialTasks = [{ _id: '1', name: 'task 1' }, { _id: '2', name: 'task 2' }];

    interface UserInfo {
        uid?: string;
        name?: string;
    }

    interface UsersState extends EntityState<UserInfo> {}

    class UsersEntityStore extends EntityStore<UsersState, UserInfo> {
        constructor(initialState?: UsersState) {
            super(initialState, {
                idKey: 'uid'
            });
        }
    }

    const initialUsers = [{ uid: 'user-1', name: 'user name-1' }, { uid: 'user-2', name: 'user name-2' }];

    it('should get store default value', () => {
        const taskEntityStore = new TasksEntityStore();
        const state = taskEntityStore.snapshot;
        expect(state.pagination).toEqual(undefined);
        expect(state.entities).toEqual([]);

        expect(taskEntityStore.trackBy(0, { _id: '111', name: 'name1' })).toEqual('111');
    });

    it('should get initialize data when call store initialize', () => {
        const taskEntityStore = new TasksEntityStore();
        taskEntityStore.initialize(initialTasks, {
            pageIndex: 2,
            pageSize: 20,
            pageCount: 20
        });
        const state = taskEntityStore.snapshot;
        expect(state.entities).toEqual([{ _id: '1', name: 'task 1' }, { _id: '2', name: 'task 2' }]);
        expect(state.pagination).toEqual({
            pageIndex: 2,
            pageSize: 20,
            pageCount: 20
        });
    });

    describe('add', () => {
        let tasksEntityStore: TasksEntityStore;

        beforeEach(() => {
            tasksEntityStore = new TasksEntityStore({
                entities: initialTasks,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    count: initialTasks.length
                }
            });
        });

        it('should get 3 users when add one task', () => {
            const addEntity = {
                _id: '3',
                name: 'user 3'
            };
            tasksEntityStore.add(addEntity);
            const state = tasksEntityStore.snapshot;
            expect(state.entities).toEqual([...initialTasks, addEntity]);
        });

        it('store add one entity prepend', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            tasksEntityStore.add(addUserEntity, {
                prepend: true
            });
            const state = tasksEntityStore.snapshot;
            expect(state.entities).toEqual([addUserEntity, ...initialTasks]);
        });

        it('store add entities', () => {
            const addEntities = [
                {
                    _id: '3',
                    name: 'user 3'
                },
                {
                    _id: '4',
                    name: 'user 4'
                }
            ];
            const originalEntities = tasksEntityStore.snapshot.entities;
            tasksEntityStore.add(addEntities);
            const state = tasksEntityStore.snapshot;
            expect(state.entities).toEqual([...initialTasks, ...addEntities]);
            expect(originalEntities === state.entities).toEqual(false, 'new entities is immutable');
        });

        it('store add entities goto last page', () => {
            tasksEntityStore = new TasksEntityStore({
                entities: initialTasks,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    pageCount: 1,
                    count: initialTasks.length
                }
            });
            const addEntities = [];
            for (let index = 0; index < 9; index++) {
                addEntities.push({
                    _id: index + 2,
                    name: `${index + 2} title`
                });
            }
            const state = tasksEntityStore.snapshot;
            const originalPagination = state.pagination;
            expect(state.pagination).toEqual({
                pageIndex: 1,
                count: initialTasks.length,
                pageSize: 10,
                pageCount: 1
            });
            tasksEntityStore.add(addEntities, {
                autoGotoLastPage: true
            });
            expect(state.pagination).toEqual({
                pageIndex: 2,
                count: initialTasks.length + addEntities.length,
                pageSize: 10,
                pageCount: 2
            });
            expect(originalPagination === state.pagination).toEqual(false, 'new pagination is immutable');
        });
    });

    describe('remove', () => {
        let tasksEntityStore: TasksEntityStore;

        beforeEach(() => {
            tasksEntityStore = new TasksEntityStore({
                entities: initialTasks,
                pagination: {
                    pageCount: 1,
                    pageIndex: 1,
                    pageSize: 10,
                    count: 2
                }
            });
        });

        it(`remove by id`, () => {
            const state = tasksEntityStore.snapshot;
            const originalEntities = state.entities;
            expect(state.pagination).toEqual({
                pageCount: 1,
                pageIndex: 1,
                pageSize: 10,
                count: 2
            });
            tasksEntityStore.remove('1');
            expect(state.pagination).toEqual({
                pageCount: 1,
                pageIndex: 1,
                pageSize: 10,
                count: 1
            });
            expect(state.entities).toEqual(
                initialTasks.filter(item => {
                    return item._id !== '1';
                })
            );
            expect(originalEntities === state.entities).toEqual(false, 'new state is immutable');
        });

        it(`remove by ids`, () => {
            tasksEntityStore.remove(['1', '2']);
            const state = tasksEntityStore.snapshot;
            expect(state.entities).toEqual([]);
        });

        it(`remove by predicate`, () => {
            tasksEntityStore.remove(entity => {
                return entity._id === '1';
            });
            const state = tasksEntityStore.snapshot;
            expect(state.entities).toEqual([
                {
                    _id: '2',
                    name: 'task 2'
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
            tasksEntityStore = new TasksEntityStore({
                entities: userEntities,
                pagination: {
                    pageCount: 2,
                    pageIndex: 1,
                    pageSize: 10,
                    count: 11
                }
            });
            const state = tasksEntityStore.snapshot;
            const originalPagination = state.pagination;
            expect(state.pagination).toEqual({
                pageCount: 2,
                pageIndex: 1,
                pageSize: 10,
                count: 11
            });
            tasksEntityStore.remove('1');
            expect(state.pagination).toEqual({
                pageCount: 1,
                pageIndex: 1,
                pageSize: 10,
                count: 10
            });
            expect(originalPagination === state.pagination).toEqual(false, 'new pagination is immutable');
        });

        it(`remove user by custom idKey uid`, () => {
            const userStore = new UsersEntityStore({
                entities: initialUsers
            });
            const state = userStore.snapshot;
            expect(state.entities).toEqual([...initialUsers]);
            userStore.remove('user-1');
            expect(state.entities).toEqual([{ uid: 'user-2', name: 'user name-2' }]);
        });
    });

    describe('update', () => {
        let tasksEntityStore: TasksEntityStore;

        beforeEach(() => {
            tasksEntityStore = new TasksEntityStore({
                entities: initialTasks,
                pagination: null
            });
        });

        it(`update by id`, () => {
            const originalEntities = tasksEntityStore.snapshot.entities;
            tasksEntityStore.update('1', {
                name: 'new 1 user'
            });
            const state = tasksEntityStore.snapshot;
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
            tasksEntityStore.update(['1', '2'], {
                name: 'new 1 user'
            });
            const state = tasksEntityStore.snapshot;

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
            tasksEntityStore.update('1', user => {
                return {
                    ...user,
                    name: 'new 1 user'
                };
            });
            const state = tasksEntityStore.snapshot;
            const entity = state.entities.find(item => {
                return item._id === '1';
            });
            expect(entity).toEqual({
                _id: '1',
                name: 'new 1 user'
            });
        });

        it(`update user by custom idKey uid`, () => {
            const userStore = new UsersEntityStore({
                entities: initialUsers
            });
            const state = userStore.snapshot;
            expect(state.entities).toEqual([...initialUsers]);
            userStore.update('user-1', {
                name: 'new user1 name'
            });
            expect(state.entities).toEqual([
                { uid: 'user-1', name: 'new user1 name' },
                { uid: 'user-2', name: 'user name-2' }
            ]);
        });
    });

    describe('clear', () => {
        it('should clear entities and pagination', () => {
            const tasksEntityStore = new TasksEntityStore({
                entities: initialTasks,
                pagination: { pageIndex: 1, count: 100, pageSize: 20 }
            });
            expect(tasksEntityStore.snapshot.entities).toEqual(initialTasks);
            expect(tasksEntityStore.snapshot.pagination).toEqual({ pageIndex: 1, count: 100, pageSize: 20 });
            tasksEntityStore.clear();
            expect(tasksEntityStore.snapshot.entities).toEqual([]);
            expect(tasksEntityStore.snapshot.pagination).toEqual(null);
        });

        it('should clear pagination', () => {
            const tasksEntityStore = new TasksEntityStore({
                entities: initialTasks,
                pagination: { pageIndex: 1, count: 100, pageSize: 20 }
            });
            expect(tasksEntityStore.snapshot.entities).toEqual(initialTasks);
            expect(tasksEntityStore.snapshot.pagination).toEqual({ pageIndex: 1, count: 100, pageSize: 20 });
            tasksEntityStore.clearPagination();
            expect(tasksEntityStore.snapshot.entities).toEqual(initialTasks);
            expect(tasksEntityStore.snapshot.pagination).toEqual(null);
        });
    });

    describe('constructor', () => {
        it('should merge default options', () => {
            const store = new TasksEntityStore(
                {
                    entities: initialTasks
                },
                {}
            );
            expect(store['options']).toEqual({
                idKey: '_id'
            });
        });

        it('should throw error when idKey is undefined', () => {
            expect(() => {
                return new TasksEntityStore(
                    {
                        entities: initialTasks
                    },
                    {
                        idKey: undefined
                    }
                );
            }).toThrowError('idKey is required in EntityStore');
        });
    });
});
