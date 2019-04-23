import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ChangeDetectionStrategy,
    HostBinding,
    HostListener,
    ElementRef,
    InjectionToken,
    ChangeDetectorRef,
    EventEmitter,
    OnDestroy,
    Output,
    Inject,
    Optional
} from '@angular/core';
export class OptionSelectionChange {
    option: ThyOptionComponent;
    selected: boolean;
}

export interface IThySelectOptionParentComponent {
    thyMode: 'multiple' | '';
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_SELECT_OPTION_PARENT_COMPONENT = new InjectionToken<IThySelectOptionParentComponent>(
    'THY_SELECT_OPTION_PARENT_COMPONENT'
);

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOptionComponent implements OnDestroy {
    private _selected = false;
    @Input() thyValue: any;

    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    @Input() thyShowOptionCustom: boolean;

    @Input() thySearchKey: string;

    @HostBinding('class.thy-option-item') _isOptionItem = true;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    @Input()
    @HostBinding(`class.disabled`)
    thyDisabled: boolean;

    /** Whether or not the option is currently selected. */
    @HostBinding(`class.active`)
    get selected(): boolean {
        return this._selected;
    }

    @Output() readonly selectionChange: EventEmitter<OptionSelectionChange> = new EventEmitter();

    constructor(
        public element: ElementRef<HTMLElement>,
        @Optional() @Inject(THY_SELECT_OPTION_PARENT_COMPONENT) public parent: IThySelectOptionParentComponent
    ) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.parent.thyMode === 'multiple') {
            this._selected ? this.deselect() : this.select();
        } else {
            this.select();
        }
    }

    /** Selects the option. */
    select(event?: Event): void {
        if (!this.thyDisabled) {
            if (!this._selected) {
                this._selected = true;
                this.selectionChange.emit({
                    option: this,
                    selected: this._selected
                });
            }
        }
    }

    /** Deselects the option. */
    deselect(): void {
        if (this._selected) {
            this._selected = false;
            this.selectionChange.emit({
                option: this,
                selected: this._selected
            });
        }
    }

    ngOnDestroy() {}
}
