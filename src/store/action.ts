import { META_KEY } from './types';
import { findAndCreateStoreMetadata } from './utils';
import { Observable, Observer, of, throwError } from 'rxjs';
import { map, shareReplay, catchError, exhaustMap } from 'rxjs/operators';
import { ActionState } from './action-state';
import { ActionContext, ActionStatus } from './actions-stream';

export interface DecoratorActionOptions {
    type: string;
    payload?: any;
}

/**
 * Decorates a method with a action information.
 */
export function Action(action?: DecoratorActionOptions | string) {
    return function(target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = findAndCreateStoreMetadata(target);

        // default use function name as action type
        if (!action) {
            action = {
                type: name
            };
        }
        // support string for type
        if (typeof action === 'string') {
            action = {
                type: action
            };
        }
        const type = action.type;

        if (!action.type) {
            throw new Error(`Action ${action.type} is missing a static "type" property`);
        }

        const originalFn = descriptor.value;
        meta.actions[type] = {
            fn: name,
            originalFn: originalFn,
            type
        };

        descriptor.value = function(...args: any[]) {
            ActionState.changeAction(`${target.constructor.name}-${name}`);
            let result = originalFn.call(this, ...args);
            if (result instanceof Observable) {
                result = result.pipe(
                    catchError(error => {
                        return of({ status: ActionStatus.Errored, action: action, error: error });
                    }),
                    shareReplay(),
                    exhaustMap((result: ActionContext | any) => {
                        if (result && result.status === ActionStatus.Errored) {
                            return throwError(result.error);
                        } else {
                            return of(result);
                        }
                    })
                );
                result.subscribe();
            }
            return result;
        };
    };
}
