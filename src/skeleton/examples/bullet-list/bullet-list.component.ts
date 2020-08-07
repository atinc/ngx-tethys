import { OnInit, Component } from '@angular/core';
import { mixinUnsubscribe, MixinBase } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-bullet-list',
    templateUrl: './bullet-list.component.html'
})
export class ThySkeletonBulletListExampleComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    ngOnInit(): void {}
}
