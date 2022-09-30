import { Injectable, inject, ElementRef } from '@angular/core';
import { AbstractElementRenderer } from './abstract-element-renderer';

@Injectable()
export class HostRenderer extends AbstractElementRenderer {
    private elementRef = inject(ElementRef);

    protected get element() {
        return this.elementRef.nativeElement;
    }
}

export function useHostRenderer() {
    return new HostRenderer();
}
