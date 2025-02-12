import { Component } from '@angular/core';

@Component({
    selector: 'thy-segment-template-example',
    templateUrl: './template.component.html',
    standalone: false
})
export class ThySegmentTemplateExampleComponent {
    items = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' }
    ];
}
