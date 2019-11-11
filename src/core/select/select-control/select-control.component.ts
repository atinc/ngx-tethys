import {
    Component,
    Input,
    TemplateRef,
    EventEmitter,
    Output,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { UpdateHostClassService } from '../../../shared';
import { SelectOptionBase } from '../select-option/select-option-base';
import { isArray, isUndefinedOrNull } from '../../../util/helpers';

export type SelectControlSize = 'xs' | 'sm' | 'md' | 'lg' | '';

@Component({
    selector: 'thy-select-control,[thySelectControl]',
    templateUrl: './select-control.component.html',
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThySelectControlComponent implements OnInit {
    inputValue = '';

    isComposing = false;

    panelOpened = false;

    isMultiple = false;

    showSearch = false;

    disabled = false;

    size: SelectControlSize;

    selectedOptions: SelectOptionBase | SelectOptionBase[];

    searchInputControlClass: { [key: string]: boolean };

    choiceContentClass: { [key: string]: boolean };

    @Input()
    get thyPanelOpened(): boolean {
        return this.panelOpened;
    }

    set thyPanelOpened(value: boolean) {
        this.panelOpened = value;
        if (this.panelOpened && this.thyShowSearch) {
            Promise.resolve(null).then(() => {
                this.inputElement.nativeElement.focus();
            });
        }
        if (!this.panelOpened && this.thyShowSearch) {
            Promise.resolve(null).then(() => {
                this.setInputValue('');
            });
        }
        this.setSelectControlClass();
    }

    @Input()
    get thyIsMultiple(): boolean {
        return this.isMultiple;
    }

    set thyIsMultiple(value: boolean) {
        this.isMultiple = value;
        this.setSelectControlClass();
    }

    @Input()
    get thyShowSearch(): boolean {
        return this.showSearch;
    }

    set thyShowSearch(value: boolean) {
        this.showSearch = value;
        this.setSelectControlClass();
    }

    @Input()
    get thySelectedOptions(): SelectOptionBase | SelectOptionBase[] {
        return this.selectedOptions;
    }

    set thySelectedOptions(value: SelectOptionBase | SelectOptionBase[]) {
        if (this.selectedOptions === value) {
            return;
        }
        this.selectedOptions = value;
        if (this.panelOpened && this.thyShowSearch) {
            Promise.resolve(null).then(() => {
                this.setInputValue('');
            });
            this.inputElement.nativeElement.focus();
        }
    }

    @Input()
    get thyDisabled(): boolean {
        return this.disabled;
    }

    set thyDisabled(value: boolean) {
        this.disabled = value;
        this.setSelectControlClass();
    }

    @Input()
    customDisplayTemplate: TemplateRef<any>;

    @Input()
    thyAllowClear = false;

    @Input()
    thyPlaceholder = '';

    @Input()
    get thySize(): SelectControlSize {
        return this.size;
    }

    set thySize(value: SelectControlSize) {
        this.size = value;
        this.setSelectControlClass();
    }

    @Output()
    thyOnSearch = new EventEmitter<string>();

    @Output()
    public thyOnRemove = new EventEmitter<{ item: SelectOptionBase; $eventOrigin: Event }>();

    @Output()
    public thyOnClear = new EventEmitter<Event>();

    @ViewChild('inputElement')
    inputElement: ElementRef;

    get selectedValueStyle(): { [key: string]: string } {
        let showSelectedValue = false;
        if (this.showSearch) {
            if (this.panelOpened) {
                showSelectedValue = !(this.isComposing || this.inputValue);
            } else {
                showSelectedValue = true;
            }
        } else {
            showSelectedValue = true;
        }
        return { display: showSelectedValue ? 'block' : 'none' };
    }

    get placeholderStyle(): { [key: string]: string } {
        let placeholder = true;
        if (this.isSelectedValue) {
            placeholder = false;
        }
        if (!this.thyPlaceholder) {
            placeholder = false;
        }
        if (this.isComposing || this.inputValue) {
            placeholder = false;
        }
        return { display: placeholder ? 'block' : 'none' };
    }

    get selectedValue(): any {
        return this.thySelectedOptions;
    }

    get multipleSelectedValue(): any {
        return this.thySelectedOptions;
    }

    get showClearIcon(): boolean {
        return this.thyAllowClear && this.isSelectedValue;
    }

    get isSelectedValue(): boolean {
        return (
            (!this.isMultiple && !isUndefinedOrNull(this.thySelectedOptions)) ||
            (this.isMultiple && (<SelectOptionBase[]>this.thySelectedOptions).length > 0)
        );
    }

    constructor(
        private renderer: Renderer2,
        private element: ElementRef<any>,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(this.element.nativeElement);
    }

    ngOnInit() {
        this.setSelectControlClass();
    }

    setSelectControlClass() {
        const modeType = this.isMultiple ? 'multiple' : 'single';
        const selectControlClass = {
            [`form-control`]: true,
            [`form-control-${this.thySize}`]: !!this.thySize,
            [`form-control-custom`]: true,
            [`select-control`]: true,
            [`select-control-${modeType}`]: true,
            [`select-control-show-search`]: this.showSearch,
            [`panel-is-opened`]: this.panelOpened,
            [`disabled`]: this.disabled
        };
        this.updateHostClassService.updateClassByMap(selectControlClass);
        this.searchInputControlClass = {
            [`form-control`]: true,
            [`form-control-${this.thySize}`]: !!this.thySize,
            [`search-input-field`]: true,
            [`hidden`]: !this.thyShowSearch
        };

        this.choiceContentClass = {
            [`choice-content`]: true,
            [`text-truncate`]: true,
            [`font-size-${this.thySize}`]: !!this.thySize
        };
    }

    setInputValue(value: string) {
        this.inputValue = value;
        this.updateWidth();
        this.thyOnSearch.emit(this.inputValue);
    }

    handleBackspace(event: Event) {
        if (this.inputValue.length === 0 && this.selectedOptions instanceof Array) {
            if (this.selectedOptions.length > 0) {
                this.removeHandle(this.selectedOptions[this.selectedOptions.length - 1], event);
            }
        }
    }

    updateWidth() {
        if (this.isMultiple && this.thyShowSearch) {
            if (this.inputValue || this.isComposing) {
                this.renderer.setStyle(
                    this.inputElement.nativeElement,
                    'width',
                    `${this.inputElement.nativeElement.scrollWidth}px`
                );
            } else {
                this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
            }
        }
    }

    removeHandle(item: SelectOptionBase, $event: Event) {
        this.thyOnRemove.emit({ item: item, $eventOrigin: $event });
    }

    clearHandle($event: Event) {
        this.thyOnClear.emit($event);
    }

    trackValue(_index: number, option: SelectOptionBase): any {
        return option.thyValue;
    }
}
