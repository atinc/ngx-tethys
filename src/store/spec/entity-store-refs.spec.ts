import { EntityStore, EntityState, EntityStoreOptions } from '../entity-store';
import { OnCombineRefs, ReferencesIdDictionary } from '../references';

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
            project?: { _id: string; name: string };
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

        onCombineRefs(
            entity: TaskInfo,
            referencesIdMap: ReferencesIdDictionary<TaskReferences>,
            references: TaskReferences
        ) {
            entity.refs.group = referencesIdMap.groups[entity.group_id];
            entity.refs.created_by = referencesIdMap.users[entity.created_by];
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
        tasksStore.initializeWithReferences(
            initialTasks,
            { groups: initialGroups },
            {
                pageIndex: 1,
                pageSize: 20,
                pageCount: 20
            }
        );
        const state = tasksStore.snapshot;
        expect(state.entities).toEqual([
            { _id: 'task-1', title: 'task 1', group_id: 'group-1', created_by: '1' },
            { _id: 'task-2', title: 'task 2', group_id: 'group-2', created_by: '2' }
        ]);
        expect(state.pagination).toEqual({
            pageIndex: 1,
            pageSize: 20,
            pageCount: 20
        });
        expect(state.references).toEqual({ groups: initialGroups });
    });

    it('should get correct refs by entitiesWithRefs$', () => {
        const tasksStore = new TasksStore(
            {
                entities: initialTasks,
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
                }
            }
        );
        const entitiesWithRefsSub = jasmine.createSpy('entitiesWithRefsSub');
        tasksStore.entitiesWithRefs$.subscribe(entitiesWithRefsSub);
        expect(entitiesWithRefsSub).toHaveBeenCalledTimes(1);
        expect(entitiesWithRefsSub).toHaveBeenCalledWith([
            {
                _id: 'task-1',
                title: 'task 1',
                group_id: 'group-1',
                created_by: '1',
                refs: {
                    group: { _id: 'group-1', name: 'group 1' },
                    created_by: { uid: '1', name: 'user 1' }
                }
            },
            {
                _id: 'task-2',
                title: 'task 2',
                group_id: 'group-2',
                created_by: '2',
                refs: {
                    group: { _id: 'group-2', name: 'group 2' },
                    created_by: { uid: '2', name: 'user 2' }
                }
            }
        ]);

        expect(tasksStore.snapshot.references).toEqual({ groups: initialGroups, users: initialUsers });
    });

    it('should get correct refs with directly visit references by entitiesWithRefs$', () => {
        const project = {
            _id: `project-new-1`,
            name: `project-new name 1`
        };
        const tasksStore = new TasksStore(
            {
                entities: initialTasks,
                pagination: {
                    pageIndex: 1,
                    pageSize: 10,
                    count: initialTasks.length
                },
                references: { project: project }
            },
            {
                referencesIdKeys: {
                    users: 'uid'
                }
            }
        );

        tasksStore.onCombineRefs = (
            entity: TaskInfo,
            referenceIdMap: ReferencesIdDictionary<TaskReferences>,
            references: TaskReferences
        ) => {
            entity.refs.project = references.project;
        };

        const entitiesWithRefsSub = jasmine.createSpy('entitiesWithRefsSub');
        tasksStore.entitiesWithRefs$.subscribe(entitiesWithRefsSub);
        expect(entitiesWithRefsSub).toHaveBeenCalledTimes(1);
        expect(entitiesWithRefsSub).toHaveBeenCalledWith([
            {
                _id: 'task-1',
                title: 'task 1',
                group_id: 'group-1',
                created_by: '1',
                refs: {
                    project: project
                }
            },
            {
                _id: 'task-2',
                title: 'task 2',
                group_id: 'group-2',
                created_by: '2',
                refs: {
                    project: project
                }
            }
        ]);
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
                    references: { groups: initialGroups, users: initialUsers }
                },
                {
                    referencesIdKeys: {
                        users: 'uid'
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
            tasksStore.addWithReferences(newTaskEntity, {
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
            tasksStore.addWithReferences(newTaskEntity, {
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
            tasksStore.addWithReferences(newTaskEntity, {
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
            tasksStore.updateWithReferences(
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

    describe('clear', () => {
        it('should clear entities, references pagination', () => {
            const tasksEntityStore = new TasksStore({
                entities: initialTasks,
                pagination: { pageIndex: 1, count: 100, pageSize: 20 },
                references: {
                    groups: initialGroups
                }
            });
            expect(tasksEntityStore.snapshot.references).toEqual({
                groups: initialGroups
            });
            tasksEntityStore.clear();
            expect(tasksEntityStore.snapshot.entities).toEqual([]);
            expect(tasksEntityStore.snapshot.pagination).toEqual(null);
            expect(tasksEntityStore.snapshot.references).toEqual(null);
        });
    });
});
