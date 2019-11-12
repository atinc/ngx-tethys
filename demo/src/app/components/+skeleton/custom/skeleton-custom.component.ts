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
    selector: 'app-demo-skeleton-custom',
    templateUrl: './skeleton-custom.component.html'
})
export class DemoSkeletonCustomComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    ngOnInit(): void {}
}
