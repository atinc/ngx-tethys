import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject,
    DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, merge, of } from 'rxjs';
import { delay, map, mergeMap, startWith, switchMap } from 'rxjs/operators';

import { ThyNativeTableStyleService } from '../../services/table-style.service';
import { ThyNativeTableTrDirective } from '../row/tr.directive';

@Component({
    selector: 'thead:not(.thy-native-table-thead)',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-template #contentTemplate>
            <ng-content></ng-content>
        </ng-template>
        @if (!isInsideNativeTable) {
            <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
        }
    `,
    imports: [NgTemplateOutlet]
})
export class ThyNativeTableHeaderComponent<T> implements AfterContentInit, AfterViewInit, OnInit {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });
    private destroyRef = inject(DestroyRef);
    private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
    private renderer = inject(Renderer2);

    isInsideNativeTable = !!this.styleService;

    @ViewChild('contentTemplate', { static: true }) templateRef!: TemplateRef<any>;
    @ContentChildren(ThyNativeTableTrDirective, { descendants: true }) listOfTrDirective!: QueryList<ThyNativeTableTrDirective>;

    @Output() readonly thySortOrderChange = new EventEmitter<{ key: any; value: string | null }>();

    ngOnInit(): void {
        if (this.styleService) {
            this.styleService.setTheadTemplate(this.templateRef);
        }
    }

    ngAfterContentInit(): void {
        if (this.styleService) {
            const firstTableRow$ = this.listOfTrDirective.changes.pipe(
                startWith(this.listOfTrDirective),
                map(item => item && item.first),
                takeUntilDestroyed(this.destroyRef)
            ) as Observable<ThyNativeTableTrDirective>;

            const listOfColumnsChanges$ = firstTableRow$.pipe(
                switchMap(firstTableRow => {
                    if (firstTableRow) {
                        return firstTableRow.listOfColumnsChanges$;
                    }
                    return EMPTY;
                })
            );

            listOfColumnsChanges$.subscribe(data => {
                this.styleService!.setListOfTh(data);
            });

            this.styleService.enableAutoMeasure$
                .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : of([]))))
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(data => {
                    this.styleService!.setListOfMeasureColumn(data);
                });
        }
    }

    ngAfterViewInit(): void {
        if (this.styleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
        }
    }
}
