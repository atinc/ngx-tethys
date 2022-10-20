import { Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { isTemplateRef } from 'ngx-tethys/util';

export class ThyStringOrTemplateOutletContext {
    public $implicit: any;
}

@Directive({
    selector: '[thyStringOrTemplateOutlet]',
    exportAs: 'thyStringOrTemplateOutlet'
})
export class ThyStringOrTemplateOutletDirective<_T = unknown> implements OnChanges {
    private embeddedViewRef: EmbeddedViewRef<any>;

    private context = new ThyStringOrTemplateOutletContext();

    private _thyStringOrTemplateOutlet: any | TemplateRef<any>;

    private isTemplateRef: boolean;

    @Input() thyStringOrTemplateOutletContext: any;

    @Input()
    set thyStringOrTemplateOutlet(value: any | TemplateRef<any>) {
        this._thyStringOrTemplateOutlet = value;
        this.isTemplateRef = isTemplateRef(value);
    }

    get thyStringOrTemplateOutlet() {
        return this._thyStringOrTemplateOutlet;
    }

    // 为指令的 context 指定类型
    static ngTemplateContextGuard<T>(_dir: ThyStringOrTemplateOutletDirective<T>, _ctx: any): _ctx is ThyStringOrTemplateOutletContext {
        return true;
    }

    private recreateView(): void {
        this.viewContainer.clear();
        const templateRef = (this.isTemplateRef ? this.thyStringOrTemplateOutlet : this.templateRef) as any;
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(
            templateRef,
            this.isTemplateRef ? this.thyStringOrTemplateOutletContext : this.context
        );
    }

    private updateContext(): void {
        const newCtx = this.isTemplateRef ? this.thyStringOrTemplateOutletContext : this.context;
        const oldCtx = this.embeddedViewRef!.context as any;
        if (newCtx) {
            for (const propName of Object.keys(newCtx)) {
                oldCtx[propName] = newCtx[propName];
            }
        }
    }

    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyStringOrTemplateOutletContext, thyStringOrTemplateOutlet } = changes;
        const shouldRecreateView = (): boolean => {
            let shouldOutletRecreate = false;
            if (thyStringOrTemplateOutlet) {
                if (thyStringOrTemplateOutlet.firstChange) {
                    shouldOutletRecreate = true;
                } else {
                    const isPreviousOutletTemplate = thyStringOrTemplateOutlet.previousValue instanceof TemplateRef;
                    const isCurrentOutletTemplate = thyStringOrTemplateOutlet.currentValue instanceof TemplateRef;
                    shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
                }
            }
            const hasContextChanged = (ctxChange: SimpleChange): boolean => {
                const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
                const currCtxKeys = Object.keys(ctxChange.currentValue || {});
                if (prevCtxKeys.length === currCtxKeys.length) {
                    for (const propName of currCtxKeys) {
                        if (prevCtxKeys.indexOf(propName) === -1) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return true;
                }
            };
            const shouldContextRecreate = thyStringOrTemplateOutletContext && hasContextChanged(thyStringOrTemplateOutletContext);
            return shouldContextRecreate || shouldOutletRecreate;
        };

        if (thyStringOrTemplateOutlet) {
            this.context.$implicit = thyStringOrTemplateOutlet.currentValue;
        }
        const recreateView = shouldRecreateView();
        if (recreateView) {
            this.recreateView();
        } else {
            this.updateContext();
        }
    }
}
