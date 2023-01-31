import { Constructor, InputBoolean, MixinBase, mixinInitialized, ThyInitialized } from 'ngx-tethys/core';

import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { ThyInputSize } from './input.directive';

export type ThyInputSearchTheme = 'default' | 'ellipse' | 'transparent' | '';
export type ThyInputSearchIconPosition = 'before' | 'after';

export const CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputSearchComponent),
    multi: true
};

const noop = () => {};

const _MixinBase: Constructor<ThyInitialized> & typeof MixinBase = mixinInitialized(MixinBase);

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
        '[class.form-control-active]': 'focused'
    }
})
export class ThyInputSearchComponent extends _MixinBase implements ControlValueAccessor, OnInit {
    public onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    private hostRenderer = useHostRenderer();

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

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    searchModelChange() {
        this.onChangeCallback(this.searchText);
    }

    clearSearchText(event: Event) {
        const element = this.elementRef.nativeElement.querySelector('.input-search-control');
        element.focus();
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.searchText = '';
        this.onChangeCallback(this.searchText);
        this.clear.emit(event);
        this.thyClear.emit(event);
    }

    onBlur(event: Event) {
        this.focused = false;
        this.onTouchedCallback();
        if (this.elementRef.nativeElement.onblur) {
            this.elementRef.nativeElement.onblur(event);
        }
    }
}
