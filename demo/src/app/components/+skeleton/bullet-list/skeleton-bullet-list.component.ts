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
    selector: 'app-demo-skeleton-bullet-list',
    templateUrl: './skeleton-bullet-list.component.html'
})
export class DemoSkeletonBulletListComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    ngOnInit(): void {}
}
