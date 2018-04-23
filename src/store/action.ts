import { META_KEY } from './types';
import { findAndCreateStoreMetadata } from './util';

interface DecoratorActionOptions {
    type: string;
    payload?: any;
}

/**
 * Decorates a method with a action information.
 */
export function Action(action?: DecoratorActionOptions) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        const meta = findAndCreateStoreMetadata(target.constructor);

        // default use function name as action type
        if (!action) {
            action = {
                type: name
            };
        }
        const type = action.type;

        if (!action.type) {
            throw new Error(`Action ${action.type} is missing a static "type" property`);
        }

        if (!meta.actions[type]) {
            meta.actions[type] = [];
        }

        meta.actions[type].push({
            fn: name,
            type
        });
    };
}
