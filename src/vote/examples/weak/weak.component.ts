import { Component } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-weak-example',
    templateUrl: './weak.component.html',
    imports: [ThyVote]
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
