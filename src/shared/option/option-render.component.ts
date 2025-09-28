import {
    Component,
    TemplateRef,
    ChangeDetectionStrategy,
    HostListener,
    ElementRef,
    ChangeDetectorRef,
    inject,
    input,
    Input,
    output,
    computed,
    effect
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SelectOptionBase } from './select-option-base';
import { ENTER, SPACE, coerceBooleanProperty, hasModifierKey } from 'ngx-tethys/util';
import { ThyIcon } from 'ngx-tethys/icon';
import { SafeAny } from 'ngx-tethys/types';
import { NgTemplateOutlet } from '@angular/common';

/**
 * @private
 */
@Component({
    selector: 'thy-option-render',
    templateUrl: './option-render.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyIcon, NgTemplateOutlet],
    host: {
        class: 'thy-option-item',
        '[class.disabled]': 'thyDisabled()',
        '[attr.tabindex]': `tabIndex`,
        '[class.active]': 'selected()'
    }
})
export class ThyOptionRender extends SelectOptionBase implements Highlightable {
    element = inject<ElementRef<HTMLElement>>(ElementRef);

    private cdr = inject(ChangeDetectorRef);

    // // 继承至 SelectOptionBase
    @Input() thyValue: any;

    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    readonly thyShowOptionCustom = input<boolean>();

    readonly thySearchKey = input<string>();

    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    readonly thyTemplate = input<TemplateRef<any>>();

    readonly thySelectedValuesOfList = input([]);

    readonly showCheckedIcon = input(false, { alias: 'thyShowCheckedIcon', transform: coerceBooleanProperty });

    readonly thyActivatedValue = input();

    readonly selected = computed(() => {
        return this.thySelectedValuesOfList().includes(this.thyValue);
    });

    readonly activated = computed(() => {
        return this.thyActivatedValue() === this.thyValue;
    });

    readonly optionClick = output<{ value: SafeAny; isUserInput?: boolean }>();

    readonly optionHover = output<SafeAny>();

    // 继承自 Highlightable
    get disabled(): boolean {
        return this.thyDisabled();
    }

    get tabIndex(): string {
        return this.disabled ? '-1' : '0';
    }

    constructor() {
        super();

        effect(() => {
            this.activated() ? this.setActiveStyles() : this.setInactiveStyles();
        });
    }

    getHostElement(): HTMLElement {
        return this.element.nativeElement;
    }

    @HostListener('click', ['$event'])
    onClick() {
        this.selectViaInteraction();
    }

    @HostListener('mouseenter', ['$event'])
    mouseenter() {
        this.optionHover.emit(this.thyValue);
    }

    @HostListener('keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
            this.selectViaInteraction();
            event.preventDefault();
        }
    }

    selectViaInteraction(): void {
        if (!this.disabled) {
            this.optionClick.emit({ value: this.thyValue, isUserInput: true });
        }
    }

    select(): void {
        if (!this.disabled) {
            if (!this.selected()) {
                this.optionClick.emit({ value: this.thyValue });
            }
        }
    }

    deselect(): void {
        if (this.selected() || this.disabled) {
            this.optionClick.emit({ value: this.thyValue });
        }
    }

    setActiveStyles(): void {
        this.getHostElement().classList.add('hover');
        this.cdr.markForCheck();
    }

    setInactiveStyles(): void {
        this.getHostElement().classList.remove('hover');
        this.cdr.markForCheck();
    }

    getLabel(): string {
        return '';
    }
}
