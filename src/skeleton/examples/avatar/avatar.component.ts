import { OnInit, Component } from '@angular/core';
import { mixinUnsubscribe, MixinBase } from 'ngx-tethys/core';

@Component({
    selector: 'thy-skeleton-avatar-example',
    templateUrl: './avatar.component.html'
})
export class ThySkeletonAvatarExampleComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    ngOnInit(): void {}
}
