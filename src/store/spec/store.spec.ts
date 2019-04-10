import { Store, Action } from '../index';
import { of, Observable } from 'rxjs';
import { map, tap, skip } from 'rxjs/operators';

interface UserInfo {
    uid?: string;
    name?: string;
}

interface TeamInfo {
    _id?: string;
    name?: string;
}

describe('Store: Store', () => {
    interface AppState {
        me: UserInfo;
        team: TeamInfo;
    }

    const appStateActions = {
        loadMe: 'loadMe',
        initializeTeam: 'initializeTeam'
    };

    class AppStateStore extends Store<AppState> {
        constructor(initialState?: AppState) {
            super(
                initialState
                    ? initialState
                    : {
                          me: null,
                          team: null
                      }
            );
        }

        @Action({
            type: appStateActions.loadMe
        })
        public loadMe(state: AppState, payload: UserInfo) {
            state.me = payload;
            this.next(state);
        }

        @Action()
        public loadMeDirectly(payload: UserInfo) {
            const state = this.snapshot;
            state.me = payload;
            this.next(state);
        }

        @Action()
        public fetchMe(): Observable<UserInfo> {
            return of({
                uid: '1',
                name: 'peter'
            }).pipe(
                tap(user => {
                    const state = this.snapshot;
                    state.me = user;
                    this.next({
                        ...state
                    });
                })
            );
        }

        @Action()
        private initializeTeam(state: AppState, team: TeamInfo) {
            state.team = team;
            this.next(state);
        }

        @Action()
        private httpLoadTeam(state: AppState) {
            return of(null).pipe(
                map(() => {
                    state.team = {
                        name: 'fromHttp'
                    };
                    this.next(state);
                    return state.team;
                })
            );
        }
    }

    it('should get default null value when store initialized', () => {
        const appStore = new AppStateStore();
        appStore.subscribe(state => {
            expect(state.me).toBe(null);
            expect(state.team).toBe(null);
        });
    });

    it('should get default value when store initialized with data', () => {
        const appStore = new AppStateStore({
            team: {
                _id: '1',
                name: 'team 1'
            },
            me: null
        });
        appStore.subscribe(state => {
            expect(state.me).toBe(null);
            expect(state.team).toEqual({
                _id: '1',
                name: 'team 1'
            });
        });
    });

    it('should get value when store dispatch an action without type', () => {
        const appStore = new AppStateStore();
        let timer = 0;
        appStore
            .select((state: AppState) => {
                return state.team;
            })
            .subscribe(team => {
                if (timer === 0) {
                    expect(team).toBe(null);
                } else if (timer === 1) {
                    expect(team).toEqual({
                        name: 'team1'
                    });
                }
                timer++;
            });
        appStore.dispatch(appStateActions.initializeTeam, {
            name: 'team1'
        });
    });

    it('should get value when store dispatch an action with type', () => {
        const appStore = new AppStateStore();
        let timer = 0;
        appStore
            .select((state: AppState) => {
                return state.me;
            })
            .subscribe(me => {
                if (timer === 0) {
                    expect(me).toBe(null);
                } else if (timer === 1) {
                    expect(me).toEqual({
                        name: 'peter1'
                    });
                }
                timer++;
            });
        appStore.dispatch(appStateActions.loadMe, {
            name: 'peter1'
        });
    });

    it('should get value when store dispatch an action that return observable', () => {
        const appStore = new AppStateStore();
        appStore
            .select((state: AppState) => {
                return state.team;
            })
            .pipe(skip(1))
            .subscribe(team => {
                expect(team).toEqual({
                    name: 'fromHttp'
                });
            });
        appStore.dispatch('httpLoadTeam').subscribe((team: any) => {
            expect(team).toEqual({
                name: 'fromHttp'
            });
        });
    });

    it('should get value when directly call action method dispatch', () => {
        const appStore = new AppStateStore();
        let timer = 0;
        appStore
            .select((state: AppState) => {
                return state.me;
            })
            .subscribe(me => {
                if (timer === 0) {
                    expect(me).toBe(null);
                } else if (timer === 1) {
                    expect(me).toEqual({
                        name: 'peter1'
                    });
                }
                timer++;
            });
        appStore.loadMeDirectly({
            name: 'peter1'
        });
    });
});
