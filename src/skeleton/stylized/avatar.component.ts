import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

@Component({
    selector: 'thy-skeleton-avatar-template,[thySkeletonAvatarTemplate]',
    template: `
        <ng-template #content>
            <svg:circle cx="30" cy="30" r="30" />
        </ng-template>
    `
})
export class ThySkeletonAvatarComponent implements OnInit {
    @ViewChild('content', { static: true }) contentTemplateRef: TemplateRef<any>;

    constructor(private skeletonComponent: ThySkeletonComponent) {}

    ngOnInit(): void {
        this.skeletonComponent.addTemplate(this.contentTemplateRef);
    }
}
