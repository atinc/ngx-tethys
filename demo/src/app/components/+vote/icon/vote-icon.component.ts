import { Component } from '@angular/core';

@Component({
    selector: 'demo-vote-icon',
    templateUrl: './vote-icon.component.html'
})
export class DemoVoteIconComponent {
    constructor() {}

    vote_count = 5;
    vote_count1 = 134;

    has_voted = true;

    toggleVote($event) {
        this.has_voted = !this.has_voted;
    }
}
