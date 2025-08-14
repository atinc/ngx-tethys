import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberValue } from 'ngx-tethys/util';

/**
 * @deprecated Please use {transform: coerceBooleanProperty} in Input instead
 */
export function InputBoolean(): PropertyDecorator {
    return makePropDecorator('InputBoolean', coerceBooleanProperty);
}

export function InputCssPixel(): PropertyDecorator {
    return makePropDecorator('InputCssPixel', coerceCssPixelValue);
}

/**
 * @deprecated Please use {transform: numberAttribute} in Input instead
 */
export function InputNumber(): PropertyDecorator {
    return makePropDecorator('InputNumber', (value: number) => {
        return coerceNumberValue(value, null);
    });
}

function makePropDecorator<T, D>(
    name: string,
    transform: (v: T, target?: SafeAny) => D,
    initialize?: PropertyDecorator
): PropertyDecorator {
    function propDecorator(target: SafeAny, propName: string, originalDescriptor?: TypedPropertyDescriptor<any>): any {
        if (initialize) {
            initialize(target, propName);
        }
        const privatePropName = `$$__${propName}`;

        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
                console.warn(`The property "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
            }
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        return {
            get(): string {
                return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
            },
            set(value: T): void {
                const finalValue = transform(value, target);
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(finalValue);
                }
                this[privatePropName] = finalValue;
            }
        };
    }

    return propDecorator;
}
