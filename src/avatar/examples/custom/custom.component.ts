import { Component } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys';
import { CustomAvatarService } from './custom-avatar.service';

@Component({
    selector: 'thy-avatar-custom-example',
    templateUrl: './custom.component.html',
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
