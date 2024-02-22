import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyPopoverModule } from 'ngx-tethys/popover';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyMentionDirective } from './mention.directive';
import { ThyMentionSuggestions } from './suggestions/suggestions.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyPopoverModule, ThyListModule, ThyLoadingModule, ThyMentionDirective, ThyMentionSuggestions],
    exports: [ThyMentionDirective],
    providers: []
})
export class ThyMentionModule {}
