import { Component } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyVote]
})
export class ThyVoteBasicExampleComponent {
    constructor() {}

    vote_count = 5;
    vote_count1 = 134;

    has_voted = true;

    toggleVote(event: Event) {
        this.has_voted = !this.has_voted;
    }
}
