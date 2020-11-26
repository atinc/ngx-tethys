import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyVoteComponent } from './vote.component';
import { ThyIconModule } from 'ngx-tethys/icon';
@NgModule({
    declarations: [ThyVoteComponent],
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    exports: [ThyVoteComponent],
    providers: []
})
export class ThyVoteModule {}
