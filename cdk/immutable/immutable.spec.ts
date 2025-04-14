import { produce } from '@tethys/cdk';

describe('immutable', () => {
    interface UserInfo {
        _id: string;
        name: string;
    }

    const initialUserEntities = [
        { _id: '1', name: 'user 1' },
        { _id: '2', name: 'user 2' }
    ];

    describe('add', () => {
        let users: UserInfo[];

        beforeEach(() => {
            users = [...initialUserEntities];
        });

        it('should return 2 users when add []', () => {
            const addUserEntity = [];
            const result = produce(users).add(addUserEntity);
            expect(result).toEqual([...initialUserEntities]);
        });

        it('should return 3 users when add one entity', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            const result = produce(users).add(addUserEntity);
            expect(result).toEqual([...initialUserEntities, addUserEntity]);
        });

        it('should return 3 users when add one entity prepend', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            const result = produce(users).add(addUserEntity, {
                prepend: true
            });
            expect(result).toEqual([addUserEntity, ...initialUserEntities]);
        });

        it('should return 4 user add 2 entities', () => {
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
            const result = produce(users).add(addUserEntities);
            expect(result).toEqual([...initialUserEntities, ...addUserEntities]);
        });

        it('should return 3 users when add one entity afterId = 1', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            const result = produce(users).add(addUserEntity, { afterId: '1' });
            expect(result).toEqual([
                {
                    _id: '1',
                    name: 'user 1'
                },
                {
                    _id: '3',
                    name: 'user 3'
                },
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });

        it('should return 3 users when add one entity afterId = 2', () => {
            const addUserEntity = {
                _id: '3',
                name: 'user 3'
            };
            const result = produce(users).add(addUserEntity, { afterId: '2' });
            expect(result).toEqual([
                ...initialUserEntities,
                {
                    _id: '3',
                    name: 'user 3'
                }
            ]);
        });

        it('should return 4 users when add 2 entities afterId = 1', () => {
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
            const result = produce(users).add(addUserEntities, { afterId: '1' });
            expect(result).toEqual([
                {
                    _id: '1',
                    name: 'user 1'
                },
                ...addUserEntities,
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });

        it('should return 4 users when add 2 entities afterId = 3', () => {
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
            const result = produce(users).add(addUserEntities, { afterId: '3' });
            expect(result).toEqual([...addUserEntities, ...initialUserEntities]);
        });

        it('should return 4 users when add 2 entities afterId = 1 and prepend = true', () => {
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
            const result = produce(users).add(addUserEntities, { afterId: '1', prepend: true });
            expect(result).toEqual([
                {
                    _id: '1',
                    name: 'user 1'
                },
                ...addUserEntities,
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });

        it(`should return 4 users when add 2 entities afterId = '' and prepend = true`, () => {
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
            const result = produce(users).add(addUserEntities, { afterId: '', prepend: true });
            expect(result).toEqual([
                ...addUserEntities,
                {
                    _id: '1',
                    name: 'user 1'
                },
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });
    });

    describe('remove', () => {
        let users: UserInfo[];

        beforeEach(() => {
            users = [...initialUserEntities];
        });

        it(`should return 1 users when remove by id '1'`, () => {
            const result = produce(users).remove('1');
            expect(result).toEqual(
                users.filter(item => {
                    return item._id !== '1';
                })
            );
        });

        it(`should return 0 users when remove by ids ['1', 2]`, () => {
            const result = produce(users).remove(['1', '2']);
            expect(result).toEqual([]);
        });

        it(`should return 1 users when remove by predicate`, () => {
            const result = produce(users).remove(entity => {
                return entity._id === '1';
            });
            expect(result).toEqual([
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });

        // it(`should return 1 users when remove by object`, () => {
        //     const result = produce(users).remove({entity => {
        //         return entity._id === '1';
        //     }});
        //     expect(result).toEqual([
        //         {
        //             _id: '2',
        //             name: 'user 2'
        //         }
        //     ]);
        // });
    });

    describe('update', () => {
        let users: UserInfo[];

        beforeEach(() => {
            users = [...initialUserEntities];
        });

        it(`update by id 1`, () => {
            const result = produce(users).update('1', {
                name: 'new 1 user'
            });
            const entity = result.find(item => {
                return item._id === '1';
            });
            expect(entity).toEqual({
                _id: '1',
                name: 'new 1 user'
            });
            expect(result === users).toEqual(false);
            expect(result).toEqual([
                {
                    _id: '1',
                    name: 'new 1 user'
                },
                {
                    _id: '2',
                    name: 'user 2'
                }
            ]);
        });

        it(`update by id 1 with new IdKey`, () => {
            const teams = [
                {
                    tid: '1',
                    name: 'team 1'
                },
                {
                    tid: '2',
                    name: 'team 2'
                }
            ];
            const result = produce(teams, { idKey: 'tid' }).update('1', {
                name: 'new 1 team'
            });
            expect(result).toEqual([
                {
                    tid: '1',
                    name: 'new 1 team'
                },
                {
                    tid: '2',
                    name: 'team 2'
                }
            ]);
        });

        it(`update by ids`, () => {
            const result = produce(users).update(['1', '2'], {
                name: 'new 1 user'
            });

            expect(result).toEqual([
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
            const result = produce(users).update('1', user => {
                return {
                    ...user,
                    name: 'new 1 user'
                };
            });
            const entity = result.find(item => {
                return item._id === '1';
            });
            expect(entity).toEqual({
                _id: '1',
                name: 'new 1 user'
            });
        });
    });

    describe(`move`, () => {
        let users: UserInfo[];
        const initialUsers = [
            { _id: '1', name: 'user 1' },
            { _id: '2', name: 'user 2' },
            { _id: '3', name: 'user 3' }
        ];

        beforeEach(() => {
            users = initialUsers;
        });

        it(`should change position when id = '' `, () => {
            const result = produce(users).move('');
            expect(result).toEqual([...initialUsers]);
        });

        it(`should change position when id does not exist
        `, () => {
            const result = produce(users).move('100');
            expect(result).toEqual([...initialUsers]);
        });

        it(`should change position when afterId = 3 `, () => {
            const result = produce(users).move('2', { afterId: '3' });
            expect(result).toEqual([
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' },
                { _id: '2', name: 'user 2' }
            ]);
        });

        it(`should change position when afterId = ''`, () => {
            const result = produce(users).move('2', { afterId: '' });
            expect(result).toEqual([
                { _id: '2', name: 'user 2' },
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' }
            ]);
        });

        it(`should change position when toIndex = 2`, () => {
            const result = produce(users).move('2', { toIndex: 2 });
            expect(result).toEqual([
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' },
                { _id: '2', name: 'user 2' }
            ]);
        });

        it(`should change position when toIndex = 4`, () => {
            const result = produce(users).move('2', { toIndex: 4 });
            expect(result).toEqual([
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' },
                { _id: '2', name: 'user 2' }
            ]);
        });

        it(`should change position when toIndex = 0`, () => {
            const result = produce(users).move('2', { toIndex: 0 });
            expect(result).toEqual([
                { _id: '2', name: 'user 2' },
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' }
            ]);
        });

        it(`should change position when toIndex = -1`, () => {
            const result = produce(users).move('2', { toIndex: -1 });
            expect(result).toEqual([
                { _id: '2', name: 'user 2' },
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' }
            ]);
        });

        it(`should change position when moveOptions is null`, () => {
            const result = produce(users).move('2');
            expect(result).toEqual([
                { _id: '2', name: 'user 2' },
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' }
            ]);
        });

        it(`should change position when moveOptions is  afterId = 3 and toIndex = 0`, () => {
            const result = produce(users).move('2', { afterId: '3', toIndex: 2 });
            expect(result).toEqual([
                { _id: '1', name: 'user 1' },
                { _id: '3', name: 'user 3' },
                { _id: '2', name: 'user 2' }
            ]);
        });
    });

    describe(`id is number`, () => {
        it('should add user success', () => {
            const users = [{ id: 1, name: 'name1' }];
            const addedUsers = produce(users, { idKey: 'id' }).add({ id: 2, name: 'name2' });
            expect(addedUsers).toEqual([...users, { id: 2, name: 'name2' }]);
        });

        it('should remove user success', () => {
            const users = [{ id: 1, name: 'name1' }];
            const result = produce(users, { idKey: 'id' }).remove(1);
            expect(result).toEqual([]);
        });

        it('should update user success', () => {
            const users = [{ id: 1, name: 'name1' }];
            const result = produce(users, { idKey: 'id' }).update(1, { name: 'new name' });
            expect(result).toEqual([{ id: 1, name: 'new name' }]);
        });
    });
});
