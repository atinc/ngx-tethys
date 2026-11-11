import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-appearance-example',
    templateUrl: './appearance.component.html',
    imports: [ThyVote]
})
export class ThyVoteAppearanceExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
