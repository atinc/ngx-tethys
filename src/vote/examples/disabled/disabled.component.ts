import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyVote]
})
export class ThyVoteDisabledExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
