/* eslint-disable @angular-eslint/no-inputs-metadata-property */
/* eslint-disable @angular-eslint/directive-class-suffix */
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, EmbeddedViewRef } from '@angular/core';

@Directive({
    selector: '[thyPortalOutlet]',
    exportAs: 'thyPortalOutlet',
    standalone: true,
    inputs: ['portal: thyPortalOutlet']
})
export class ThyPortalOutlet extends CdkPortalOutlet {
    /**
     * Attach the given ComponentPortal to this PortalOutlet using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal outlet.
     * @returns Reference to the created component.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        portal.setAttachedHost(this);

        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalOutlet.
        const viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this['_viewContainerRef'];

        const ref = viewContainerRef.createComponent(portal.component, {
            index: viewContainerRef.length,
            injector: portal.injector || viewContainerRef.injector,
            projectableNodes: portal.projectableNodes || undefined
        });

        // If we're using a view container that's different from the injected one (e.g. when the portal
        // specifies its own) we need to move the component into the outlet, otherwise it'll be rendered
        // inside of the alternate view container.
        if (viewContainerRef !== this['_viewContainerRef']) {
            this['_getRootNode']().appendChild((ref.hostView as EmbeddedViewRef<any>).rootNodes[0]);
        }

        super.setDisposeFn(() => ref.destroy());
        this._attachedPortal = portal;
        this['_attachedRef'] = ref;
        this.attached.emit(ref);

        return ref;
    }
}
