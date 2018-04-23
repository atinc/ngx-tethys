import { Store, Action } from '../store';

describe('Store: Store', () => {

    class AppState {
        me: any;
        team: any;
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
        private loadMe(state, payload) {
            state.me = payload;
            this.state$.next(state);
        }

    }
    it('store dispatch', () => {
        const appStore = new AppStateStore();
        let timer = 0;
        appStore.select((state: AppState) => {
            return state.me;
        }).subscribe((me) => {
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

    // it('store selector', () => {
    //     const appStore = new AppStateStore();
    //     let timer = 0;
    //     appStore.select((state: AppState) => {
    //         return state.me;
    //     }).subscribe((me) => {
    //         if (timer === 0) {
    //             expect(me).toBe(null);
    //         } else if (timer === 1) {
    //             expect(me).toEqual({
    //                 name: 'peter1'
    //             });
    //         }
    //         timer++;
    //     });
    //     appStore.loadMe();
    // });
});
