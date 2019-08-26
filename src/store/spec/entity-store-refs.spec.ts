import { EntityStore, EntityState, EntityStoreOptions, ReferenceIdMap, OnCombineRefs } from '../entity-store';

describe('Store: EntityStore with refs', () => {
    interface UserInfo {
        uid: string;
        name: string;
    }

    interface GroupInfo {
        _id: string;
        name: string;
    }

    interface TaskInfo {
        _id?: string;
        title?: string;
        group_id?: string;
        created_by?: string;
        updated_by?: string;
        refs?: {
            group?: GroupInfo;
            created_by: UserInfo;
        };
    }

    interface TaskReferences {
        groups?: GroupInfo[];
        users?: UserInfo[];
        project?: { _id: string; name: string };
    }

    interface TasksState extends EntityState<TaskInfo, TaskReferences> {}

    class TasksStore extends EntityStore<TasksState, TaskInfo, TaskReferences>
        implements OnCombineRefs<TaskInfo, TaskReferences> {
        constructor(initialState?: TasksState, options?: EntityStoreOptions<TaskInfo, TaskReferences>) {
            super(initialState, options);
        }

        onCombineRefs(entity: TaskInfo, referenceIdMap: ReferenceIdMap<TaskReferences>) {
            entity.refs.group = referenceIdMap.groups[entity.group_id];
            entity.refs.created_by = referenceIdMap.users[entity.created_by];
        }
    }

    const initialUsers: UserInfo[] = [{ uid: '1', name: 'user 1' }, { uid: '2', name: 'user 2' }];

    const initialGroups: GroupInfo[] = [{ _id: 'group-1', name: 'group 1' }, { _id: 'group-2', name: 'group 2' }];

    const initialTasks: TaskInfo[] = [
        { _id: 'task-1', title: 'task 1', group_id: 'group-1', created_by: '1' },
        { _id: 'task-2', title: 'task 2', group_id: 'group-2', created_by: '2' }
    ];

    it('should get initial data when call store initialize', () => {
        const tasksStore = new TasksStore();
        tasksStore.initialize(
            initialTasks,
            {
                pageIndex: 1,
                pageSize: 20,
                pageCount: 20
            },
            { groups: initialGroups }
        );
        const state = tasksStore.snapshot;
        expect(state.entities).toEqual([
            { _id: 'task-1', title: 'task 1', group_id: 'group-1', created_by: '1' },
            { _id: 'task-2', title: 'task 2', group_id: 'group-2', created_by: '2' }
        ]);
        expect(state.pageIndex).toEqual(1);
        expect(state.pagination).toEqual({
            pageIndex: 1,
            pageSize: 20,
            pageCount: 20
        });
        expect(state.references).toEqual({ groups: initialGroups });
    });

    it('should get', () => {
        const tasksStore = new TasksStore(
            {
                entities: initialTasks,
                pageIndex: 0,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    count: initialTasks.length
                },
                references: { groups: initialGroups, users: initialUsers }
            },
            {
                referencesIdKeys: {
                    users: 'uid'
                },
                propertyKeys: {
                    group_id: {
                        referenceName: 'groups',
                        refsName: 'group'
                    },
                    created_by: {
                        referenceName: 'users',
                        refsName: 'created_by'
                    }
                }
            }
        );
        tasksStore.entitiesWithRefs$.subscribe(entities => {
            console.log(JSON.stringify(entities));
        });
    });

    describe('add', () => {
        let tasksStore: TasksStore;

        beforeEach(() => {
            tasksStore = new TasksStore(
                {
                    entities: initialTasks,
                    pagination: {
                        pageIndex: 1,
                        pageSize: 10,
                        count: initialTasks.length
                    },
                    pageIndex: 1,
                    references: { groups: initialGroups, users: initialUsers }
                },
                {
                    referencesIdKeys: {
                        users: 'uid'
                    },
                    propertyKeys: {
                        created_by: {
                            referenceName: 'users',
                            refsName: 'user'
                        }
                    }
                }
            );
        });

        it('should get 3 tasks and groups refs when add one user with new references', () => {
            const newTaskEntity = {
                _id: '3',
                name: 'user 3',
                department_id: 'dept-3'
            };
            const newGroup = {
                _id: 'group-3',
                name: 'group-3 name'
            };
            tasksStore.add(newTaskEntity, undefined, {
                groups: [newGroup]
            });
            const state = tasksStore.snapshot;
            expect(state.entities).toEqual([...initialTasks, newTaskEntity]);
            expect(state.references).toEqual({
                groups: [...initialGroups, newGroup],
                users: initialUsers
            });
        });

        it('should get 3 tasks and group refs when add one task with exist group', () => {
            const newTaskEntity = {
                _id: '3',
                name: 'user 3',
                department_id: 'dept-3'
            };
            const newGroup = {
                _id: 'group-2',
                name: 'group-2 new name'
            };
            tasksStore.add(newTaskEntity, undefined, {
                groups: [newGroup]
            });
            const state = tasksStore.snapshot;
            expect(state.entities).toEqual([...initialTasks, newTaskEntity]);
            expect(state.references.groups).toEqual([
                { _id: 'group-1', name: 'group 1' },
                { _id: 'group-2', name: 'group-2 new name' }
            ]);
        });

        it('should get 3 tasks and update users refs when use custom id key: uid ', () => {
            const newTaskEntity = {
                _id: '3',
                name: 'user 3',
                created_by: '1'
            };
            const newUser = {
                uid: '1',
                name: 'user 1 new name'
            };
            tasksStore.add(newTaskEntity, undefined, {
                users: [newUser]
            });
            const state = tasksStore.snapshot;
            expect(state.entities).toEqual([...initialTasks, newTaskEntity]);
            expect(state.references.users).toEqual([
                { uid: '1', name: 'user 1 new name' },
                { uid: '2', name: 'user 2' }
            ]);
        });
    });

    describe('update', () => {
        let tasksStore: TasksStore;

        beforeEach(() => {
            tasksStore = new TasksStore(
                {
                    entities: initialTasks,
                    pagination: null,
                    pageIndex: 1,
                    references: {
                        groups: initialGroups
                    }
                },
                undefined
            );
        });

        it(`update by id with new group`, () => {
            const originalEntities = tasksStore.snapshot.entities;
            const group3 = {
                _id: 'group-3',
                name: 'group-3 name'
            };
            tasksStore.update(
                'task-1',
                {
                    title: 'new 1 task',
                    group_id: 'group-3'
                },
                {
                    groups: [group3]
                }
            );
            const state = tasksStore.snapshot;
            const entity = state.entities.find(item => {
                return item._id === 'task-1';
            });
            expect(entity).toEqual({
                _id: 'task-1',
                title: 'new 1 task',
                group_id: 'group-3',
                created_by: '1'
            });
            expect(state.references.groups).toEqual([...initialGroups, group3]);
            expect(originalEntities === state.entities).toEqual(false, 'new state is immutable');
        });
    });
});
