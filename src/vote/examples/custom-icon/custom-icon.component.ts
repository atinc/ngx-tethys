import { Component } from '@angular/core';

@Component({
    selector: 'thy-vote-custom-icon-example',
    templateUrl: './custom-icon.component.html'
})
export class ThyVoteCustomIconExampleComponent {
    constructor() {}

    vote_count = 5;
    vote_count1 = 134;

    has_voted = true;

    toggleVote(event: Event) {
        this.has_voted = !this.has_voted;
    }
}
