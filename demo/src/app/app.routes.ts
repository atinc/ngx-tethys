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

const appRoutes = [
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
        path: 'components/modal',
        component: DemoModalSectionComponent
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
        path: 'components/card',
        component: DemoCardSectionComponent
    },
    {
        path: 'components/loading',
        component: DemoLoadingSectionComponent
    },
    {
        path: 'components/tree',
        component: DemoTreeSectionComponent
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
        path: 'components/form',
        component: DemoFormSectionComponent
    },
    {
        path: 'components/input',
        component: DemoInputSectionComponent
    },

];

export { appRoutes };
