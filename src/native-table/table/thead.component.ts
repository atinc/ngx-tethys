import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    OnInit,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    inject,
    DestroyRef,
    signal,
    effect
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';

import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyNativeTableTrDirective } from '../row/tr.directive';
import { ThyNativeTableThDirective } from '../cell/th.directive';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'thead:not(.thy-native-table-thead)',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ThyNativeTableHeaderComponent implements AfterContentInit, AfterViewInit, OnInit {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });
    private destroyRef = inject(DestroyRef);
    private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
    private renderer = inject(Renderer2);

    public isInsideNativeTable = !!this.styleService;

    @ViewChild('contentTemplate', { static: true }) templateRef!: TemplateRef<any>;

    @ContentChildren(ThyNativeTableTrDirective, { descendants: true }) listOfTrDirective!: QueryList<ThyNativeTableTrDirective>;

    listOfColumnsChanges = signal<ThyNativeTableThDirective[]>([]);

    ngOnInit(): void {
        if (this.styleService) {
            this.styleService.setTheadTemplate(this.templateRef);
        }
    }

    constructor() {
        effect(() => {
            const listOfColumns = this.listOfColumnsChanges();
            if (this.styleService) {
                this.styleService.setListOfTh(listOfColumns);
            }
        });

        effect(() => {
            const enableAutoMeasureColumnWidth = this.styleService?.enableAutoMeasureColumnWidth();
            if (enableAutoMeasureColumnWidth && this.listOfColumnsChanges().length > 0) {
                this.styleService?.setListOfMeasureColumnKeys(this.listOfColumnsChanges());
            } else {
                this.styleService?.setListOfMeasureColumnKeys([]);
            }
        });
    }

    ngAfterContentInit(): void {
        if (this.styleService) {
            this.listOfTrDirective.changes
                .pipe(
                    startWith(this.listOfTrDirective),
                    map(item => item && item.first),
                    takeUntilDestroyed(this.destroyRef)
                )
                .subscribe(headerRow => {
                    if (headerRow) {
                        this.listOfColumnsChanges.set(headerRow.listOfColumnsChanges());
                    }
                });
        }
    }

    ngAfterViewInit(): void {
        if (this.styleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
        }
    }
}
