import { OnInit, Component } from '@angular/core';
import { mixinUnsubscribe, MixinBase } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-list',
    templateUrl: './list.component.html'
})
export class ThySkeletonListExampleComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    ngOnInit(): void {}
}
