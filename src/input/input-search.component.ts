import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ElementRef,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UpdateHostClassService, mixinInitialized, ThyInitialized, Constructor, MixinBase } from 'ngx-tethys/core';
import { InputSize } from './input.directive';

export type ThyInputSearchTheme = 'ellipse' | '';
export type ThyInputSearchIconPosition = 'before' | 'after';

export const CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyInputSearchComponent),
    multi: true
};

const noop = () => {};

const _MixinBase: Constructor<ThyInitialized> & typeof MixinBase = mixinInitialized(MixinBase);
@Component({
    selector: 'thy-input-search',
    templateUrl: './input-search.component.html',
    providers: [UpdateHostClassService, CUSTOM_INPUT_SEARCH_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-input form-control thy-input-search'
    }
})
export class ThyInputSearchComponent extends _MixinBase implements ControlValueAccessor, OnInit {
    public onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    public disabled = false;

    public autoFocus = false;

    public iconPosition: ThyInputSearchIconPosition = 'before';

    @HostBinding('class.thy-input-search-ellipse') _isSearchEllipse = false;

    searchText: string;

    @Input() name = '';

    @Input() placeholder = '';

    @Input()
    set thyTheme(value: ThyInputSearchTheme) {
        if (value === 'ellipse') {
            this._isSearchEllipse = true;
        }
    }

    @Input()
    set thySearchFocus(value: boolean) {
        this.autoFocus = value;
    }

    @Input() set thyIconPosition(value: ThyInputSearchIconPosition) {
        this.iconPosition = value || 'before';
        this.updateClasses();
    }

    @Input() thySize: InputSize;

    /**
     * @deprecated please use thyClear
     */
    @Output() clear: EventEmitter<Event> = new EventEmitter<Event>();

    @Output() thyClear: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        super();
        updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.updateClasses(true);
    }

    updateClasses(forceUpdate = false) {
        if (this.initialized || forceUpdate) {
            this.updateHostClassService.updateClass([`thy-input-search-${this.iconPosition}`]);
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
        event.stopPropagation();
        if (this.disabled) {
            return;
        }
        this.searchText = '';
        this.onChangeCallback(this.searchText);
        this.clear.emit(event);
        this.thyClear.emit(event);
    }
}
