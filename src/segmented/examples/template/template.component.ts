import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-template-example',
    templateUrl: './template.component.html'
})
export class ThySegmentedTemplateExampleComponent {
    options = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' },
        { value: 'hexie', labelText: '和谐', avatar: 'Hexie' }
    ];
}
