import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { StepInfo } from './guider.class';

@Injectable()
export class GuiderDrawHintService {
    private refMap: { [key: string]: ComponentRef<any> } = {};

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    draw(step: StepInfo, hintComponent: Type<unknown>) {
        // 1. Create a component reference from the component
        const ref: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(hintComponent).create(this.injector);

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(ref.hostView);

        // 3. Get DOM element from component
        const domElem = (ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.body.appendChild(domElem);

        const instance: any = ref.instance;
        instance.stepHintData = step.data;
        ref.changeDetectorRef.detectChanges();
        // step.stepInstance = instance;

        this.refMap[step.key] = ref;
    }

    remove(step: StepInfo) {
        this.appRef.detachView(this.refMap[step.key].hostView);
        this.refMap[step.key].destroy();
    }
}
