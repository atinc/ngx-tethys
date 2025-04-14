import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySkeletonModule, THY_SKELETON_CONFIG } from 'ngx-tethys/skeleton';
import { ThyGridModule } from 'ngx-tethys/grid';

@NgModule({
    imports: [CommonModule, ThyGridModule, ThySkeletonModule],
    providers: [
        {
            provide: THY_SKELETON_CONFIG,
            useValue: {
                thyAnimatedInterval: 1.5,
                thyPrimaryColor: 'var(--gray-70)',
                thySecondaryColor: 'var(--gray-500)',
                thyAnimated: true
            }
        }
    ]
})
export class ThySkeletonExamplesModule {}
