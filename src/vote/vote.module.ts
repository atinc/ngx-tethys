import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyVote } from './vote.component';
import { ThyIconModule } from 'ngx-tethys/icon';
@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyVote],
    exports: [ThyVote],
    providers: []
})
export class ThyVoteModule {}
