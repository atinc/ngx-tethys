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
    computed
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { SelectOptionBase } from './select-option-base';
import { ENTER, SPACE, coerceBooleanProperty, hasModifierKey } from 'ngx-tethys/util';
import { ThyIcon } from 'ngx-tethys/icon';
import { SafeAny } from 'ngx-tethys/types';
import { NgTemplateOutlet } from '@angular/common';

// 破坏性更改
export class ThyOptionSelectionChangeEvent {
    constructor(
        public option: ThyOptionRender
        // public isUserInput = false
    ) {}
}

//
// export class ThyOptionVisibleChangeEvent {
//     option: ThyOptionRender;
// }

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
        '[class.active]': 'selected()',
        '[class.activated]': 'thyActivatedValue() === thyValue'
    }

    // '[class.activated]': 'thyActivatedValue() === thyValue',

    // 以前，搜索，是通过 hidden 来控制只展示想要的选项，现在是通过 renderGroupsAndOptions 来控制只展示想要的选项，所以 hidden 不用了
    // '[class.hidden]': 'hidden()',
})
export class ThyOptionRender extends SelectOptionBase implements Highlightable {
    element = inject<ElementRef<HTMLElement>>(ElementRef);
    // parent = inject(THY_OPTION_PARENT_COMPONENT, { optional: true })!;
    private cdr = inject(ChangeDetectorRef);

    // // 继承至 SelectOptionBase，无法修改为 Signal
    @Input() thyValue: any;

    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    // readonly thyValue = input.required<any>();

    // readonly thyRawValue = input<any>();

    // readonly thyLabelText = input<string>();

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

    readonly optionClick = output<SafeAny>();

    readonly optionHover = output<SafeAny>();

    // readonly template = viewChild(TemplateRef);

    // readonly hidden: WritableSignal<boolean> = signal(false);

    // 继承至 Highlightable，暂时不修改为 Signal
    get disabled(): boolean {
        // return this.hidden() || this.thyDisabled();
        return this.thyDisabled();
    }

    get tabIndex(): string {
        return this.disabled ? '-1' : '0';
    }

    // readonly selected: WritableSignal<boolean> = signal(false);

    // readonly selectionChange = output<ThyOptionSelectionChangeEvent>();

    // readonly visibleChange = output<ThyOptionVisibleChangeEvent>();

    constructor() {
        super();
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
        // isUserInput
        if (!this.disabled) {
            this.optionClick.emit(this.thyValue);

            //     const selected = this.parent.isMultiple ? !this.selected() : true;
            //     this.selected.set(selected);
            //     this.cdr.markForCheck();
            //     this.emitSelectionChangeEvent(true);
        }
    }

    select(): void {
        if (!this.disabled) {
            if (!this.selected()) {
                //    this.selected.set(true);
                //    this.emitSelectionChangeEvent();
                //    this.cdr.markForCheck();
                this.optionClick.emit(this.thyValue);
            }
        }
    }

    deselect(): void {
        if (this.selected() || this.disabled) {
            //     this.selected.set(false);
            //     this.emitSelectionChangeEvent();
            //     this.cdr.markForCheck();
            this.optionClick.emit(this.thyValue);
        }
    }

    // hideOption() {
    //     if (!this.hidden()) {
    //         this.hidden.set(true);
    //         this.visibleChange.emit({ option: this });
    //     }
    // }

    // showOption() {
    //     if (this.hidden()) {
    //         this.hidden.set(false);
    //         this.visibleChange.emit({ option: this });
    //     }
    // }

    // matchSearchText(searchText: string): boolean {
    //     const thySearchKey = this.thySearchKey();
    //     if (thySearchKey) {
    //         if (thySearchKey.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         if (this.thyLabelText.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // }

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

    // TODO  需要在 option 中补充返回
    // private emitSelectionChangeEvent(isUserInput = false): void {
    //     this.selectionChange.emit(new ThyOptionSelectionChangeEvent(this, isUserInput));
    // }
}
