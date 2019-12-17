import { Component } from '@angular/core';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';

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
            property: 'thyVoteType',
            description: '标签类型（horizontal、vertical)',
            type: 'ThyVoteType',
            default: 'horizontal'
        },
        {
            property: 'thySizs',
            description: 'thyVoteType="vertical"支持"sm"和"md",thyVoteType="horizontal"支持"sm"',
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

    exampleCode = `
  <thy-vote [thyVoteCount]="vote_count" [thyHasVoted]="has_voted" (click)="toggleVote($event)"></thy-vote>
  <div
    [thyVote]="'success'"
    [thyVoteType]="'vertical'"
    [thyVoteCount]="vote_count"
    [thyHasVoted]="has_voted"
    (click)="toggleVote($event)"
  ></div>
  <div
    [thyVote]="'success'"
    [thyVoteType]="'vertical'"
    [thyVoteCount]="vote_count"
    [thyHasVoted]="has_voted"
    thyVoteSize="md"
    (click)="toggleVote($event)"
  ></div>
    `;
    constructor() {}

    vote_count = 112;

    has_voted = true;

    toggleVote() {
        this.has_voted = !this.has_voted;
    }
}
