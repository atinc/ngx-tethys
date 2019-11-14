import {
    OnInit,
    Component,
    TemplateRef,
    ViewContainerRef,
    NgZone,
    ChangeDetectionStrategy,
    ElementRef
} from '@angular/core';
import { mixinUnsubscribe, MixinBase } from 'ngx-tethys/core';

@Component({
    selector: 'app-demo-skeleton-paragraph',
    templateUrl: './skeleton-paragraph.component.html'
})
export class DemoSkeletonParagraphComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    params: {
        width?: number | string;
        height?: number | string;
        viewBoxWidth?: number | string;
        viewBoxHeight?: number | string;
        primaryColor?: string;
        secondaryColor?: string;
        preserveAspectRatio?: string;
    } = {
        width: '100%',
        height: '100%',
        primaryColor: '#f0f0f0',
        secondaryColor: '#e0e0e0',
        viewBoxWidth: 400,
        viewBoxHeight: 130,
        preserveAspectRatio: 'none'
    };

    ngOnInit(): void {}
}
