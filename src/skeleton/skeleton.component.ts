import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'thy-skeleton',
    template: `
        <ng-container *ngIf="uiLoading">
            <div class="el-skeleton">
                <ng-container *ngIf="thyCustomTemplate; else thyDefaultTemplate">
                    <div *ngFor="let i of [1, 2, 3]">
                        <ng-template *ngTemplateOutlet="thyCustomTemplate"></ng-template>
                    </div>
                </ng-container>
                <ng-template #thyDefaultTemplate>
                    <div *ngIf="type === 'avatar'">
                        <thy-skeleton-item shape="circle" [size]="size" [styleClass]="styleClass"></thy-skeleton-item>
                    </div>

                    <div *ngIf="type === 'list'" class="mb-2">
                        <ng-container *ngFor="let item of rowsCount">
                            <thy-skeleton-item width="100%" styleClass="mb-2" [height]="listHeight"></thy-skeleton-item>
                        </ng-container>
                    </div>

                    <div *ngIf="type === 'paragraph'" class="mb-2">
                        <thy-skeleton-item [width]="firstWidth" styleClass="mb-2"></thy-skeleton-item>
                        <ng-container *ngFor="let item of rowsCount">
                            <thy-skeleton-item width="100%" styleClass="mb-2"></thy-skeleton-item>
                        </ng-container>
                        <thy-skeleton-item [width]="lastWidth" styleClass="mb-2"></thy-skeleton-item>
                    </div>

                    <div *ngIf="type === 'bulletList'" class="mb-2">
                        <thy-list>
                            <thy-list-item class="d-flex" *ngFor="let item of rowsCount">
                                <thy-skeleton-item shape="circle" [size]="size"></thy-skeleton-item>
                                <div style="flex: 1">
                                    <thy-skeleton-item width="100%" styleClass="ml-2" [height]="listHeight"></thy-skeleton-item>
                                </div>
                            </thy-list-item>
                        </thy-list>
                    </div>
                    <ng-content select="[custom]"></ng-content>
                </ng-template>
            </div>
        </ng-container>
        <!-- <ng-template #renderDom>
            <ng-template *ngTemplateOutlet="thyRealDomTemplate"> </ng-template>
        </ng-template> -->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonComponent {
    @Input() size: string = '1rem';
    @Input() type: string = '';
    @Input() uiLoading: boolean = true;
    @Input() listHeight: string = '1rem';
    @Input() firstWidth: string = '33%';
    @Input() lastWidth: string = '66%';

    rowsCount: number[];
    @Input('rows')
    set rowsChange(value: number | string) {
        this.rowsCount = Array.from({ length: +value });
    }
    @Input() animated: boolean = true;
    @Input() thyCustomTemplate: TemplateRef<HTMLElement>;
    // @Input() thyRealDomTemplate: TemplateRef<HTMLElement>;
    @Input() styleClass: string | null;
}
