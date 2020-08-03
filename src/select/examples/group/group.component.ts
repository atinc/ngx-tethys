import {
    Component,
    ViewEncapsulation,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    Renderer2,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { taskTypes } from '../mock-data';

@Component({
    selector: 'thy-select-group-example',
    templateUrl: './group.component.html'
})
export class ThySelectGroupExampleComponent implements OnInit {
    optionData = taskTypes;

    selectedTaskType: string;

    ngOnInit() {
        this.selectedTaskType = this.optionData[0].name;
    }
}
