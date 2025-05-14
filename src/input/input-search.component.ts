import {
    AbstractControlValueAccessor,
    Constructor,
    mixinDisabled,
    mixinInitialized,
    mixinTabIndex,
    ThyCanDisable,
    ThyHasTabIndex,
    ThyInitialized,
    useHostFocusControl
} from 'ngx-tethys/core';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    inject,
    input,
    effect,
    signal,
    output,
    viewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { ThyInputDirective, ThyInputSize } from './input.directive';

import { FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyInputSearchTheme = 'default' | 'ellipse' | 'transparent' | '';
export type ThyInputSearchIconPosition = 'before' | 'after';

export const CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputSearch),
    multi: true
};

const noop = () => {};

const _MixinBase: Constructor<ThyHasTabIndex> &
    Constructor<ThyInitialized> &
    Constructor<ThyCanDisable> &
    typeof AbstractControlValueAccessor = mixinInitialized(mixinTabIndex(mixinDisabled(AbstractControlValueAccessor)));

/**
 * 搜索输入框
 * @name thy-input-search
 * @order 30
 */
@Component({
    selector: 'thy-input-search',
    templateUrl: './input-search.component.html',
    providers: [CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-input form-control thy-input-search',
        '[class.thy-input-search-ellipse]': 'thyTheme() === "ellipse"',
        '[class.thy-input-search-transparent]': 'thyTheme() === "transparent"',
        '[class.thy-input-search-before-with-clear]': 'searchText && iconPosition() === "before"',
        '[class.form-control-active]': 'focused()',
        '[attr.tabindex]': 'tabIndex'
    },
    imports: [ThyIcon, ThyInputDirective, ThyAutofocusDirective, FormsModule]
})
export class ThyInputSearch extends _MixinBase implements ControlValueAccessor, OnInit, OnDestroy {
    private cdr = inject(ChangeDetectorRef);
    private elementRef = inject(ElementRef);

    readonly inputElement = viewChild<ElementRef<any>>('input');

    private hostRenderer = useHostRenderer();

    private hostFocusControl = useHostFocusControl();

    public disabled = false;

    searchText: string;

    focused = signal(false);

    /**
     * 搜索框 name 属性
     */
    readonly name = input('');

    /**
     * 搜索框 Placeholder
     */
    readonly placeholder = input('');

    /**
     * 搜索框风格
     * @type 'default' | 'ellipse' | 'transparent'
     * @default default
     */
    readonly thyTheme = input<ThyInputSearchTheme>();

    /**
     * 是否自动聚焦
     * @default false
     */
    readonly autoFocus = input(false, { alias: 'thySearchFocus', transform: coerceBooleanProperty });

    /**
     * 搜索图标位置，当传入 after 时，搜索图标在输入框后方显示，有内容时显示为关闭按钮
     * @type ThyInputSearchIconPosition
     */
    readonly iconPosition = input('before', {
        alias: 'thyIconPosition',
        transform: (value: ThyInputSearchIconPosition) => value || 'before'
    });

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'default' | 'lg'
     */
    readonly thySize = input<ThyInputSize>();

    /**
     * @deprecated please use thyClear
     */
    readonly clear = output<Event>();

    /**
     * 清除搜索事件
     */
    readonly thyClear = output<Event>();

    constructor() {
        super();

        effect(() => {
            this.focused.set(this.autoFocus());
        });

        effect(() => {
            this.updateClasses();
        });
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.updateClasses(true);

        this.hostFocusControl.focusChanged = (origin: FocusOrigin) => {
            if (this.disabled) {
                return;
            }

            if (origin) {
                if (!this.focused()) {
                    this.inputElement().nativeElement.focus();
                }
            } else {
                if (this.focused()) {
                    this.focused.set(false);
                    this.onTouchedFn();
                }
            }
        };
    }

    updateClasses(forceUpdate = false) {
        if (this.initialized || forceUpdate) {
            this.hostRenderer.updateClass([`thy-input-search-${this.iconPosition()}`]);
        }
    }

    writeValue(value: any): void {
        this.searchText = value;
        this.cdr.markForCheck();
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    searchModelChange() {
        this.onChangeFn(this.searchText);
    }

    clearSearchText(event: Event) {
        const element = this.elementRef.nativeElement.querySelector('.input-search-control');
        element.focus();
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.searchText = '';
        this.onChangeFn(this.searchText);
        this.clear.emit(event);
        this.thyClear.emit(event);
    }

    ngOnDestroy(): void {
        this.hostFocusControl.destroy();
    }
}
