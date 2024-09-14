import { ApplicationRef, DestroyRef, Directive, EmbeddedViewRef, inject, Injector, isSignal, Signal, TemplateRef } from '@angular/core';

export interface StealthViewRenderer {
    rootNodes: Node[];
}

export function useStealthViewRenderer(templateRefInput: Signal<TemplateRef<any>> | TemplateRef<any>): StealthViewRenderer {
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

    if (!embeddedViewRef) {
        const templateRef = isSignal(templateRefInput) ? templateRefInput() : templateRefInput;
        embeddedViewRef = templateRef.createEmbeddedView({}, injector);
        applicationRef.attachView(embeddedViewRef);
    }
    const rootNodes = embeddedViewRef.rootNodes;
    return { rootNodes };
}
