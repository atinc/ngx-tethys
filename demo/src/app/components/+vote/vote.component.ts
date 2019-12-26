import { Component } from '@angular/core';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { DemoVoteBasicComponent } from './basic/vote-basic.component';
import { DemoVoteWeakComponent } from './weak/vote-weak.component';

@Component({
    selector: 'demo-vote',
    templateUrl: './vote.component.html'
})
export class DemoVoteComponent {
    public apiParameters = [
        {
            property: 'thyVote',
            description: '标签类型（primary、success)',
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
            property: 'thySizs',
            description:
                'thyLayout="vertical"支持"sm"和"md",thyLayout="horizontal"支持"sm",只限制高度，宽度根据数字自适应',
            type: 'String',
            default: 'sm'
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
