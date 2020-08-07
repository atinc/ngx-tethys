import { OnInit, Component } from '@angular/core';
import { mixinUnsubscribe, MixinBase } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-title',
    templateUrl: './title.component.html'
})
export class ThySkeletonTitleExampleComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    width = 100;

    height = 10;

    ngOnInit(): void {}
}
