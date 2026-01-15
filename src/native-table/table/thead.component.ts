import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    inject,
    effect,
    contentChildren,
    computed
} from '@angular/core';

import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyNativeTableTrDirective } from '../row/tr.directive';

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
export class ThyNativeTableHeaderComponent implements AfterViewInit, OnInit {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });
    private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
    private renderer = inject(Renderer2);

    public isInsideNativeTable = !!this.styleService;

    @ViewChild('contentTemplate', { static: true }) templateRef!: TemplateRef<any>;

    readonly listOfTrDirective = contentChildren<ThyNativeTableTrDirective>(ThyNativeTableTrDirective);

    listOfThColumns = computed(() => {
        const rows = this.listOfTrDirective();
        const firstRow = rows[0];
        return firstRow && firstRow.listOfThColumnsChanges();
    });

    listOfThFixedColumns = computed(() => {
        const rows = this.listOfTrDirective();
        const firstRow = rows[0];
        return firstRow && firstRow.listOfThFixedColumnsChanges();
    });

    ngOnInit(): void {
        if (this.styleService) {
            this.styleService.setTheadTemplate(this.templateRef);
        }
    }
    constructor() {
        effect(() => {
            const listOfHeaderColumns = this.listOfThColumns();
            if (this.styleService) {
                this.styleService.setListOfTh(listOfHeaderColumns);
            }
        });

        effect(() => {
            const enableAutoMeasureColumnWidth = this.styleService?.enableAutoMeasureColumnWidth();
            if (enableAutoMeasureColumnWidth && this.listOfThColumns().length > 0) {
                this.styleService?.setListOfMeasureColumnKeys(this.listOfThColumns());
            } else {
                this.styleService?.setListOfMeasureColumnKeys([]);
            }
        });

        effect(() => {
            const headerColumns = this.listOfThColumns();
            const listOfHeaderFixedColumns = this.listOfThFixedColumns();
            if (headerColumns.length > 0 && listOfHeaderFixedColumns.length > 0 && this.styleService) {
                this.styleService.setListOfFixedInfo(headerColumns, listOfHeaderFixedColumns);
            }
        });
    }

    ngAfterViewInit(): void {
        if (this.styleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
        }
    }
}
