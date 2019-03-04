export abstract class StorePlugin {
    // abstract handleNewState(state: Readonly<object>): void;
    abstract handleNewState(actionName: string, state: Readonly<object>): void;
}
/**
 * @internal
 */
export interface ReduxDevtoolsInstance {
    send(action: string, state: object): void;
}

export function tinyStateVersion(): string {
    return 'v0.1.0';
}

export class ReduxDevtoolsPlugin implements StorePlugin {
    private _devTools: ReduxDevtoolsInstance | null = null;
    _window = window;
    constructor(
    ) {
        if (this._window == null) {
            return;
        }
        const globalDevtools: { connect(config: any): ReduxDevtoolsInstance } | undefined =
            (this._window as any)['__REDUX_DEVTOOLS_EXTENSION__'] ||
            (this._window as any)['devToolsExtension'];

        if (!globalDevtools) {
            return;
        }
        this._devTools = globalDevtools.connect({
            name: `NgxStore ${tinyStateVersion()}`
        });
    }

    handleNewState(actionName: string, state: object): void {
        // if (this._config.enabled === false || !this._devTools) {
        //     return;
        // }
        this._devTools.send(actionName, state);
    }
}

function getReduxDevTools(): any {
    if (!window[`___ReduxDevtoolsPlugin___`]) {
        window[`___ReduxDevtoolsPlugin___`] = new ReduxDevtoolsPlugin();
    }
    return window[`___ReduxDevtoolsPlugin___`];
}

export default getReduxDevTools;
