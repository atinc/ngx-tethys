export class AbstractControlValueAccessor<TValue = unknown> {
    protected onChangeFn: (value: TValue) => void = () => {};
    protected onTouchedFn: () => void = () => {};

    private __onBlurValidation: () => void = () => {};

    registerOnChange(fn: (value: TValue) => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedFn = () => {
            fn();
            this.__onBlurValidation();
        };
    }
}
