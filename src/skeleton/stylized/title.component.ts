import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

@Component({
    selector: 'thy-skeleton-title-template,[thySkeletonTitleTemplate]',
    template: `
        <ng-template #content>
            <svg:rect x="15" y="13" rx="4" ry="4" [attr.width]="width" [attr.height]="height" />
        </ng-template>
    `,
    exportAs: 'thySkeletonTitleTemplate'
})
export class ThySkeletonTitleComponent implements OnInit {
    @ViewChild('content', { static: true }) contentTemplateRef: TemplateRef<any>;

    width = 100;

    height = 10;

    @Input() set thyWidth(value: number) {
        if (value) {
            this.width = value;
        }
    }

    @Input() set thyHeight(value: number) {
        if (value) {
            this.height = value;
        }
    }

    constructor(private skeletonComponent: ThySkeletonComponent) {}

    ngOnInit(): void {
        this.skeletonComponent.addTemplate(this.contentTemplateRef);
    }
}
