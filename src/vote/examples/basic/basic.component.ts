import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyVote]
})
export class ThyVoteBasicExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
