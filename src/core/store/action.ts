import { META_KEY } from './types';
import { findAndCreateStoreMetadata } from './utils';
import { Observable, Observer, of, throwError } from 'rxjs';
import { map, shareReplay, catchError, exhaustMap } from 'rxjs/operators';
import { MiniActionState } from './action-state';
import { ActionContext, ActionStatus } from './actions-stream';

/**
 * Decorates a method with a action information.
 */
export function MiniAction() {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = findAndCreateStoreMetadata(target);
        let action!: { type: string };
        // default use function name as action type
        if (!action) {
            action = {
                type: name
            };
        }
        const type = action.type;

        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !action.type) {
            throw new Error(`Action ${action.type} is missing a static "type" property`);
        }

        const originalFn = descriptor.value;
        meta.actions[type] = {
            fn: name,
            originalFn: originalFn,
            type
        };

        descriptor.value = function (...args: any[]) {
            MiniActionState.changeAction(`${target.constructor.name}-${name}`);
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
