import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-shape-example',
    templateUrl: './shape.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyVote]
})
export class ThyVoteShapeExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
