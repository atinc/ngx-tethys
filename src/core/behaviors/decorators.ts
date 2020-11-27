import { coerceNumberValue, coerceBooleanProperty, coerceCssPixelValue } from 'ngx-tethys/util';

export function InputBoolean(): any {
    return propDecoratorFactory('InputBoolean', coerceBooleanProperty);
}

export function InputCssPixel(): any {
    return propDecoratorFactory('InputCssPixel', coerceCssPixelValue);
}

export function InputNumber(): any {
    return propDecoratorFactory('InputNumber', coerceNumberValue);
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
                return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
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
