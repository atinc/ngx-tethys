export abstract class StorePlugin {
    // abstract handleNewState(state: Readonly<object>): void;
    abstract handleNewState(actionName: string, state: Readonly<object>): void;
    abstract isConnectSuccessed(): boolean;
}
/**
 * @internal
 */
export interface ReduxDevtoolsInstance {
    send(action: string, state: object): void;
}

export function tinyStateVersion(): string {
    return 'v0.6.0';
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
            console.log(`未安装Chrome浏览器的拓展插件: Redux DevTools.`);
            console.log(`插件下载地址: https://www.chromefor.com/redux-devtools_v2-17-0/`);
            return;
        }
        this._devTools = globalDevtools.connect({
            name: `NgxStore ${tinyStateVersion()}`
        });
    }

    handleNewState(actionName: string, state: object): void {
        if (this.isConnectSuccessed()) {
            this._devTools.send(actionName, state);
        }
    }

    isConnectSuccessed(): boolean {
        if (this._devTools === null) {
            return false;
        }
        return true;
    }
}

function getReduxDevToolsPlugin(): any {
    if (!window[`___ReduxDevtoolsPlugin___`]) {
        window[`___ReduxDevtoolsPlugin___`] = new ReduxDevtoolsPlugin();
    }
    return window[`___ReduxDevtoolsPlugin___`];
}

export default getReduxDevToolsPlugin;
