import { DemoButtonSectionComponent } from './components/+button/button-section.component';
import { DemoPopBoxSectionComponent } from './components/+pop-box/pop-box-section.component';
import { DemoRebootSectionComponent } from './components/+reboot/reboot-section.component';
import { DemoTableSectionComponent } from './components/+table/table-section.component';
import { DemoGridSectionComponent } from './components/+grid/grid-section.component';


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
        path: 'components/grid',
        component: DemoGridSectionComponent
    }
];

export { appRoutes };
