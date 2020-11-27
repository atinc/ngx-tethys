import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyAffixModule } from 'ngx-tethys/affix';
import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyAnchorModule } from 'ngx-tethys/anchor';
import { ThyArrowSwitcherModule } from 'ngx-tethys/arrow-switcher';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyBackTopModule } from 'ngx-tethys/back-top';
import { ThyBadgeModule } from 'ngx-tethys/badge';
import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyConfirmModule } from 'ngx-tethys/confirm';
import { ThySelectCommonModule } from 'ngx-tethys/core';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyDateRangeModule } from 'ngx-tethys/date-range';
import { ThyDatepickerModule } from 'ngx-tethys/datepicker';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyDirectiveModule } from 'ngx-tethys/directive';
import { ThyDragDropModule } from 'ngx-tethys/drag-drop';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyLayoutModule } from 'ngx-tethys/layout';
// import { ThyKeySelectModule } from 'ngx-tethys/key-select';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyMarkdownModule } from 'ngx-tethys/markdown';
import { ThyMentionModule } from 'ngx-tethys/mention';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyModalModule } from 'ngx-tethys/modal';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThyPopBoxModule } from 'ngx-tethys/pop-box';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyProgressModule } from 'ngx-tethys/progress';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyRasterModule } from 'ngx-tethys/raster';
import { ThyResultModule } from 'ngx-tethys/result';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
import { ThySlideModule } from 'ngx-tethys/slide';
import { ThyStatisticModule } from 'ngx-tethys/statistic';
import { ThyStepperModule } from 'ngx-tethys/stepper';
import { ThyStrengthModule } from 'ngx-tethys/strength';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyTransferModule } from 'ngx-tethys/transfer';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';
import { ThyTreeModule } from 'ngx-tethys/tree';
import { ThyUploaderModule } from 'ngx-tethys/uploader';
import { ThyVoteModule } from 'ngx-tethys/vote';
import { ThySliderModule } from 'ngx-tethys/slider';
import { ThyCalendarModule } from 'ngx-tethys/calendar';

const IMPORT_EXPORT_MODULES = [
    ThyLayoutModule,
    ThyButtonModule,
    ThyBackTopModule,
    ThyIconModule,
    ThyPopBoxModule,
    ThyPopoverModule,
    ThyBadgeModule,
    ThyGridModule,
    ThyRasterModule,
    ThyAvatarModule,
    ThyLabelModule,
    ThyNavModule,
    ThyMenuModule,
    ThyPaginationModule,
    ThyModalModule,
    ThyNotifyModule,
    ThyCardModule,
    ThyLoadingModule,
    ThyAlertModule,
    ThyDatepickerModule,
    ThyActionMenuModule,
    ThyConfirmModule,
    ThyTreeModule,
    ThyEmptyModule,
    ThySwitchModule,
    ThyTransferModule,
    ThyStrengthModule,
    ThyFormModule,
    ThyInputModule,
    ThyDropdownModule,
    ThyCopyModule,
    ThyDirectiveModule,
    ProgressbarModule,
    ThyCheckboxModule,
    ThySelectModule,
    ThySlideModule,
    ThyRadioModule,
    ThySelectModule,
    ThyPropertyOperationModule,
    ThyUploaderModule,
    ThyDateRangeModule,
    // ThyKeySelectModule,
    ThyListModule,
    ThyTreeSelectModule,
    ThyStepperModule,
    ThyCascaderModule,
    ThyDialogModule,
    ThyTooltipModule,
    ThyProgressModule,
    ThyBreadcrumbModule,
    ThyArrowSwitcherModule,
    ThyMarkdownModule,
    ThyFlexibleTextModule,
    ThyDragDropModule,
    ThySelectCommonModule,
    ThySkeletonModule,
    ThyVoteModule,
    ThyResultModule,
    ThyMentionModule,
    ThyDatePickerModule,
    ThyTimelineModule,
    ThyTimePickerModule,
    ThyStatisticModule,
    ThyAutocompleteModule,
    ThyAnchorModule,
    ThyAffixModule,
    ThySliderModule,
    ThyCalendarModule
];

@NgModule({
    declarations: [],
    imports: [ProgressbarModule.forRoot(), ...IMPORT_EXPORT_MODULES],
    exports: IMPORT_EXPORT_MODULES,
    providers: []
})
export class NgxTethysModule {
    static forRoot(): ModuleWithProviders<NgxTethysModule> {
        return {
            ngModule: NgxTethysModule,
            providers: []
        };
    }
}
