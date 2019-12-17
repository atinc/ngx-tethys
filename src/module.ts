import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyButtonModule } from './button';
import { ThyIconModule } from './icon';
import { ThyLayoutModule } from './layout';
import { ThyPopBoxModule } from './pop-box';
import { ThyPopoverModule } from './popover';
import { ThyGridModule } from './grid';
import { ThyAvatarModule } from './avatar';
import { ThyBadgeModule } from './badge';
import { ThyLabelModule } from './label';
import { ThyNavModule } from './nav';
import { ThyMenuModule } from './menu';
import { ThyPaginationModule } from './pagination';
import { ThyModalModule } from './modal';
import { ThyCardModule } from './card';
import { ThyLoadingModule } from './loading';
import { ThyAlertModule } from './alert';
import { ThyActionMenuModule } from './action-menu';
import { ThyConfirmModule } from './confirm';
import { ThyTreeModule } from './tree/tree.module';
import { ThyDatepickerModule } from './datepicker';
import { ThyDatepickerNextModule } from './datepicker-next';
import { ThyNotifyModule } from './notify';
import { ThyEmptyModule } from './empty';
import { ThySwitchModule } from './switch';
import { ThyTransferModule } from './transfer';
import { ThyFormModule } from './form';
import { ThyInputModule } from './input';
import { ThyDropdownModule } from './dropdown';
import { ThyDirectiveModule } from './directive';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ThyCheckboxModule } from './checkbox';
import { ThyRadioModule } from './radio';
import { ThySelectModule } from './select';
import { ThySlideModule } from './slide';
import { ThyPropertyOperationModule } from './property-operation';
import { ThyUploaderModule } from './uploader';
import { ThyDateRangeModule } from './date-range';
// import { ThyKeySelectModule } from './key-select';
import { ThyListModule } from './list';
import { ThyTreeSelectModule } from './tree-select';
import { ThyStrengthModule } from './strength';
import { ThyStepperModule } from './stepper';
import { ThyCascaderModule } from './cascader';
import { ThyDialogModule } from './dialog';
import { ThyTooltipModule } from './tooltip';
import { ThyProgressModule } from './progress';
import { ThyBreadcrumbModule } from './breadcrumb';
import { ThyArrowSwitcherModule } from './arrow-switcher';
import { ThyMarkdownModule } from './markdown';
import { ThyFlexibleTextModule } from './flexible-text';
import { ThyDragDropModule } from './drag-drop/module';
import { ThySelectCommonModule } from './core/select/module';
import { ThySkeletonModule } from './skeleton';
import { ThyVoteModule } from './vote';

const IMPORT_EXPORT_MODULES = [
    BrowserAnimationsModule,
    ThyLayoutModule,
    ThyButtonModule,
    ThyIconModule,
    ThyPopBoxModule,
    ThyPopoverModule,
    ThyBadgeModule,
    ThyGridModule,
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
    ThyDatepickerNextModule,
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
    ThyVoteModule
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
