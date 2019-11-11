import { Component } from '@angular/core';
import { ThySkeletonComponent } from '../skeleton.component';

@Component({
    selector: 'thy-skeleton-list',
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
                <svg:rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
                <svg:rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
                <svg:rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
                <svg:rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
                <svg:rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
                <svg:rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
            </ng-template>
        </thy-skeleton>
    `
})
export class ThySkeletonListComponent extends ThySkeletonComponent {}
