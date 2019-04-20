import {
    Component,
    Input,
    OnInit,
    AfterViewInit,
    TemplateRef,
    ViewChild,
    ContentChildren,
    QueryList,
    ChangeDetectionStrategy,
    HostBinding,
    HostListener,
    Optional,
    Inject,
    ElementRef,
    InjectionToken
} from '@angular/core';
import { ThySelectCustomComponent } from './select-custom.component';

export interface IThySelectOptionParentComponent {
    // 选择，取消选择 option
    toggleOption(option: ThyOptionComponent, event?: Event): void;
    isSelected(option: ThyOptionComponent): boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const THY_SELECT_OPTION_PARENT_COMPONENT = new InjectionToken<IThySelectOptionParentComponent>(
    'THY_SELECT_OPTION_PARENT_COMPONENT'
);

@Component({
    selector: 'thy-option',
    templateUrl: './option.component.html'
})
export class ThyOptionComponent {
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

    @HostBinding(`class.active`)
    get selected() {
        return this.parent.isSelected(this);
    }

    constructor(
        public element: ElementRef<HTMLElement>,
        @Optional() @Inject(THY_SELECT_OPTION_PARENT_COMPONENT) public parent: IThySelectOptionParentComponent
    ) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        this.parent.toggleOption(this, event);
    }
}
