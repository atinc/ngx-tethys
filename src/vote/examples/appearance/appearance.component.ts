import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyVote]
})
export class ThyVoteAppearanceExampleComponent {
    vote_count = 112;

    vote_count1 = 76;

    has_voted = signal<boolean>(true);

    toggleVote(event: Event) {
        this.has_voted.set(!this.has_voted());
    }
}
