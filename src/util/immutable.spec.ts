import { produce } from './immutable';

describe('immutable', () => {
    interface UserInfo {
        _id: string;
        name: string;
    }

    const initialUserEntities = [{ _id: '1', name: 'user 1' }, { _id: '2', name: 'user 2' }];

    describe('add', () => {
        let users: UserInfo[];

        beforeEach(() => {
            users = initialUserEntities;
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
    });

    describe('remove', () => {
        let users: UserInfo[];

        beforeEach(() => {
            users = initialUserEntities;
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
            users = initialUserEntities;
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
});
