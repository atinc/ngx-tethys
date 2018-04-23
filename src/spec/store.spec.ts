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
        loadMe() {
            this.snapshot.me = {
                name: 'peter1'
            };
            this.state$.next(this.snapshot);
        }

    }

    const appStore = new AppStateStore();

    it(
        'should work test',
        () => {
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
            appStore.loadMe();
        }
    );
});
