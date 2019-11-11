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
    selector: 'app-demo-skeleton-title',
    templateUrl: './skeleton-title.component.html'
})
export class DemoSkeletonTitleComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    width = 100;

    height = 10;

    ngOnInit(): void {}
}
