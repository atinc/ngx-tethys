import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyVoteBasicExampleComponent } from './basic/basic.component';
import { ThyVoteIconExampleComponent } from './icon/icon.component';
import { ThyVoteWeakExampleComponent } from './weak/weak.component';

const COMPONENTS = [ThyVoteBasicExampleComponent, ThyVoteIconExampleComponent, ThyVoteWeakExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyVoteExamplesModule {}
