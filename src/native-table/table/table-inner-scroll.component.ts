import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    inject,
    input,
    NgZone,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';

import { ThyNativeTableContentComponent } from './table-content.component';
import { fromEvent, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'thy-native-table-inner-scroll',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        @if (scrollY()) {
            <div #tableHeaderElement class="thy-native-table-header">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [theadTemplate]="theadTemplate()"></table>
            </div>
            <div #tableBodyElement class="thy-native-table-body" [style.max-height]="scrollY()">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [contentTemplate]="contentTemplate()"></table>
            </div>
            <div #tableFootElement class="thy-native-table-summary">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [tfootTemplate]="tfootTemplate()"></table>
            </div>
        } @else {
            <div #tableBodyElement class="thy-native-table-content" [style.overflow-x]="scrollX() ? 'auto' : null">
                <table
                    thy-native-table-content
                    [tableLayout]="'fixed'"
                    [scrollX]="scrollX()"
                    [listOfColWidth]="listOfColWidth()"
                    [theadTemplate]="theadTemplate()"
                    [contentTemplate]="contentTemplate()"
                    [tfootTemplate]="tfootTemplate()"></table>
            </div>
        }
    `,
    host: { class: 'thy-native-table-container' },
    imports: [ThyNativeTableContentComponent]
})
export class ThyNativeTableInnerScrollComponent<T = SafeAny> {
    readonly data = input<readonly T[]>([]);
    readonly scrollX = input<string | null>(null);
    readonly scrollY = input<string | null>(null);
    readonly contentTemplate = input<TemplateRef<SafeAny> | null>(null);
    readonly widthConfig = input<string[]>([]);
    readonly listOfColWidth = input<ReadonlyArray<string | null>>([]);
    readonly theadTemplate = input<TemplateRef<SafeAny> | null>(null);
    readonly tfootTemplate = input<TemplateRef<SafeAny> | null>(null);

    private renderer = inject(Renderer2);
    private ngZone = inject(NgZone);
    private destroyRef = inject(DestroyRef);

    @ViewChild('tableBodyElement', { read: ElementRef }) tableBodyElement!: ElementRef;

    ngAfterViewInit(): void {
        if (this.tableBodyElement) {
            this.ngZone.runOutsideAngular(() => {
                fromEvent(this.tableBodyElement.nativeElement, 'scroll', { passive: true })
                    .pipe(startWith(true), takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {
                        this.ngZone.run(() => {
                            this.setScrollPositionClassName();
                        });
                    });
            });
        }
    }
    private setScrollPositionClassName(clear: boolean = false): void {
        const { scrollWidth, scrollLeft, clientWidth } = this.tableBodyElement.nativeElement;
        const leftClassName = 'thy-native-table-scroll-left';
        const rightClassName = 'thy-native-table-scroll-right';
        if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
            this.renderer.removeClass(this.tableBodyElement.nativeElement, leftClassName);
            this.renderer.removeClass(this.tableBodyElement.nativeElement, rightClassName);
        } else if (scrollLeft === 0) {
            this.renderer.removeClass(this.tableBodyElement.nativeElement, leftClassName);
            this.renderer.addClass(this.tableBodyElement.nativeElement, rightClassName);
        } else if (scrollWidth === scrollLeft + clientWidth) {
            this.renderer.removeClass(this.tableBodyElement.nativeElement, rightClassName);
            this.renderer.addClass(this.tableBodyElement.nativeElement, leftClassName);
        } else {
            this.renderer.addClass(this.tableBodyElement.nativeElement, leftClassName);
            this.renderer.addClass(this.tableBodyElement.nativeElement, rightClassName);
        }
    }
}
