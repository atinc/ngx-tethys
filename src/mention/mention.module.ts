import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyPopoverModule } from 'ngx-tethys/popover';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyMentionDirective } from './mention.directive';
import { ThyMentionSuggestionsComponent } from './suggestions/suggestions.component';

@NgModule({
    declarations: [ThyMentionDirective, ThyMentionSuggestionsComponent],
    imports: [CommonModule, FormsModule, ThyPopoverModule, ThyListModule, ThyLoadingModule],
    exports: [ThyMentionDirective],
    providers: [],
    entryComponents: [ThyMentionSuggestionsComponent]
})
export class ThyMentionModule {}
