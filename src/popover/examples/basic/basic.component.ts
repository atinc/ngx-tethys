import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { ThyPlacement, ThyPopover } from 'ngx-tethys';
import { ThyPopoverBasicContentComponent } from './popover-content.component';

@Component({
    selector: 'thy-popover-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyPopoverBasicExampleComponent implements OnInit {
    placement: ThyPlacement = 'bottom';

    trigger = 'click';

    hasBackdrop = true;

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit(): void {}

    openPopover(element: { elementRef: ElementRef }) {
        this.thyPopover.open(ThyPopoverBasicContentComponent, {
            origin: element.elementRef,
            placement: this.placement,
            hasBackdrop: this.hasBackdrop,
            panelClass: 'demo-popover',
            insideClosable: true
        });
    }

    openPopoverOutsideClosable(element: { elementRef: ElementRef }) {
        this.thyPopover.open(ThyPopoverBasicContentComponent, {
            origin: element.elementRef,
            placement: this.placement,
            hasBackdrop: false,
            panelClass: 'demo-popover',
            insideClosable: true,
            outsideClosable: true
        });
    }

    openTemplatePopover(element: { elementRef: ElementRef }, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: element.elementRef,
            hasBackdrop: this.hasBackdrop,
            placement: this.placement,
            panelClass: 'demo-popover'
        });
    }

    openTemplatePopoverWidth(element: { elementRef: ElementRef }, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: element.elementRef,
            hasBackdrop: this.hasBackdrop,
            placement: this.placement,
            panelClass: 'demo-popover',
            width: '1000px'
        });
    }

    openTemplatePopoverManualClosure(element: { elementRef: ElementRef }, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: element.elementRef,
            manualClosure: true,
            hasBackdrop: this.hasBackdrop,
            placement: this.placement,
            panelClass: 'demo-popover'
        });
    }

    openTemplatePopoverIconNav(event: Event, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: event.currentTarget as HTMLElement,
            manualClosure: true,
            hasBackdrop: this.hasBackdrop,
            placement: this.placement,
            panelClass: 'demo-popover',
            originActiveClass: 'active'
        });
    }
}
