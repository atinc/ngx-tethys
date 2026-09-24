import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyVote]
})
export class ThyVoteBasicExampleComponent {
    vote_count = 5;

    vote_count1 = 134;

    hasVoted = signal<boolean>(true);

    toggleVote(event: Event) {
        this.hasVoted.set(!this.hasVoted());
    }
}
