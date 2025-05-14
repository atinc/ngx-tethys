import {
  Component,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterContentChecked,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
  inject,
  DestroyRef,
  input,
  computed,
  effect,
  contentChild,
  signal
} from '@angular/core';
import { ThyTranslate, useHostFocusControl } from 'ngx-tethys/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { ThyInputDirective } from './input.directive';
import { NgTemplateOutlet } from '@angular/common';
import { throttleTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { FocusOrigin } from '@angular/cdk/a11y';
import { MutationObserverFactory } from '@angular/cdk/observers';

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
        '[class.form-control]': 'prefixTemplate() || suffixTemplate()',
        '[class.thy-input-group-with-prefix]': 'prefixTemplate()',
        '[class.thy-input-group-with-suffix]': 'suffixTemplate()',
        '[class.thy-input-group-with-textarea-suffix]': 'isTextareaSuffix()',
        '[class.thy-input-group-with-scroll-bar]': 'isTextareaSuffix() && hasScrollbar()',
        '[class.disabled]': 'disabled()'
    },
    imports: [NgTemplateOutlet]
})
export class ThyInputGroup implements OnInit, OnDestroy {
    private thyTranslate = inject(ThyTranslate);
    private ngZone = inject(NgZone);

    private hostRenderer = useHostRenderer();

    private hostFocusControl = useHostFocusControl();

    private readonly destroyRef = inject(DestroyRef);

    public isTextareaSuffix = signal(false);

    public hasScrollbar = signal(false);

    disabled = signal(false);

    /**
     * 输入框上添加的后置文本
     */
    readonly thyAppendText = input<string>();

    /**
     * 输入框上添加的后置文本多语言 Key
     */
    readonly thyAppendTextTranslateKey = input<string>();

    /**
     * 输入框上添加的前置文本
     */
    readonly thyPrependText = input<string>();

    /**
     * 输入框上添加的前置文本多语言 Key
     */
    readonly thyPrependTextTranslateKey = input<string>();

    prependText = computed(() => {
        const prependTextTranslateKey = this.thyPrependTextTranslateKey();
        if (prependTextTranslateKey) {
            return this.thyTranslate.instant(prependTextTranslateKey)
        }
        return this.thyPrependText();
    })

    appendText = computed(() => {
        const appendTextTranslateKey = this.thyAppendTextTranslateKey();
        if (appendTextTranslateKey) {
            return this.thyTranslate.instant(appendTextTranslateKey)
        }
        return this.thyAppendText();
    })

    /**
     * 输入框分组大小
     * @type 'sm' | 'lg' | 'md' | ''
     * @default ''
     */
    readonly thySize = input<InputGroupSize>();

    /**
     * 后置模板
     */
    readonly appendTemplate = contentChild<TemplateRef<unknown>>('append');

    /**
     * 前置模板
     */
    readonly prependTemplate = contentChild<TemplateRef<unknown>>('prepend');

    /**
     * 前缀
     */
    readonly prefixTemplate = contentChild<TemplateRef<unknown>>('prefix');

    /**
     * 后缀
     */
    readonly suffixTemplate = contentChild<TemplateRef<unknown>>('suffix');

    /**
     * @private
     */
    readonly inputDirective = contentChild(ThyInputDirective);

    private disabledObservable: MutationObserver;

    constructor() {
        effect(() => {
            const size = this.thySize();
            if (size && inputGroupSizeMap[size]) {
                this.hostRenderer.updateClass(inputGroupSizeMap[size]);
            } else {
                this.hostRenderer.updateClass([]);
            }
        });

        effect(() => {
            const inputDirective= this.inputDirective();
            if (inputDirective?.nativeElement) {
                this.isTextareaSuffix.set(inputDirective?.nativeElement?.tagName === 'TEXTAREA');
                if (this.isTextareaSuffix()) {
                    this.determineHasScrollbar();
                }
            }
            
        });

        effect(() => {
            const inputDirective = this.inputDirective();
            this.disabledObservable?.disconnect();
            if (inputDirective?.nativeElement) {
                this.disabledObservable = new MutationObserverFactory().create(mutations => {
                    for (const mutation of mutations) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                            this.disabled.set(!!inputDirective.nativeElement.hasAttribute('disabled'))
                        }
                    }
                });
                if (this.disabledObservable) {
                    this.disabledObservable.observe(inputDirective.nativeElement, {
                        attributes: true,
                        attributeFilter: ['disabled']
                    });
                }
            }
        });
    }

    ngOnInit() {
        this.hostFocusControl.focusChanged = (origin: FocusOrigin) => {
            if (origin) {
                this.hostRenderer.addClass('form-control-active');
            } else {
                this.hostRenderer.removeClass('form-control-active');
            }
        };
    }

    private determineHasScrollbar() {
        this.ngZone.runOutsideAngular(() => {
            this.resizeObserver(this.inputDirective().nativeElement)
                .pipe(throttleTime(100), takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    const hasScrollbar = this.inputDirective().nativeElement.scrollHeight > this.inputDirective().nativeElement.clientHeight;
                    if (this.hasScrollbar() !== hasScrollbar) {
                        this.ngZone.run(() => {
                            this.hasScrollbar.set(hasScrollbar);
                        });
                    }
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

    ngOnDestroy() {
        this.hostFocusControl.destroy();
    }
}
