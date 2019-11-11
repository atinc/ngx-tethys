import { Component, Input, OnInit } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

interface BulletListItem {
    circle: { cx: number; cy: number; r: number };
    rect: { x: number; y: number; rx: number; ry: number; width: number | string; height: number | string };
}

@Component({
    selector: 'thy-skeleton-bullet-list',
    template: `
        <thy-skeleton
            [thyAnimate]="thyAnimate"
            [thyWidth]="thyWidth"
            [thyHeight]="thyHeight"
            [thyViewBoxWidth]="thyViewBoxWidth"
            [thyViewBoxHeight]="thyViewBoxHeight"
            [thySpeed]="thySpeed"
            [thyPreserveAspectRatio]="thyPreserveAspectRatio"
            [thyPrimaryColor]="thyPrimaryColor"
            [thySecondaryColor]="thySecondaryColor"
            [thyPrimaryOpacity]="thyPrimaryOpacity"
            [thySecondaryColor]="thySecondaryColor"
            [thyUniqueKey]="thyUniqueKey"
        >
            <ng-template #content>
                <ng-container *ngFor="let item of items">
                    <svg:circle [attr.cx]="item.circle.cx" [attr.cy]="item.circle.cy" r="8" />
                    <svg:rect [attr.x]="item.rect.x" [attr.y]="item.rect.y" rx="5" ry="5" width="90%" height="10" />
                </ng-container>
            </ng-template>
        </thy-skeleton>
    `
})
export class ThySkeletonBulletListComponent extends ThySkeletonComponent implements OnInit {
    @Input() thyCount = 5;

    items: BulletListItem[] = [];

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
    }
}

// import { Component, ViewChild, TemplateRef, OnInit, ViewContainerRef, Inject, PLATFORM_ID } from '@angular/core';
// import { ComponentPortal, CdkPortalOutlet } from '@angular/cdk/portal';
// import { ThySkeletonComponent } from '../skeleton.component';

// @Component({
//     selector: 'thy-skeleton-bullet-list',
//     template: `
//         <ng-template #content>
//             <svg:circle cx="10" cy="20" r="8" />
//             <svg:rect x="25" y="15" rx="5" ry="5" width="90%" height="10" />
//             <svg:circle cx="10" cy="50" r="8" />
//             <svg:rect x="25" y="45" rx="5" ry="5" width="90%" height="10" />
//             <svg:circle cx="10" cy="80" r="8" />
//             <svg:rect x="25" y="75" rx="5" ry="5" width="90%" height="10" />
//             <svg:circle cx="10" cy="110" r="8" />
//             <svg:rect x="25" y="105" rx="5" ry="5" width="90%" height="10" />
//         </ng-template>
//         <ng-template cdkPortalOutlet></ng-template>
//     `
// })
// export class ThySkeletonBulletListComponent extends ThySkeletonComponent implements OnInit {
//     @ViewChild('content') contentTemplate: TemplateRef<any>;

//     @ViewChild(CdkPortalOutlet) cdkPortalOutlet: CdkPortalOutlet;

//     constructor(@Inject(PLATFORM_ID) platformId: string) {
//         super(platformId);
//     }

//     ngOnInit() {
//         const componentPortal = new ComponentPortal(ThySkeletonComponent, undefined);
//         const componentRef = this.cdkPortalOutlet.attach(componentPortal);
//         componentRef.instance.contentTemplate = this.contentTemplate;
//         componentRef.instance.assignInputProperties(this);
//     }
// }
