import {
    Component,
    HostBinding,
    Input,
    ContentChild,
    TemplateRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    AfterContentChecked,
    OnInit,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { MixinBase, ThyTranslate, mixinUnsubscribe } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyInputDirective } from './input.directive';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs/operators';

export type InputGroupSize = 'sm' | 'lg' | 'md' | '';

const inputGroupSizeMap = {
    sm: ['input-group-sm'],
    lg: ['input-group-lg'],
    md: ['input-group-md']
};

/**
 * 输入框分组
 * @name thy-input-group
 * @order 20
 */
@Component({
    selector: 'thy-input-group',
    templateUrl: './input-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-input-group',
        '[class.form-control]': 'prefixTemplate || suffixTemplate',
        '[class.thy-input-group-with-prefix]': 'prefixTemplate',
        '[class.thy-input-group-with-suffix]': 'suffixTemplate',
        '[class.thy-input-group-with-textarea-suffix]': 'isTextareaSuffix'
    },
    standalone: true,
    imports: [NgIf, NgTemplateOutlet]
})
export class ThyInputGroupComponent extends mixinUnsubscribe(MixinBase) implements OnInit, AfterContentChecked, OnDestroy {
    private hostRenderer = useHostRenderer();

    public appendText: string;

    public prependText: string;

    public isTextareaSuffix: boolean;

    @HostBinding('class.disabled') disabled = false;

    /**
     * 输入框上添加的后置文本
     */
    @Input()
    set thyAppendText(value: string) {
        this.appendText = value;
    }

    /**
     * 输入框上添加的后置文本多语言 Key
     */
    @Input()
    set thyAppendTextTranslateKey(value: string) {
        if (value) {
            this.appendText = this.thyTranslate.instant(value);
        }
    }

    /**
     * 输入框上添加的前置文本
     */
    @Input()
    set thyPrependText(value: string) {
        this.prependText = value;
    }

    /**
     * 输入框上添加的前置文本多语言 Key
     */
    @Input()
    set thyPrependTextTranslateKey(value: string) {
        if (value) {
            this.prependText = this.thyTranslate.instant(value);
        }
    }

    /**
     * 输入框分组大小
     * @type 'sm' | 'lg' | 'md' | ''
     * @default ''
     */
    @Input()
    set thySize(size: InputGroupSize) {
        if (size && inputGroupSizeMap[size]) {
            this.hostRenderer.updateClass(inputGroupSizeMap[size]);
        } else {
            this.hostRenderer.updateClass([]);
        }
    }

    /**
     * 后置模板
     */
    @ContentChild('append') appendTemplate: TemplateRef<unknown>;

    /**
     * 前置模板
     */
    @ContentChild('prepend') prependTemplate: TemplateRef<unknown>;

    /**
     * 前缀
     */
    @ContentChild('prefix') prefixTemplate: TemplateRef<unknown>;

    /**
     * 后缀
     */
    @ContentChild('suffix') suffixTemplate: TemplateRef<unknown>;

    /**
     * @private
     */
    @ContentChild(ThyInputDirective) inputDirective: ThyInputDirective;

    constructor(private thyTranslate: ThyTranslate, private elementRef: ElementRef, private focusMonitor: FocusMonitor) {
        super();
    }

    ngOnInit() {
        this.focusMonitor
            .monitor(this.elementRef.nativeElement, true)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(origin => {
                if (origin) {
                    this.hostRenderer.addClass('form-control-active');
                } else {
                    this.hostRenderer.removeClass('form-control-active');
                }
            });
    }

    ngAfterContentChecked(): void {
        this.disabled = !!this.inputDirective?.nativeElement?.hasAttribute('disabled');
        this.isTextareaSuffix = this.inputDirective?.nativeElement?.tagName === 'TEXTAREA';
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    }
}
