import { Component } from '@angular/core';

@Component({
    selector: 'thy-segmented-template-example',
    templateUrl: './template.component.html'
})
export class ThySegmentedTemplateExampleComponent {
    items = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' }
    ];
}
