import { Component } from '@angular/core';

@Component({
    selector: 'demo-vote-basic',
    templateUrl: './vote-basic.component.html'
})
export class DemoVoteBasicComponent {
    constructor() {}

    vote_count = 5;
    vote_count1 = 134;

    has_voted = true;

    toggleVote($event) {
        this.has_voted = !this.has_voted;
    }
}
