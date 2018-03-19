import { DemoButtonSectionComponent } from './components/+button/button-section.component';
import { DemoPopBoxSectionComponent } from './components/+pop-box/pop-box-section.component'
const appRoutes = [
    {
        path: 'components/button',
        component: DemoButtonSectionComponent
    },
    {
        path: 'components/pob-box',
        component: DemoPopBoxSectionComponent
    }
];

export { appRoutes };
