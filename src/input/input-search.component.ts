import {
    AbstractControlValueAccessor,
    Constructor,
    InputBoolean,
    mixinDisabled,
    mixinInitialized,
    mixinTabIndex,
    ThyCanDisable,
    ThyHasTabIndex,
    ThyInitialized,
    useHostFocusControl
} from 'ngx-tethys/core';

import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyAutofocusDirective } from 'ngx-tethys/shared';
import { ThyInputDirective, ThyInputSize } from './input.directive';

import { FocusOrigin } from '@angular/cdk/a11y';

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
        '[class.thy-input-search-ellipse]': 'thyTheme === "ellipse"',
        '[class.thy-input-search-transparent]': 'thyTheme === "transparent"',
        '[class.thy-input-search-before-with-clear]': 'searchText && iconPosition === "before"',
        '[class.form-control-active]': 'focused',
        '[attr.tabindex]': 'tabIndex'
    },
    standalone: true,
    imports: [NgIf, ThyIcon, ThyInputDirective, ThyAutofocusDirective, FormsModule]
})
export class ThyInputSearch extends _MixinBase implements ControlValueAccessor, OnInit, OnDestroy {
    @ViewChild('input', { static: true }) inputElement: ElementRef<any>;

    private hostRenderer = useHostRenderer();

    private hostFocusControl = useHostFocusControl();

    public disabled = false;

    public autoFocus = false;

    public iconPosition: ThyInputSearchIconPosition = 'before';

    searchText: string;

    focused = false;

    /**
     * 搜索框 name 属性
     */
    @Input() name = '';

    /**
     * 搜索框 Placeholder
     */
    @Input() placeholder = '';

    /**
     * 搜索框风格
     * @type 'default' | 'ellipse' | 'transparent'
     * @default default
     */
    @Input() thyTheme: ThyInputSearchTheme;

    /**
     * 是否自动聚焦
     * @default false
     */
    @Input()
    @InputBoolean()
    set thySearchFocus(value: boolean) {
        this.autoFocus = value;
        this.focused = value;
    }

    /**
     * 搜索图标位置，当传入 after 时，搜索图标在输入框后方显示，有内容时显示为关闭按钮
     * @type
     */
    @Input() set thyIconPosition(value: ThyInputSearchIconPosition) {
        this.iconPosition = value || 'before';
        this.updateClasses();
    }

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'default' | 'lg'
     */
    @Input() thySize: ThyInputSize;

    /**
     * @deprecated please use thyClear
     */
    @Output() clear: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * 清除搜索事件
     */
    @Output() thyClear: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.updateClasses(true);

        this.hostFocusControl.focusChanged = (origin: FocusOrigin) => {
            if (this.disabled) {
                return;
            }

            if (origin) {
                if (!this.focused) {
                    this.inputElement.nativeElement.focus();
                }
            } else {
                if (this.focused) {
                    this.focused = false;
                    this.onTouchedFn();
                }
            }
            this.cdr.markForCheck();
        };
    }

    updateClasses(forceUpdate = false) {
        if (this.initialized || forceUpdate) {
            this.hostRenderer.updateClass([`thy-input-search-${this.iconPosition}`]);
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
