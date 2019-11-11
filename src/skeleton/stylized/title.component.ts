import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

@Component({
    selector: 'thy-skeleton-title-template,[thySkeletonTitleTemplate]',
    template: `
        <ng-template #content>
            <svg:rect x="15" y="13" rx="4" ry="4" [attr.width]="thyWidth" height="10" />
        </ng-template>
    `,
    exportAs: 'thySkeletonTitleTemplate'
})
export class ThySkeletonTitleComponent implements OnInit {
    @ViewChild('content') contentTemplateRef: TemplateRef<any>;

    @Input() thyWidth = 100;

    constructor(private skeletonComponent: ThySkeletonComponent) {}

    ngOnInit(): void {
        this.skeletonComponent.addTemplate(this.contentTemplateRef);
    }
}
