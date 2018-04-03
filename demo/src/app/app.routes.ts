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

const appRoutes = [
    {
        path: 'components/button',
        component: DemoButtonSectionComponent
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
        path: 'components/nav',
        component: DemoNavSectionComponent
    }
];

export { appRoutes };
