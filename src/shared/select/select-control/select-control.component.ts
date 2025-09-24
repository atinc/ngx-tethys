import { ThyTagSize } from 'ngx-tethys/tag';
import { coerceArray, coerceBooleanProperty, isUndefinedOrNull } from 'ngx-tethys/util';

import {
    afterRenderEffect,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    NgZone,
    numberAttribute,
    OnInit,
    output,
    Renderer2,
    Signal,
    signal,
    TemplateRef,
    untracked,
    viewChild
} from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ThyFlexibleText } from 'ngx-tethys/flexible-text';
import { ThyGridModule } from 'ngx-tethys/grid';
import { injectLocale, ThySharedLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { Observable, of, throttleTime } from 'rxjs';
import { SelectOptionBase } from '../../option/select-option-base';

export type SelectControlSize = 'xs' | 'sm' | 'md' | 'lg' | '';

/**
 * @private
 */
@Component({
    selector: 'thy-select-control,[thySelectControl]',
    templateUrl: './select-control.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, NgClass, NgStyle, ThyTag, NgTemplateOutlet, ThyIcon, ThyGridModule, ThyTooltipDirective, ThyFlexibleText],
    host: {
        '[class.select-control-borderless]': 'thyBorderless()'
    }
})
export class ThySelectControl implements OnInit, AfterViewInit {
    private renderer = inject(Renderer2);

    private cdr = inject(ChangeDetectorRef);

    private ngZone = inject(NgZone);

    private readonly destroyRef = inject(DestroyRef);

    inputValue = model<string>('');

    isComposing = signal(false);

    searchInputControlClass: { [key: string]: boolean };

    private isFirstPanelOpenedChange = true;

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
    /**
     * 可以使用 thyShowMoreTag
     * @deprecated
     */
    readonly thyMaxTagCount = input(0, { transform: numberAttribute });

    readonly thyShowMoreTag = input(false, { transform: coerceBooleanProperty });

    readonly thyBorderless = input(false, { transform: coerceBooleanProperty });

    readonly thyPreset = input<string>('');

    public readonly thyOnSearch = output<string>();

    public readonly thyOnRemove = output<{ item: SelectOptionBase; $eventOrigin: Event }>();

    public readonly thyOnClear = output<Event>();

    public readonly thyOnBlur = output<Event>();

    readonly inputElement = viewChild<ElementRef>('inputElement');

    locale: Signal<ThySharedLocale> = injectLocale('shared');

    isSelectedValue = computed(() => {
        return (
            (!this.thyIsMultiple() && !isUndefinedOrNull(this.thySelectedOptions())) ||
            (this.thyIsMultiple() && (<SelectOptionBase[]>this.thySelectedOptions()).length > 0)
        );
    });

    readonly tagsContainer = viewChild<ElementRef>('tagsContainer');

    visibleTagCount = signal(0);

    showClearIcon = computed(() => {
        return this.thyAllowClear() && this.isSelectedValue();
    });

    selectedTags = computed(() => {
        if (!this.thyIsMultiple() || !this.thySelectedOptions()) return [];
        const selectedOptions = coerceArray(this.thySelectedOptions());

        return selectedOptions;
    });

    collapsedSelectedTags = computed(() => {
        if (!this.thyIsMultiple() || !this.thySelectedOptions()) return [];
        const selectedOptions = coerceArray(this.thySelectedOptions());

        const shouldShowMoreTags = this.thyShowMoreTag() || this.thyMaxTagCount() > 0;
        if (!shouldShowMoreTags) {
            return [];
        }

        if (this.visibleTagCount() <= 0) {
            return selectedOptions;
        }

        return selectedOptions.slice(this.visibleTagCount());
    });

    selectedValueStyle = computed(() => {
        let showSelectedValue = false;
        if (this.thyShowSearch()) {
            if (this.thyPanelOpened()) {
                showSelectedValue = !(this.isComposing() || this.inputValue());
            } else {
                showSelectedValue = true;
            }
        } else {
            showSelectedValue = true;
        }
        return { display: showSelectedValue ? 'flex' : 'none' };
    });

    placeholderStyle = computed(() => {
        let placeholder = true;
        if (this.isSelectedValue()) {
            placeholder = false;
        }
        if (!this.thyPlaceholder()) {
            placeholder = false;
        }
        if (this.isComposing() || this.inputValue()) {
            placeholder = false;
        }
        return { display: placeholder ? 'block' : 'none' };
    });

    constructor() {
        effect(() => {
            const panelOpened = this.thyPanelOpened();
            if (this.isFirstPanelOpenedChange) {
                this.isFirstPanelOpenedChange = false;
                return;
            }
            if (panelOpened) {
                untracked(() => {
                    if (this.thyShowSearch()) {
                        Promise.resolve(null).then(() => {
                            this.inputElement()?.nativeElement.focus();
                        });
                    }
                });
            } else {
                untracked(() => {
                    if (this.thyShowSearch()) {
                        new Promise(resolve => setTimeout(resolve, 100)).then(() => {
                            this.inputValue.set('');
                            this.updateWidth();
                            this.thyOnSearch.emit(this.inputValue());
                        });
                    }
                });
            }
        });

        effect(() => {
            this.setSelectControlClass();
        });

        effect(() => {
            const oldValue = this.previousSelectedOptions();
            const value = this.thySelectedOptions();
            if (value) {
                let sameValue = false;
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
                                this.inputValue.set('');
                                this.updateWidth();
                            });
                        }
                        //等待组件渲染好再聚焦
                        setTimeout(() => {
                            if (this.thyPanelOpened()) {
                                this.inputElement()?.nativeElement.focus();
                            }
                        }, 200);
                    }
                });
            }
        });

        afterRenderEffect(() => {
            untracked(() => {
                const isMultiple = this.thyIsMultiple();
                if (isMultiple) {
                    setTimeout(() => {
                        this.calculateVisibleTags();
                    }, 50);
                }
            });
        });
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            this.resizeObserver(this.inputElement()?.nativeElement)
                .pipe(throttleTime(100), takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.calculateVisibleTags();
                });
        });
    }

    private resizeObserver(element: HTMLElement): Observable<ResizeObserverEntry[]> {
        return typeof ResizeObserver === 'undefined' || !ResizeObserver
            ? of(null)
            : new Observable(observer => {
                  const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                      observer.next(entries);
                  });
                  resize.observe(element);
                  return () => {
                      resize.disconnect();
                  };
              });
    }

    private calculateVisibleTags() {
        if (!this.tagsContainer()?.nativeElement) return;

        const containerWidth = this.tagsContainer().nativeElement.offsetWidth;
        if (containerWidth <= 0) return;

        const selectedOptions = coerceArray(this.thySelectedOptions());
        if (!selectedOptions?.length) {
            this.visibleTagCount.set(0);
            return;
        }

        const shouldShowMoreTags = this.thyShowMoreTag() || this.thyMaxTagCount() > 0;

        if (!shouldShowMoreTags) {
            this.visibleTagCount.set(selectedOptions.length);
            this.cdr.markForCheck();
            return;
        }

        const COLLAPSED_TAG_WIDTH = 46;
        const TAG_GAP = 4;
        const availableWidth = containerWidth - COLLAPSED_TAG_WIDTH - 3;

        let totalWidth = 0;
        let visibleCount = 0;

        const tagElements = this.tagsContainer().nativeElement.querySelectorAll('.choice-item.selected,.custom-choice-item');
        for (let i = 0; i < selectedOptions.length; i++) {
            let tagWidth: number;

            tagWidth = (tagElements[i]?.offsetWidth || 80) + TAG_GAP;

            if (totalWidth + tagWidth > availableWidth) {
                break;
            }

            totalWidth += tagWidth;
            visibleCount++;
        }

        // 至少展示一个标签
        this.visibleTagCount.set(Math.max(1, visibleCount));

        this.cdr.markForCheck();
    }

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
        if (value !== this.inputValue()) {
            this.inputValue.set(value);
            this.updateWidth();
            this.thyOnSearch.emit(this.inputValue());
        }
    }

    handleBackspace(event: Event) {
        if ((event as KeyboardEvent).isComposing) {
            return;
        }
        const selectedOptions = this.thySelectedOptions();
        if (!this.inputValue()?.length && selectedOptions instanceof Array) {
            if (selectedOptions.length > 0) {
                this.removeHandle(selectedOptions[selectedOptions.length - 1], event);
            }
        }
    }

    updateWidth() {
        if (this.thyIsMultiple() && this.thyShowSearch()) {
            if (this.inputValue() || this.isComposing()) {
                this.renderer.setStyle(this.inputElement()?.nativeElement, 'width', `${this.inputElement()?.nativeElement.scrollWidth}px`);
            } else {
                this.renderer.removeStyle(this.inputElement()?.nativeElement, 'width');
            }
        }
    }

    removeHandle(item: SelectOptionBase, $event: Event) {
        this.thyOnRemove.emit({ item: item, $eventOrigin: $event });
    }

    clearHandle($event: Event) {
        this.thyOnClear.emit($event);
    }

    compositionChange(isComposing: boolean) {
        this.isComposing.set(isComposing);
    }

    trackValue(_index: number, option: SelectOptionBase): any {
        return option.thyValue;
    }

    onBlur(event: Event) {
        this.thyOnBlur.emit(event);
    }
}
