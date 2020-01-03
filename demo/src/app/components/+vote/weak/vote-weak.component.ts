import { Component } from '@angular/core';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';

@Component({
    selector: 'demo-vote-weak',
    templateUrl: './vote-weak.component.html'
})
export class DemoVoteWeakComponent {
    constructor() {}

    vote_count = 112;
    vote_count1 = 76;

    has_voted = true;

    toggleVote($event) {
        this.has_voted = !this.has_voted;
    }
}
