import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-color-example',
    templateUrl: './color.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyVote]
})
export class ThyVoteColorExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
