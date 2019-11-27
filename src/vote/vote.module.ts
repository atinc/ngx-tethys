import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyVoteComponent } from './vote.component';
import { ThyIconModule } from '../icon';

@NgModule({
    declarations: [ThyVoteComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyVoteComponent]
})
export class ThyVoteModule {
    constructor() {}
}
