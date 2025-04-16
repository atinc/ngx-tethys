import { mergeReferences, buildReferencesKeyBy } from 'ngx-tethys/util';

interface UserInfo {
    uid: string;
    name: string;
    department_id?: string;
}

interface DepartmentInfo {
    _id: string;
    name: string;
}

interface References {
    departments?: DepartmentInfo[];
    users?: UserInfo[];
    book?: {
        id: string;
    };
    ids?: string[];
}

const departments = [
    {
        _id: 'dept-1',
        name: 'dept-1 name'
    },
    {
        _id: 'dept-2',
        name: 'dept-2 name'
    }
];

const users = [{ uid: 'user-1', name: 'user-1 name' }];

describe('references', () => {
    describe('mergeReferences', () => {
        it('should append new department dept-3', () => {
            const references: References = {
                users: [...users],
                departments: [...departments]
            };
            mergeReferences(references, {
                departments: [
                    {
                        _id: 'dept-3',
                        name: 'dept-3 name'
                    }
                ]
            });
            expect(references).toEqual({
                departments: [
                    ...departments,
                    {
                        _id: 'dept-3',
                        name: 'dept-3 name'
                    }
                ],
                users: [...users]
            });
        });

        it('should throw error when original reference is not exist', () => {
            const references: References = {
                users: [...users]
            };
            try {
                mergeReferences(references, {
                    departments: [
                        {
                            _id: 'dept-3',
                            name: 'dept-3 name'
                        }
                    ]
                });
            } catch (error) {
                expect(error.message).toEqual(`original reference must exist when append new reference: departments`);
            }
        });

        it('should append new department dept-3 which is not array', () => {
            const references: References = {
                users: [...users],
                departments: [...departments]
            };

            mergeReferences(references, {
                departments: {
                    _id: 'dept-3',
                    name: 'dept-3 name'
                } as any
            });
            expect(references).toEqual({
                departments: [
                    ...departments,
                    {
                        _id: 'dept-3',
                        name: 'dept-3 name'
                    }
                ],
                users: [...users]
            });
        });

        it('should update which has exist department when append dept-2 ', () => {
            const references: References = {
                departments: [...departments]
            };
            mergeReferences(references, {
                departments: [
                    {
                        _id: 'dept-2',
                        name: 'dept-2 new name'
                    }
                ]
            });
            expect(references).toEqual({
                departments: [
                    {
                        _id: 'dept-1',
                        name: 'dept-1 name'
                    },
                    {
                        _id: 'dept-2',
                        name: 'dept-2 new name'
                    }
                ]
            });
            expect(departments).toEqual([
                {
                    _id: 'dept-1',
                    name: 'dept-1 name'
                },
                {
                    _id: 'dept-2',
                    name: 'dept-2 name'
                }
            ]);
        });

        it('should append new users with users idKey uid', () => {
            const references: References = {
                users: [...users],
                departments: [...departments]
            };

            mergeReferences(
                references,
                {
                    users: [
                        {
                            uid: 'user-3',
                            name: 'user-3 name'
                        }
                    ]
                },
                {
                    users: 'uid'
                }
            );

            expect(references).toEqual({
                departments: [...departments],
                users: [
                    ...users,
                    {
                        uid: 'user-3',
                        name: 'user-3 name'
                    }
                ]
            });
        });
    });

    describe('buildReferencesKeyBy', () => {
        it(`should build references map with departments`, () => {
            const result = buildReferencesKeyBy({
                departments: departments
            });
            expect(result).toEqual({
                departments: {
                    'dept-1': {
                        _id: 'dept-1',
                        name: 'dept-1 name'
                    },
                    'dept-2': {
                        _id: 'dept-2',
                        name: 'dept-2 name'
                    }
                }
            });
        });

        it(`should build references map with idKey is uid`, () => {
            const result = buildReferencesKeyBy(
                {
                    departments: departments,
                    users: users
                },
                {
                    users: 'uid'
                }
            );
            expect(result).toEqual({
                departments: {
                    'dept-1': {
                        _id: 'dept-1',
                        name: 'dept-1 name'
                    },
                    'dept-2': {
                        _id: 'dept-2',
                        name: 'dept-2 name'
                    }
                },
                users: {
                    'user-1': { uid: 'user-1', name: 'user-1 name' }
                }
            });
        });
    });
});
