import {
    Component,
    Input,
    HostBinding,
    ElementRef,
    ChangeDetectorRef,
    Inject,
    forwardRef,
    InjectionToken,
    HostListener,
    Optional,
    OnInit
} from '@angular/core';
import { FocusableOption, FocusOrigin, Highlightable } from '@angular/cdk/a11y';
// import { SelectionModel } from '@angular/cdk/collections';
import { coerceBooleanProperty } from '../../../util/helpers';
import { UpdateHostClassService } from '../../../shared';
import { THY_OPTION_PARENT_COMPONENT } from '../option.token';

let _uniqueIdCounter = 0;

export type ThyListLayout = 'list' | 'grid';

export interface IThyOptionParentComponent {
    multiple?: boolean;
    layout?: ThyListLayout;
    // selectionModel: SelectionModel<ThyListOptionComponent>;
    // 选择，取消选择 option
    toggleOption(option: ThyListOptionComponent, event?: Event): void;
    // 设置当前选项为激活状态，即 hover 状态
    setActiveOption(option: ThyListOptionComponent, event?: Event): void;
    // 滚动到当前的选项
    scrollIntoView(option: ThyListOptionComponent): void;
    isSelected(option: ThyListOptionComponent): boolean;
}

@Component({
    selector: 'thy-list-option,[thy-list-option]',

    templateUrl: './list-option.component.html'
})
export class ThyListOptionComponent implements Highlightable {
    @HostBinding(`class.thy-list-option`)
    get _isListOption() {
        return this.parentSelectionList.layout === 'list';
    }

    @HostBinding(`class.thy-grid-option`)
    get _parentLayout() {
        return this.parentSelectionList.layout === 'grid';
    }

    @HostBinding(`attr.role`) _role = 'option';

    @HostBinding(`attr.tabindex`) _tabIndex = -1;

    @Input() id = `thy-list-option-${_uniqueIdCounter++}`;

    @Input() thyValue: any;

    @Input()
    set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    @HostBinding(`class.disabled`) disabled?: boolean;

    /** Whether the option is selected. */
    @HostBinding(`class.active`)
    get selected() {
        return this.parentSelectionList.isSelected(this);
    }

    constructor(
        public element: ElementRef<HTMLElement>,
        private changeDetector: ChangeDetectorRef,
        /** @docs-private */
        @Optional() @Inject(THY_OPTION_PARENT_COMPONENT) public parentSelectionList: IThyOptionParentComponent
    ) {}

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.parentSelectionList.multiple || !this.parentSelectionList.isSelected(this)) {
            this.parentSelectionList.toggleOption(this, event);
            this.parentSelectionList.setActiveOption(this);
        }
    }

    // @HostListener('focus', ['$event'])
    // onFocus(event: Event) {
    //     this.parentSelectionList.setFocusedOption(this, event);
    // }

    /** Allows for programmatic focusing of the option. */
    // focus(origin?: FocusOrigin): void {
    //     this.element.nativeElement.focus();
    // }

    setActiveStyles(): void {
        this.element.nativeElement.classList.add('hover');
        this.parentSelectionList.scrollIntoView(this);
    }

    setInactiveStyles(): void {
        this.element.nativeElement.classList.remove('hover');
    }

    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    getLabel() {
        return '';
    }
}
