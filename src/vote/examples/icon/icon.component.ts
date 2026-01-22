import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-icon-example',
    templateUrl: './icon.component.html',
    imports: [ThyVote]
})
export class ThyVoteIconExampleComponent {
    vote_count = 5;

    vote_count1 = 134;

    has_voted = signal<boolean>(true);

    toggleVote(event: Event) {
        this.has_voted.set(!this.has_voted());
    }
}
