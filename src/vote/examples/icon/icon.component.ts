import { Component } from '@angular/core';

@Component({
    selector: 'thy-vote-icon-example',
    templateUrl: './icon.component.html',
    standalone: false
})
export class ThyVoteIconExampleComponent {
    constructor() {}

    vote_count = 5;
    vote_count1 = 134;

    has_voted = true;

    toggleVote(event: Event) {
        this.has_voted = !this.has_voted;
    }
}
