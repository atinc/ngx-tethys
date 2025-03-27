import { Component } from '@angular/core';

@Component({
    selector: 'thy-vote-weak-example',
    templateUrl: './weak.component.html',
    standalone: false
})
export class ThyVoteWeakExampleComponent {
    constructor() {}

    vote_count = 112;
    vote_count1 = 76;

    has_voted = true;

    toggleVote(event: Event) {
        this.has_voted = !this.has_voted;
    }
}
