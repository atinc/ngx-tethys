import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-weak-example',
    templateUrl: './weak.component.html',
    imports: [ThyVote]
})
export class ThyVoteWeakExampleComponent {
    vote_count = 112;

    vote_count1 = 76;

    has_voted = signal<boolean>(true);

    toggleVote(event: Event) {
        this.has_voted.set(!this.has_voted());
    }
}
