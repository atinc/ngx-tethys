import { InputBoolean, InputNumber } from 'ngx-tethys/core';
import { ThyTagSize } from 'ngx-tethys/tag';
import { isUndefinedOrNull } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTag } from 'ngx-tethys/tag';
import { SelectOptionBase } from '../../option/select-option-base';
import { ThyGridModule } from 'ngx-tethys/grid';

export type SelectControlSize = 'sm' | 'md' | 'lg' | '';

/**
 * @private
 */
@Component({
    selector: 'thy-select-control,[thySelectControl]',
    templateUrl: './select-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, NgClass, NgIf, NgStyle, NgFor, ThyTag, NgTemplateOutlet, ThyIcon, ThyGridModule],
    host: {
        '[class.select-control-borderless]': 'thyBorderless'
    }
})
export class ThySelectControl implements OnInit {
    inputValue = '';

    isComposing = false;

    panelOpened = false;

    isMultiple = false;

    showSearch = false;

    disabled = false;

    size: SelectControlSize;

    selectedOptions: SelectOptionBase | SelectOptionBase[];

    searchInputControlClass: { [key: string]: boolean };

    tagSize: ThyTagSize;

    private hostRenderer = useHostRenderer();

    @Input()
    @InputBoolean()
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
    @InputBoolean()
    get thyIsMultiple(): boolean {
        return this.isMultiple;
    }

    set thyIsMultiple(value: boolean) {
        this.isMultiple = value;
        this.setSelectControlClass();
    }

    @Input()
    @InputBoolean()
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
        let sameValue = false;
        const oldValue = this.selectedOptions;
        if (this.isMultiple) {
            if (oldValue instanceof Array && value instanceof Array && oldValue.length === value.length) {
                sameValue = value.every((option, index) => option.thyValue === oldValue[index].thyValue);
            }
        } else {
            if (oldValue && value) {
                sameValue = (oldValue as SelectOptionBase).thyValue === (value as SelectOptionBase).thyValue;
            }
        }
        this.selectedOptions = value;
        if (this.panelOpened && this.thyShowSearch) {
            if (!sameValue) {
                Promise.resolve(null).then(() => {
                    this.setInputValue('');
                });
            }
            //等待组件渲染好再聚焦
            setTimeout(() => {
                if (this.panelOpened) {
                    this.inputElement.nativeElement.focus();
                }
            }, 200);
        }
    }

    @Input()
    @InputBoolean()
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
    @InputBoolean()
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

        if (value === 'sm') {
            this.tagSize = 'sm';
        } else if (value === 'lg') {
            this.tagSize = 'lg';
        } else {
            this.tagSize = 'md';
        }
    }

    @Input() @InputNumber() thyMaxTagCount = 0;

    @Input() @InputBoolean() thyBorderless = false;

    @Input() thyPreset: string = '';

    @Output()
    thyOnSearch = new EventEmitter<string>();

    @Output()
    public thyOnRemove = new EventEmitter<{ item: SelectOptionBase; $eventOrigin: Event }>();

    @Output()
    public thyOnClear = new EventEmitter<Event>();

    @Output()
    public thyOnBlur = new EventEmitter<Event>();

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
        return { display: showSelectedValue ? 'flex' : 'none' };
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

    get maxSelectedTags() {
        if (this.thyMaxTagCount > 0 && this.thySelectedOptions instanceof Array && this.thySelectedOptions.length > this.thyMaxTagCount) {
            return this.thySelectedOptions.slice(0, this.thyMaxTagCount - 1);
        }
        return this.thySelectedOptions as SelectOptionBase[];
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

    constructor(private renderer: Renderer2) {}

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
        this.hostRenderer.updateClassByMap(selectControlClass);
        this.searchInputControlClass = {
            [`form-control`]: true,
            [`form-control-${this.thySize}`]: !!this.thySize,
            [`search-input-field`]: true,
            [`hidden`]: !this.thyShowSearch
        };
    }

    setInputValue(value: string) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            this.updateWidth();
            this.thyOnSearch.emit(this.inputValue);
        }
    }

    handleBackspace(event: Event) {
        if ((event as KeyboardEvent).isComposing) {
            return;
        }
        if (this.inputValue.length === 0 && this.selectedOptions instanceof Array) {
            if (this.selectedOptions.length > 0) {
                this.removeHandle(this.selectedOptions[this.selectedOptions.length - 1], event);
            }
        }
    }

    updateWidth() {
        if (this.isMultiple && this.thyShowSearch) {
            if (this.inputValue || this.isComposing) {
                this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${this.inputElement.nativeElement.scrollWidth}px`);
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

    onBlur(event: Event) {
        this.thyOnBlur.emit(event);
    }
}
