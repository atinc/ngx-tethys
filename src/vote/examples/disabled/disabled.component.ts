import { Component } from '@angular/core';

@Component({
    selector: 'thy-vote-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyVoteDisabledExampleComponent {
    constructor() {}

    vote_count = 5;
    vote_count1 = 134;

    vote_count_round = '圆角';

    has_voted = false;

    toggleVote(event: Event) {
        this.has_voted = !this.has_voted;
    }
}
