import {
    Component,
    TemplateRef,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    ChangeDetectorRef,
    ElementRef,
    inject,
    Signal,
    viewChild,
    input,
    output,
    viewChildren,
    signal,
    DestroyRef,
    afterRenderEffect
} from '@angular/core';
import { ThyOption, ThyOptionRender, ThyOptionSelectionChangeEvent, ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ThyEmpty } from 'ngx-tethys/empty';
import { NgClass } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { injectLocale, ThyAutoCompleteLocale } from 'ngx-tethys/i18n';
import { injectPanelEmptyIcon } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Event object that is emitted when an autocomplete option is activated. */
export interface ThyAutocompleteActivatedEvent {
    /** Reference to the autocomplete panel that emitted the event. */
    source: ThyAutocomplete;

    /** Option that was selected. */
    option: ThyOption | null;
}

/**
 * 自动完成组件
 * @name thy-autocomplete
 */
@Component({
    selector: 'thy-autocomplete',
    templateUrl: 'autocomplete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyStopPropagationDirective, NgClass, ThyEmpty, ThyOptionRender]
})
export class ThyAutocomplete {
    private changeDetectorRef = inject(ChangeDetectorRef);

    private destroyRef = inject(DestroyRef);

    private locale: Signal<ThyAutoCompleteLocale> = injectLocale('autocomplete');

    emptyIcon: Signal<string> = injectPanelEmptyIcon();

    dropDownClass: { [key: string]: boolean } = {
        'thy-select-dropdown': true,
        'thy-select-dropdown-single': true
    };

    isOpened = false;

    readonly selectedValues = signal<SafeAny[]>([]);

    /** Manages active item in option list based on key events. */
    keyManager: ActiveDescendantKeyManager<ThyOptionRender>;

    readonly contentTemplateRef = viewChild<TemplateRef<any>>('contentTemplate');

    // scroll element container
    readonly optionsContainer = viewChild<ElementRef<any>>('panel');

    /**
     * @private
     */
    @ContentChildren(ThyOption, { descendants: true }) options: QueryList<ThyOption>;

    readonly optionRenders = viewChildren(ThyOptionRender);

    /**
     * 空选项时的文本
     * @default 没有任何数据
     */
    readonly thyEmptyText = input<string>(this.locale().empty);

    /**
     * 是否默认高亮第一个选项
     */
    readonly thyAutoActiveFirstOption = input(false, { transform: coerceBooleanProperty });

    /**
     * 被选中时调用，参数包含选中项的 value 值
     */
    readonly thyOptionSelected = output<ThyOptionSelectionChangeEvent>();

    /**
     * 只读，展开下拉菜单的回调
     */
    readonly thyOpened = output<void>();

    /**
     * 只读，关闭下拉菜单的回调
     */
    readonly thyClosed = output<void>();

    /** Emits whenever an option is activated using the keyboard. */
    /**
     * 只读，option 激活状态变化时，调用此函数
     */
    readonly thyOptionActivated = output<ThyAutocompleteActivatedEvent>();

    constructor() {
        afterRenderEffect(() => {
            this.initKeyManager();
        });
    }

    initKeyManager() {
        const optionRenders = this.optionRenders();
        this.keyManager = new ActiveDescendantKeyManager<ThyOptionRender>(optionRenders).withWrap();
        this.keyManager.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(index => {
            this.thyOptionActivated.emit({ source: this, option: this.options.toArray()[index] || null });
        });
    }

    open() {
        this.isOpened = true;
        this.changeDetectorRef.markForCheck();
        this.thyOpened.emit();
    }

    close() {
        this.isOpened = false;
        this.thyClosed.emit();
    }

    optionClick(event: { value: SafeAny; isUserInput?: boolean }) {
        const { value, isUserInput } = event;
        const option = this.options.toArray().find(option => option.thyValue() === value);
        if (option) {
            option.selectionChange.emit({ option, isUserInput });
        }

        this.selectedValues.set([value]);
        this.thyOptionSelected.emit(new ThyOptionSelectionChangeEvent(option, false));
    }
}
