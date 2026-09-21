import {
    AbstractControlValueAccessor,
    Constructor,
    mixinDisabled,
    mixinInitialized,
    mixinTabIndex,
    ThyCanDisable,
    ThyFormControlSize,
    ThyHasTabIndex,
    ThyInitialized,
    useHostFocusControl
} from 'ngx-tethys/core';

import {
    Component,
    computed,
    effect,
    ElementRef,
    forwardRef,
    inject,
    input,
    OnDestroy,
    OnInit,
    output,
    signal,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { ThyInputAppearance, ThyInputDirective } from './input.directive';

import { FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/** transparent 已废弃，请使用 thyAppearance="ghost"*/
export type ThyInputSearchVariant = 'default' | 'ellipse' | 'transparent' | '';

/** @deprecated use ThyInputSearchVariant, will be removed in v23 */
export type ThyInputSearchTheme = ThyInputSearchVariant;

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
    host: {
        class: 'thy-input form-control thy-input-search',
        '[class.form-control-subtle]': 'appearance() === "subtle"',
        '[class.form-control-ghost]': 'appearance() === "ghost"',
        '[class.thy-input-search-before-with-clear]': 'searchText() && iconPosition() === "before" && !disabled()',
        '[class.thy-input-search-ellipse]': 'variant() === "ellipse"',
        '[class.thy-input-search-transparent]': 'variant() === "transparent"',
        '[class.form-control-active]': 'focused()',
        '[class.disabled]': 'disabled()',
        '[attr.tabindex]': 'tabIndex'
    },
    imports: [ThyIcon, ThyInputDirective, ThyAutofocusDirective, FormsModule]
})
export class ThyInputSearch extends _MixinBase implements ControlValueAccessor, OnInit, OnDestroy {
    private elementRef = inject(ElementRef);

    readonly inputElement = viewChild.required<ElementRef<any>>('input');

    private hostRenderer = useHostRenderer();

    private hostFocusControl = useHostFocusControl();

    public disabled = signal(false);

    searchText = signal<string>('');

    focused = signal(false);

    /**
     * 搜索框 name 属性
     */
    readonly name = input('');

    /**
     * 搜索框 Placeholder
     */
    readonly thyPlaceholder = input('');

    /**
     * 搜索框外观。`outline`: 灰色边框、白色底，hover/focus 时蓝色边框；`subtle`: 无边框，hover/focus 时蓝色边框；`ghost`: 无边框，hover/focus 时也无边框
     * @type outline | subtle | ghost
     * @default outline
     */
    readonly thyAppearance = input<ThyInputAppearance>();

    /**
     * 搜索框风格。`ellipse` 为圆角搜索框；`transparent` 已废弃，请使用 `thyAppearance="ghost"`
     * 搜索框形态。`transparent` 已废弃，将在 v23 彻底删除，请使用 thyAppearance="ghost"
     * @type 'default' | 'ellipse' | 'transparent'
     * @default default
     */
    readonly thyVariant = input<ThyInputSearchVariant>();

    /**
     * 搜索框风格（已废弃，将在 v23 彻底删除），请使用 thyVariant；`transparent` 已废弃，请使用 thyAppearance="ghost"
     * @deprecated please use thyVariant; transparent is deprecated, use thyAppearance="ghost", will be removed in v23
     * @type 'default' | 'ellipse' | 'transparent'
     * @default default
     */
    readonly thyTheme = input<ThyInputSearchTheme>();

    protected readonly appearance = computed<ThyInputAppearance>(
        () => this.thyAppearance() || (this.thyTheme() === 'transparent' ? 'ghost' : 'outline')
    );
    readonly variant = computed(() => this.thyVariant() || this.thyTheme() || 'default');

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
     * @type 'xs' | 'sm' | 'md' | 'lg'
     * @default md
     */
    readonly thySize = input<ThyFormControlSize, ThyFormControlSize | null | undefined>('md', {
        transform: value => value ?? 'md'
    });

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
            const iconPosition = this.iconPosition();
            this.hostRenderer.updateClass([`thy-input-search-${iconPosition}`]);
        });
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.hostFocusControl.focusChanged = (origin: FocusOrigin) => {
            if (this.disabled()) {
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

    writeValue(value: any): void {
        this.searchText.set(value);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    searchModelChange() {
        this.onChangeFn(this.searchText());
    }

    clearSearchText(event: Event) {
        const element = this.elementRef.nativeElement.querySelector('.input-search-control');
        element.focus();
        event.stopPropagation();
        if (this.disabled()) {
            return;
        }
        this.searchText.set('');
        this.onChangeFn(this.searchText());
        this.thyClear.emit(event);
    }

    ngOnDestroy(): void {
        this.hostFocusControl.destroy();
    }
}
