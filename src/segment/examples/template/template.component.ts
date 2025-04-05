import { Component } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThySegment, ThySegmentItem } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-template-example',
    templateUrl: './template.component.html',
    imports: [ThySegment, ThySegmentItem, ThyAvatar]
})
export class ThySegmentTemplateExampleComponent {
    items = [
        { value: 'fuqiang', labelText: '富强', avatar: 'Fuqiang' },
        { value: 'minzhu', labelText: '民主', avatar: 'Minzhu' },
        { value: 'wenming', labelText: '文明', avatar: 'Wenming' }
    ];
}
