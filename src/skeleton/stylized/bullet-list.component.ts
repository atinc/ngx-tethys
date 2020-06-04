import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

interface BulletListItem {
    circle: { cx: number; cy: number; r: number };
    rect: { x: number; y: number; rx: number; ry: number; width: number | string; height: number | string };
}

@Component({
    selector: 'thy-skeleton-bullet-list-template',
    template: `
        <ng-template #content>
            <ng-container *ngFor="let item of items">
                <svg:circle [attr.cx]="item.circle.cx" [attr.cy]="item.circle.cy" r="8" />
                <svg:rect [attr.x]="item.rect.x" [attr.y]="item.rect.y" rx="5" ry="5" width="90%" height="10" />
            </ng-container>
        </ng-template>
    `
})
export class ThySkeletonBulletListComponent implements OnInit {
    @Input() thyCount = 5;

    items: BulletListItem[] = [];

    @ViewChild('content', { static: true }) contentTemplateRef: TemplateRef<any>;

    constructor(private skeletonComponent: ThySkeletonComponent) {}

    ngOnInit() {
        for (let i = 0; i <= this.thyCount; i++) {
            this.items.push({
                circle: {
                    cx: 10,
                    cy: i * 30 + 20,
                    r: 8
                },
                rect: {
                    x: 25,
                    y: i * 2 * 15 + 15,
                    rx: 5,
                    ry: 5,
                    width: '90%',
                    height: 10
                }
            });
        }
        this.skeletonComponent.addTemplate(this.contentTemplateRef);
    }
}
