import { Component } from '@angular/core';
import { ThyAvatar, ThyAvatarService } from 'ngx-tethys/avatar';
import { CustomAvatarService } from './custom-avatar.service';

@Component({
    selector: 'thy-avatar-custom-example',
    templateUrl: './custom.component.html',
    imports: [ThyAvatar],
    providers: [
        {
            provide: ThyAvatarService,
            useClass: CustomAvatarService
        }
    ]
})
export class ThyAvatarCustomExampleComponent {
    sizes = ['xs', 'sm', 'md', 'lg'];
}
