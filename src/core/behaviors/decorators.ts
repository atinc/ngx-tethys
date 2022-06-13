import { SafeAny } from 'ngx-tethys/types';
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberValue } from 'ngx-tethys/util';

export function InputBoolean(): PropertyDecorator {
    return makePropDecorator('InputBoolean', coerceBooleanProperty);
}

export function InputCssPixel(): PropertyDecorator {
    return makePropDecorator('InputCssPixel', coerceCssPixelValue);
}

export function InputNumber(): PropertyDecorator {
    return makePropDecorator('InputNumber', coerceNumberValue);
}

// const ELEMENT_REF_NAME = '__eRef';
// function makeInjectElementRef(target: SafeAny) {
//     if (target[ELEMENT_REF_NAME]) {
//         return;
//     }

//     const originalFactory = target.constructor.ɵfac;
//     target.constructor.ɵfac = function(t?: Type<any>) {
//         target[ELEMENT_REF_NAME] = directiveInject(ElementRef);
//         const instance = originalFactory(t);
//         return instance;
//     };
// }

// function getElementRef(target: SafeAny): ElementRef {
//     if (target[ELEMENT_REF_NAME]) {
//         return target[ELEMENT_REF_NAME];
//     } else {
//         throw new Error(`ElementRef is not exist, make sure in Ivy`);
//     }
// }

// export function ClassBinding(format: string): PropertyDecorator {
//     let lastClassName = '';
//     return makePropDecorator(
//         'ClassBinding',
//         (value: string, target?: SafeAny) => {
//             const newClassName = format.replace(`{{value}}`, value);
//             const element: HTMLElement = getElementRef(target).nativeElement;
//             if (element) {
//                 if (lastClassName !== newClassName) {
//                     lastClassName && element.classList.remove(lastClassName);
//                     element.classList.add(newClassName);
//                     lastClassName = newClassName;
//                 }
//             }
//             return newClassName;
//         },
//         (target: SafeAny, propName: string) => {
//             if (!target.constructor.ɵcmp) {
//                 throw new Error(`ClassBinding is only support Ivy`);
//             }
//             makeInjectElementRef(target);
//         }
//     );
// }

function makePropDecorator<T, D>(
    name: string,
    transform: (v: T, target?: SafeAny) => D,
    initialize?: PropertyDecorator
): PropertyDecorator {
    function propDecorator(target: SafeAny, propName: string, originalDescriptor?: TypedPropertyDescriptor<any>): any {
        initialize && initialize(target, propName);
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
