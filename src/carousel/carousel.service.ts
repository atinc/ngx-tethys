import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DistanceVector } from './typings';

@Injectable({
    providedIn: 'root'
})
export class CarouselService {
    private currentDragging$: Subject<MouseEvent | Touch> | null = null;
    private handleRegistry = new Set();
    private renderer: Renderer2;

    constructor(private rendererFactory2: RendererFactory2) {
        this.renderer = rendererFactory2.createRenderer(null, null);
    }

    registerDrag(event: MouseEvent | TouchEvent): Observable<DistanceVector> {
        if (!this.handleRegistry.size) {
            this.registerHandler(event);
        }

        if (this.currentDragging$) {
            this.currentDragging$.complete();
        }

        const startPoint = this.getEventPotions(event);

        this.currentDragging$ = new Subject<MouseEvent | Touch>();

        return this.currentDragging$.pipe(
            map(e => {
                return {
                    x: e.pageX - startPoint!.pageX,
                    y: e.pageY - startPoint!.pageY
                };
            })
        );
    }

    registerHandler(event: MouseEvent | TouchEvent) {
        if (event instanceof TouchEvent) {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchmove', (e: TouchEvent) => {
                    if (this.currentDragging$) {
                        this.currentDragging$.next(e.touches[0] || e.changedTouches[0]);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'touchend', () => {
                    if (this.currentDragging$) {
                        this.currentDragging$.complete();
                    }
                })
            });
        } else {
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mousemove', e => {
                    if (this.currentDragging$) {
                        this.currentDragging$.next(e);
                    }
                })
            });
            this.handleRegistry.add({
                teardown: this.renderer.listen('document', 'mouseup', () => {
                    if (this.currentDragging$) {
                        this.currentDragging$.complete();
                    }
                })
            });
        }
    }

    getEventPotions(event: MouseEvent | TouchEvent): MouseEvent | Touch {
        if (event instanceof MouseEvent) {
            return event;
        } else {
            return event.touches[0] || event.changedTouches[0];
        }
    }
}
