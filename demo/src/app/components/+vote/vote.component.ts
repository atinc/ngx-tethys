import { Component } from '@angular/core';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { DemoVoteBasicComponent } from './basic/vote-basic.component';
import { DemoVoteWeakComponent } from './weak/vote-weak.component';
import { DemoVoteIconComponent } from './icon/vote-icon.component';

@Component({
    selector: 'demo-vote',
    templateUrl: './vote.component.html'
})
export class DemoVoteComponent {
    public apiParameters = [
        {
            property: 'thyVote',
            description: '标签类型（primary、success、primary-weak、success-weak)',
            type: 'ThyVote',
            default: 'primary'
        },
        {
            property: 'thyLayout',
            description: '标签类型（horizontal、vertical)',
            type: 'thyLayout',
            default: 'horizontal'
        },
        {
            property: 'thySize',
            description: 'thyLayout="vertical"支持"sm"和"default"',
            type: 'string',
            default: 'default'
        },
        {
            property: 'thyHasVoted',
            description: '是否赞同',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyVoteCount',
            description: '赞同的数量',
            type: 'number | string',
            default: ''
        },
        {
            property: 'thyIcon',
            description: '图标',
            type: 'string',
            default: 'thumb-up'
        },
        {
            property: 'thyRound',
            description: '是否是偏圆型',
            type: 'boolean',
            default: 'false'
        }
    ];
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Vote Basic',
            component: DemoVoteBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'vote-basic.component.html',
                    content: require('!!raw-loader!./basic/vote-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'vote-basic.component.ts',
                    content: require('!!raw-loader!./basic/vote-basic.component.ts')
                }
            ]
        },
        {
            title: 'Vote Weak',
            component: DemoVoteWeakComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'vote-weak.component.html',
                    content: require('!!raw-loader!./weak/vote-weak.component.html')
                },
                {
                    type: 'ts',
                    name: 'vote-weak.component.ts',
                    content: require('!!raw-loader!./weak/vote-weak.component.ts')
                }
            ]
        },
        {
            title: 'Vote Icon',
            component: DemoVoteIconComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'vote-icon.component.html',
                    content: require('!!raw-loader!./icon/vote-icon.component.html')
                },
                {
                    type: 'ts',
                    name: 'vote-icon.component.ts',
                    content: require('!!raw-loader!./icon/vote-icon.component.ts')
                }
            ]
        }
    ];
    constructor() {}

    vote_count = 112;

    vote_count1 = 5;

    has_voted = true;

    toggleVote($event) {
        this.has_voted = !this.has_voted;
    }
}
