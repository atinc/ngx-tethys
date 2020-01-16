import { coerceNumber, coerceBoolean, coerceCssPixel } from '../../util/helpers';

export function InputBoolean(): any {
    return propDecoratorFactory('InputBoolean', coerceBoolean);
}

export function InputCssPixel(): any {
    return propDecoratorFactory('InputCssPixel', coerceCssPixel);
}

export function InputNumber(): any {
    return propDecoratorFactory('InputNumber', coerceNumber);
}

function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
    function propDecorator(target: any, propName: string, originalDescriptor?: TypedPropertyDescriptor<any>): any {
        const privatePropName = `$$__${propName}`;

        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        return {
            get(): string {
                return originalDescriptor && originalDescriptor.get
                    ? originalDescriptor.get.bind(this)()
                    : this[privatePropName];
            },
            set(value: T): void {
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(fallback(value));
                }
                this[privatePropName] = fallback(value);
            }
        };
    }

    return propDecorator;
}
