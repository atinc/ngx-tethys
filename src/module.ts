import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { ModuleWithProviders, NgModule } from '@angular/core';

import { ThyActionMenuModule } from './action-menu';
import { ThyAffixModule } from './affix';
import { ThyAlertModule } from './alert';
import { ThyAnchorModule } from './anchor/anchor.module';
import { ThyArrowSwitcherModule } from './arrow-switcher';
import { ThyAutocompleteModule } from './autocomplete/module';
import { ThyAvatarModule } from './avatar';
import { ThyBackTopModule } from './back-top';
import { ThyBadgeModule } from './badge';
import { ThyBreadcrumbModule } from './breadcrumb';
import { ThyButtonModule } from './button';
import { ThyCardModule } from './card';
import { ThyCascaderModule } from './cascader';
import { ThyCheckboxModule } from './checkbox';
import { ThyConfirmModule } from './confirm';
import { ThySelectCommonModule } from './core/select/module';
import { ThyDatePickerModule } from './date-picker';
import { ThyDateRangeModule } from './date-range';
import { ThyDatepickerModule } from './datepicker';
import { ThyDialogModule } from './dialog';
import { ThyDirectiveModule } from './directive';
import { ThyDragDropModule } from './drag-drop/module';
import { ThyDropdownModule } from './dropdown';
import { ThyCopyModule } from './copy';
import { ThyEmptyModule } from './empty';
import { ThyFlexibleTextModule } from './flexible-text';
import { ThyFormModule } from './form';
import { ThyGridModule } from './grid';
import { ThyIconModule } from './icon';
import { ThyInputModule } from './input';
import { ThyLabelModule } from './label';
import { ThyLayoutModule } from './layout';
// import { ThyKeySelectModule } from './key-select';
import { ThyListModule } from './list';
import { ThyLoadingModule } from './loading';
import { ThyMarkdownModule } from './markdown';
import { ThyMentionModule } from './mention';
import { ThyMenuModule } from './menu';
import { ThyModalModule } from './modal';
import { ThyNavModule } from './nav';
import { ThyNotifyModule } from './notify';
import { ThyPaginationModule } from './pagination';
import { ThyPopBoxModule } from './pop-box';
import { ThyPopoverModule } from './popover';
import { ThyProgressModule } from './progress';
import { ThyPropertyOperationModule } from './property-operation';
import { ThyRadioModule } from './radio';
import { ThyRasterModule } from './raster';
import { ThyResultModule } from './result';
import { ThySelectModule } from './select';
import { ThySkeletonModule } from './skeleton';
import { ThySlideModule } from './slide';
import { ThyStatisticModule } from './statistic';
import { ThyStepperModule } from './stepper';
import { ThyStrengthModule } from './strength';
import { ThySwitchModule } from './switch';
import { ThyTimelineModule } from './timeline';
import { ThyTimePickerModule } from './time-picker';
import { ThyTooltipModule } from './tooltip';
import { ThyTransferModule } from './transfer';
import { ThyTreeSelectModule } from './tree-select';
import { ThyTreeModule } from './tree/tree.module';
import { ThyUploaderModule } from './uploader';
import { ThyVoteModule } from './vote';
import { ThySliderModule } from './slider/slider.module';
import { ThyCalendarModule } from './calendar';

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
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxTethysModule,
            providers: []
        };
    }
}
