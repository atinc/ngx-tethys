import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyVote]
})
export class ThyVoteDisabledExampleComponent {
    vote_count = 5;
    vote_count1 = 134;

    vote_count_round = '圆角';

    has_voted = signal<boolean>(false);

    toggleVote(event: Event) {
        this.has_voted.set(!this.has_voted());
    }
}
