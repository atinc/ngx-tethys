import { Component } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyVote]
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
