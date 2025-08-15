import { ThyTagSize, ThyTag } from 'ngx-tethys/tag';
import { coerceBooleanProperty, isUndefinedOrNull } from 'ngx-tethys/util';

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    TemplateRef,
    numberAttribute,
    inject,
    input,
    viewChild,
    output,
    effect,
    Signal,
    computed,
    linkedSignal,
    untracked
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIcon } from 'ngx-tethys/icon';
import { SelectOptionBase } from '../../option/select-option-base';

export type SelectControlSize = 'xs' | 'sm' | 'md' | 'lg' | '';

/**
 * @private
 */
@Component({
    selector: 'thy-select-control,[thySelectControl]',
    templateUrl: './select-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, NgClass, NgStyle, ThyTag, NgTemplateOutlet, ThyIcon, ThyGridModule],
    host: {
        '[class.select-control-borderless]': 'thyBorderless()'
    }
})
export class ThySelectControl implements OnInit {
    private renderer = inject(Renderer2);

    inputValue = '';

    isComposing = false;

    searchInputControlClass: { [key: string]: boolean };

    private hostRenderer = useHostRenderer();

    readonly thyPanelOpened = input(false, { transform: coerceBooleanProperty });

    readonly thyIsMultiple = input(false, { transform: coerceBooleanProperty });

    readonly thyShowSearch = input(false, { transform: coerceBooleanProperty });

    readonly thySelectedOptions = input<SelectOptionBase | SelectOptionBase[]>();

    protected readonly previousSelectedOptions = linkedSignal({
        source: () => this.thySelectedOptions(),
        computation: (source, previous) => previous?.source
    });

    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    readonly customDisplayTemplate = input<TemplateRef<any>>(undefined);

    readonly thyAllowClear = input(false, { transform: coerceBooleanProperty });

    readonly thyPlaceholder = input('');

    readonly thySize = input<SelectControlSize>();

    readonly tagSize: Signal<ThyTagSize> = computed(() => {
        const value = this.thySize();
        if (value === 'xs' || value === 'sm') {
            return 'sm';
        } else if (value === 'lg') {
            return 'lg';
        } else {
            return 'md';
        }
    });

    readonly thyMaxTagCount = input(0, { transform: numberAttribute });

    readonly thyBorderless = input(false, { transform: coerceBooleanProperty });

    readonly thyPreset = input<string>('');

    public readonly thyOnSearch = output<string>();

    public readonly thyOnRemove = output<{ item: SelectOptionBase; $eventOrigin: Event }>();

    public readonly thyOnClear = output<Event>();

    public readonly thyOnBlur = output<Event>();

    readonly inputElement = viewChild<ElementRef>('inputElement');

    isSelectedValue = computed(() => {
        return (
            (!this.thyIsMultiple() && !isUndefinedOrNull(this.thySelectedOptions())) ||
            (this.thyIsMultiple() && (this.thySelectedOptions() as SelectOptionBase[]).length > 0)
        );
    });

    showClearIcon = computed(() => {
        return this.thyAllowClear() && this.isSelectedValue();
    });

    maxSelectedTags = computed(() => {
        const selectedOptions = this.thySelectedOptions();
        if (this.thyMaxTagCount() > 0 && selectedOptions instanceof Array && selectedOptions.length > this.thyMaxTagCount()) {
            return selectedOptions.slice(0, this.thyMaxTagCount() - 1);
        }
        return selectedOptions as SelectOptionBase[];
    });

    get selectedValueStyle() {
        let showSelectedValue = false;
        if (this.thyShowSearch()) {
            if (this.thyPanelOpened()) {
                showSelectedValue = !(this.isComposing || this.inputValue);
            } else {
                showSelectedValue = true;
            }
        } else {
            showSelectedValue = true;
        }
        return { display: showSelectedValue ? 'flex' : 'none' };
    }

    get placeholderStyle() {
        let placeholder = true;
        if (this.isSelectedValue()) {
            placeholder = false;
        }
        if (!this.thyPlaceholder()) {
            placeholder = false;
        }
        if (this.isComposing || this.inputValue) {
            placeholder = false;
        }
        return { display: placeholder ? 'block' : 'none' };
    }

    constructor() {
        effect(() => {
            const panelOpened = this.thyPanelOpened();
            if (panelOpened) {
                untracked(() => {
                    if (this.thyShowSearch()) {
                        Promise.resolve(null).then(() => {
                            this.inputElement().nativeElement.focus();
                        });
                    }
                });
            } else {
                untracked(() => {
                    if (this.thyShowSearch()) {
                        new Promise(resolve => setTimeout(resolve, 100)).then(() => {
                            if (this.inputValue) {
                                this.inputValue = '';
                                this.updateWidth();
                                this.thyOnSearch.emit(this.inputValue);
                            }
                        });
                    }
                });
            }
        });

        effect(() => {
            this.setSelectControlClass();
        });

        effect(() => {
            let sameValue = false;
            const oldValue = this.previousSelectedOptions();
            const value = this.thySelectedOptions();
            untracked(() => {
                if (this.thyIsMultiple()) {
                    if (oldValue instanceof Array && value instanceof Array && oldValue.length === value.length) {
                        sameValue = value.every((option, index) => option.thyValue === oldValue[index].thyValue);
                    }
                } else {
                    if (oldValue && value) {
                        sameValue = (oldValue as SelectOptionBase).thyValue === (value as SelectOptionBase).thyValue;
                    }
                }

                if (this.thyPanelOpened() && this.thyShowSearch()) {
                    if (!sameValue) {
                        Promise.resolve(null).then(() => {
                            this.inputValue = '';
                            this.updateWidth();
                        });
                    }
                    //等待组件渲染好再聚焦
                    setTimeout(() => {
                        if (this.thyPanelOpened()) {
                            this.inputElement().nativeElement.focus();
                        }
                    }, 200);
                }
            });
        });
    }

    ngOnInit() {}

    setSelectControlClass() {
        const modeType = this.thyIsMultiple() ? 'multiple' : 'single';
        const selectControlClass = {
            [`form-control`]: true,
            [`form-control-${this.thySize()}`]: !!this.thySize(),
            [`form-control-custom`]: true,
            [`select-control`]: true,
            [`select-control-${modeType}`]: true,
            [`select-control-show-search`]: this.thyShowSearch(),
            [`panel-is-opened`]: this.thyPanelOpened(),
            [`disabled`]: this.thyDisabled()
        };
        this.hostRenderer.updateClassByMap(selectControlClass);
        this.searchInputControlClass = {
            [`form-control`]: true,
            [`form-control-${this.thySize()}`]: !!this.thySize(),
            [`search-input-field`]: true,
            [`hidden`]: !this.thyShowSearch(),
            [`disabled`]: this.thyDisabled()
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
        const selectedOptions = this.thySelectedOptions();
        if (!this.inputValue?.length && selectedOptions instanceof Array) {
            if (selectedOptions.length > 0) {
                this.removeHandle(selectedOptions[selectedOptions.length - 1], event);
            }
        }
    }

    updateWidth() {
        if (this.thyIsMultiple() && this.thyShowSearch()) {
            if (this.inputValue || this.isComposing) {
                this.renderer.setStyle(this.inputElement().nativeElement, 'width', `${this.inputElement().nativeElement.scrollWidth}px`);
            } else {
                this.renderer.removeStyle(this.inputElement().nativeElement, 'width');
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
