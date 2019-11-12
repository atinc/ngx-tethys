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
    selector: 'app-demo-skeleton-list',
    templateUrl: './skeleton-list.component.html'
})
export class DemoSkeletonListComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    ngOnInit(): void {}
}
