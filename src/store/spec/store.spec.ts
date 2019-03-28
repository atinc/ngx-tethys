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
    class AppState {
        me: UserInfo;
        team: TeamInfo;
    }

    class AppStateStore extends Store<AppState> {
        constructor() {
            super({
                me: null,
                team: null
            });
        }

        @Action({
            type: 'loadMe'
        })
        public loadMe(state: AppState, payload) {
            state.me = payload;
            this.next(state);
        }

        @Action()
        public loadMeDirectly(payload: any) {
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
        private initTeam(state: AppState, team) {
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

    it('store default value', () => {
        const appStore = new AppStateStore();
        appStore
            .select((state: AppState) => {
                return state.me;
            })
            .subscribe(me => {
                expect(me).toBe(null);
            });
    });

    it('store action default type', () => {
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
        appStore.dispatch('initTeam', {
            name: 'team1'
        });
    });

    it('store dispatch value', () => {
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
        appStore.dispatch('loadMe', {
            name: 'peter1'
        });
    });

    it('store directly call action method dispatch', () => {
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

    it('store action return observable', () => {
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
});
