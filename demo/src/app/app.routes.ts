import { DemoButtonSectionComponent } from './components/+button/button-section.component';
import { DemoPopBoxSectionComponent } from './components/+pop-box/pop-box-section.component';
import { DemoRebootSectionComponent } from './components/+reboot/reboot-section.component';
import { DemoTableSectionComponent } from './components/+table/table-section.component';
import { DemoWTDSectionLinkComponent } from './components/+wtd/wtd.component';
import { DemoBadgeSectionComponent } from './components/+badge/badge-section.component';
import { DemoGridSectionComponent } from './components/+grid/grid-section.component';
import { DemoAvatarSectionComponent } from './components/+avatar/avatar-section.component';
import { DemoLabelSectionComponent } from './components/+label/label-section.component';
import { DemoLayoutSectionComponent } from './components/+layout/layout-section.component';
import { DemoNavSectionComponent } from './components/+nav/nav-section.component';
import { DemoModalSectionComponent } from './components/+modal/modal-section.component';
import { DemoCardSectionComponent } from './components/+card/card-section.component';
import { DemoLoadingSectionComponent } from './components/+loading/loading-section.component';
import { DemoAlertSectionComponent } from './components/+alert/alert-section.component';
import { DemoPaginationComponent } from './components/+pagination/pagination.component';
import { DemoActionMenuSectionComponent } from './components/+action-menu/action-menu-section.component';
import { DemoConfirmSectionComponent } from './components/+confirm/confirm-section.component';
import { DemoTreeSectionComponent } from './components/+tree/tree-section.component';
import { DemoNotifySectionComponent } from './components/+notify/notify-section.component';
import { DemoEmptySectionComponent } from './components/+empty/empty-section.component';
import { DemoSwitchSectionComponent } from './components/+switch/switch-section.component';
import { DemoTransferSectionComponent } from './components/+transfer/transfer-section.component';
import { DemoFormSectionComponent } from './components/+form/form-section.component';
import { DemoDataPickerSectionComponent } from './components/+date-picker/date-picker-section.component';
import { DemoInputSectionComponent } from './components/+input/input-section.component';
import { DemoDropdownSectionComponent } from './components/+dropdown/dropdown-section.component';
import { DemoProgressSectionComponent } from './components/+progress/progress-section.component';
import { DemoCheckboxSectionComponent } from './components/+form-checkbox/checkbox-section.component';
import { DemoRadioSectionComponent } from './components/+form-radio/radio-section.component';
import { DemoSelectSectionComponent } from './components/+select/select-section.component';
import { DemoSlideSectionComponent } from './components/+slide/slide-section.component';
import { DemoPropertyOperationSectionComponent } from './components/+property-operation/property-operation-section.component';
import { DemoUploaderSectionComponent } from './components/+uploader/uploader-section.component';
import { DemoEditorSectionComponent } from './components/+editor/editor-section.component';
import { DemoDateRangeSectionComponent } from './components/+date-range/date-range-section.component';
import { DemoKeySelectSectionComponent } from './components/+key-select/key-select-section.component';
import { DemoListComponent } from './components/+list/list-section.component';
import { DemoDatepickerNextSectionComponent } from './components/+datepicker-next/datepicker-next-section.component';
import { DemoTreeSelectSectionComponent } from './components/+tree-select/tree-select-section.component';
import { DemoStrengthComponent } from './components/+strength/strength-section.component';
import { DemoStepperSectionComponent } from './components/+stepper/stepper-section.component';
import { DemoCascaderSectionComponent } from './components/+cascader/cascader-section.component';
import { DemoDialogSectionComponent } from './components/+dialog/dialog-section.component';
import { DemoBreadcrumbSectionComponent } from './components/+breadcrumb/breadcrumb-section.component';
import { DemoStoreSectionComponent } from './components/+store/store-section.component';
import { DemoMenuSectionComponent } from './components/+menu/menu-section.component';
import { DropDragComponent } from './components/+drop-drag/drop-drag.component';
import { DesignIntroductionComponent } from './design/introduction/introduction.component';
const appRoutes = [
    {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
    },
    {
        path: 'introduction',
        component: DesignIntroductionComponent
    },
    {
        path: 'components/button',
        component: DemoButtonSectionComponent
    },
    {
        path: 'components/dropdown',
        component: DemoDropdownSectionComponent
    },
    {
        path: 'components/pob-box',
        component: DemoPopBoxSectionComponent
    },
    {
        path: 'components/reboot',
        component: DemoRebootSectionComponent
    },
    {
        path: 'components/table',
        component: DemoTableSectionComponent
    },
    {
        path: 'components/wtd',
        component: DemoWTDSectionLinkComponent
    },
    {
        path: 'components/action-menu',
        component: DemoActionMenuSectionComponent
    },
    {
        path: 'components/grid',
        component: DemoGridSectionComponent
    },
    {
        path: 'components/badge',
        component: DemoBadgeSectionComponent
    },
    {
        path: 'components/avatar',
        component: DemoAvatarSectionComponent
    },
    {
        path: 'components/label',
        component: DemoLabelSectionComponent
    },
    {
        path: 'components/layout',
        component: DemoLayoutSectionComponent
    },
    {
        path: 'components/empty',
        component: DemoEmptySectionComponent
    },
    {
        path: 'components/nav',
        component: DemoNavSectionComponent
    },
    {
        path: 'components/menu',
        component: DemoMenuSectionComponent
    },
    {
        path: 'components/modal',
        component: DemoModalSectionComponent
    },
    {
        path: 'components/dialog',
        component: DemoDialogSectionComponent
    },
    {
        path: 'components/confirm',
        component: DemoConfirmSectionComponent
    },
    {
        path: 'components/notify',
        component: DemoNotifySectionComponent
    },
    {
        path: 'components/datepicker',
        component: DemoDataPickerSectionComponent
    },
    {
        path: 'components/datepicker-next',
        component: DemoDatepickerNextSectionComponent
    },
    {
        path: 'components/date-range',
        component: DemoDateRangeSectionComponent
    },
    {
        path: 'components/card',
        component: DemoCardSectionComponent
    },
    {
        path: 'components/loading',
        component: DemoLoadingSectionComponent
    },
    {
        path: 'components/alert',
        component: DemoAlertSectionComponent
    },
    {
        path: 'components/pagination',
        component: DemoPaginationComponent
    },
    {
        path: 'components/tree',
        component: DemoTreeSectionComponent
    },
    {
        path: 'components/progress',
        component: DemoProgressSectionComponent
    },
    {
        path: 'components/switch',
        component: DemoSwitchSectionComponent
    },
    {
        path: 'components/transfer',
        component: DemoTransferSectionComponent
    },
    {
        path: 'components/strength',
        component: DemoStrengthComponent
    },
    {
        path: 'components/form',
        component: DemoFormSectionComponent
    },
    {
        path: 'components/input',
        component: DemoInputSectionComponent
    },
    {
        path: 'components/checkbox',
        component: DemoCheckboxSectionComponent
    },
    {
        path: 'components/radio',
        component: DemoRadioSectionComponent
    },
    {
        path: 'components/select',
        component: DemoSelectSectionComponent
    },
    {
        path: 'components/slide',
        component: DemoSlideSectionComponent
    },
    {
        path: 'components/property-operation',
        component: DemoPropertyOperationSectionComponent
    },
    {
        path: 'components/uploader',
        component: DemoUploaderSectionComponent
    },
    {
        path: 'components/editor',
        component: DemoEditorSectionComponent
    },
    {
        path: 'components/key-select',
        component: DemoKeySelectSectionComponent
    },
    {
        path: 'components/list',
        component: DemoListComponent
    },
    {
        path: 'components/tree-select',
        component: DemoTreeSelectSectionComponent
    },
    {
        path: 'components/stepper',
        component: DemoStepperSectionComponent
    },
    {
        path: 'components/cascader',
        component: DemoCascaderSectionComponent
    },
    {
        path: 'components/breadcrumb',
        component: DemoBreadcrumbSectionComponent
    },
    {
        path: 'components/store',
        component: DemoStoreSectionComponent
    },
    {
        path: 'cdk/dropdrag',
        component: DropDragComponent
    }
];

export { appRoutes };
