import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

@Component({
    selector: 'thy-skeleton-list-template',
    template: `
        <ng-template #content>
            <svg:rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
            <svg:rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
            <svg:rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
            <svg:rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
            <svg:rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
            <svg:rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
        </ng-template>
    `
})
export class ThySkeletonListComponent implements OnInit {
    @ViewChild('content', { static: true }) contentTemplateRef: TemplateRef<any>;

    constructor(private skeletonComponent: ThySkeletonComponent) {}

    ngOnInit(): void {
        this.skeletonComponent.addTemplate(this.contentTemplateRef);
    }
}
