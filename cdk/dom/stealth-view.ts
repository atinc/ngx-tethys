import { ApplicationRef, DestroyRef, Directive, EmbeddedViewRef, inject, Injector, isSignal, Signal, TemplateRef } from "@angular/core";

export interface StealthViewBehavior {
    getNodes(): Node[];
}

export function stealthViewBehavior(templateRefInput: Signal<TemplateRef<any>> | TemplateRef<any>): StealthViewBehavior {
    const injector = inject(Injector);
    const applicationRef = inject(ApplicationRef);
    const destroyRef = inject(DestroyRef);

    let embeddedViewRef: EmbeddedViewRef<any>;

    destroyRef.onDestroy(() => {
        if (embeddedViewRef) {
            embeddedViewRef.destroy();
            applicationRef.detachView(embeddedViewRef);
        }
    });
    return {
        getNodes() {
            if (!embeddedViewRef) {
                const templateRef = isSignal(templateRefInput) ? templateRefInput() : templateRefInput;
                embeddedViewRef = templateRef.createEmbeddedView({}, injector);
                applicationRef.attachView(embeddedViewRef);
            }
            return embeddedViewRef.rootNodes;
        }
    };
}