import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyVote]
})
export class ThyVoteAppearanceExampleComponent {
    hasVoted = signal<boolean>(true);

    toggleVote(event: Event) {
        this.hasVoted.set(!this.hasVoted());
    }
}
