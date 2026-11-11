import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-icon-example',
    templateUrl: './icon.component.html',
    imports: [ThyVote]
})
export class ThyVoteIconExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
