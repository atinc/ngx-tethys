import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyMentionDirective } from './mention.directive';
import { ThyMentionSuggestionsComponent } from './suggestions/suggestions.component';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyEmptyModule } from 'ngx-tethys/empty';

@NgModule({
    declarations: [ThyMentionDirective, ThyMentionSuggestionsComponent],
    imports: [CommonModule, FormsModule, ThyPopoverModule, ThyListModule, ThyLoadingModule],
    exports: [ThyMentionDirective],
    providers: [],
    entryComponents: [ThyMentionSuggestionsComponent]
})
export class ThyMentionModule {}
