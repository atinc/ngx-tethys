import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

@Component({
    selector: 'thy-skeleton-paragraph-template,[thySkeletonParagraphTemplate]',
    template: `
        <ng-template #content>
            <svg:rect x="0" y="0" rx="2" ry="2" width="38%" height="10" />
            <svg:rect x="20" y="20" rx="2" ry="2" width="92%" height="10" />
            <svg:rect x="20" y="40" rx="2" ry="2" width="92%" height="10" />
            <svg:rect x="0" y="60" rx="2" ry="2" width="61%" height="10" />
        </ng-template>
    `,
    exportAs: 'thySkeletonParagraphTemplate'
})
export class ThySkeletonParagraphComponent implements OnInit {
    @ViewChild('content', { static: true }) contentTemplateRef: TemplateRef<any>;

    constructor(private skeletonComponent: ThySkeletonComponent) {}

    ngOnInit(): void {
        this.skeletonComponent.addTemplate(this.contentTemplateRef);
    }
}
