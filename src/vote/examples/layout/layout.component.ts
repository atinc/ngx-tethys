import { Component, signal } from '@angular/core';
import { ThyVote } from 'ngx-tethys/vote';

@Component({
    selector: 'thy-vote-layout-example',
    templateUrl: './layout.component.html',
    imports: [ThyVote]
})
export class ThyVoteLayoutExampleComponent {
    voted = signal<boolean>(true);

    toggleVote() {
        this.voted.set(!this.voted());
    }
}
