/**
 * Status of a dispatched action
 */
export const enum ActionStatus {
    Dispatched = 'DISPATCHED',
    Successful = 'SUCCESSFUL',
    Canceled = 'CANCELED',
    Errored = 'ERRORED'
}

export interface ActionContext<T = unknown> {
    status: ActionStatus;
    action: T;
    error?: Error;
}
