import { OnInit, Component } from '@angular/core';

import { mixinUnsubscribe, MixinBase } from '../../../../../src/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';

import { DemoSkeletonListComponent } from './list/skeleton-list.component';
import { DemoSkeletonBulletListComponent } from './bullet-list/skeleton-bullet-list.component';
import { DemoSkeletonCustomComponent } from './custom/skeleton-custom.component';
import { DemoSkeletonTitleComponent } from './title/skeleton-title.component';
import { DemoSkeletonAvatarComponent } from './avatar/skeleton-avatar.component';
import { DemoSkeletonParagraphComponent } from './paragraph/skeleton-paragraph.component';

@Component({
    selector: 'app-demo-skeleton-section',
    templateUrl: './skeleton-section.component.html',
    styleUrls: ['./skeleton-section.scss']
})
export class DemoSkeletonSectionComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Skeleton Paragraph',
            component: DemoSkeletonParagraphComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'skeleton-paragraph.component.html',
                    content: require('!!raw-loader!./paragraph/skeleton-paragraph.component.html')
                },
                {
                    type: 'ts',
                    name: 'skeleton-paragraph.component.ts',
                    content: require('!!raw-loader!./paragraph/skeleton-paragraph.component.ts')
                }
            ]
        },
        {
            title: 'Skeleton List',
            component: DemoSkeletonListComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'skeleton-list.component.html',
                    content: require('!!raw-loader!./list/skeleton-list.component.html')
                },
                {
                    type: 'ts',
                    name: 'skeleton-list.component.ts',
                    content: require('!!raw-loader!./list/skeleton-list.component.ts')
                }
            ]
        },
        {
            title: 'Skeleton Bullet List',
            component: DemoSkeletonBulletListComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'skeleton-bullet-list.component.html',
                    content: require('!!raw-loader!./bullet-list/skeleton-bullet-list.component.html')
                },
                {
                    type: 'ts',
                    name: 'skeleton-bullet-list.component.ts',
                    content: require('!!raw-loader!./bullet-list/skeleton-bullet-list.component.ts')
                }
            ]
        },
        {
            title: 'Skeleton Avatar',
            component: DemoSkeletonAvatarComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'skeleton-avatar.component.html',
                    content: require('!!raw-loader!./avatar/skeleton-avatar.component.html')
                },
                {
                    type: 'ts',
                    name: 'skeleton-avatar.component.ts',
                    content: require('!!raw-loader!./avatar/skeleton-avatar.component.ts')
                }
            ]
        },
        {
            title: 'Skeleton Title',
            component: DemoSkeletonTitleComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'skeleton-title.component.html',
                    content: require('!!raw-loader!./title/skeleton-title.component.html')
                },
                {
                    type: 'ts',
                    name: 'skeleton-title.component.ts',
                    content: require('!!raw-loader!./title/skeleton-title.component.ts')
                }
            ]
        },
        {
            title: 'Skeleton Custom Loader',
            component: DemoSkeletonCustomComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'skeleton-custom.component.html',
                    content: require('!!raw-loader!./custom/skeleton-custom.component.html')
                },
                {
                    type: 'ts',
                    name: 'skeleton-custom.component.ts',
                    content: require('!!raw-loader!./custom/skeleton-custom.component.ts')
                }
            ]
        }
    ];

    constructor() {
        super();
    }

    ngOnInit() {}
}
