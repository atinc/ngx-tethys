import { Component } from '@angular/core';
import { ThyAvatarService } from 'ngx-tethys/avatar';
import { CustomAvatarService } from './custom-avatar.service';

@Component({
    selector: 'thy-avatar-custom-example',
    templateUrl: './custom.component.html',
    providers: [
        {
            provide: ThyAvatarService,
            useClass: CustomAvatarService
        }
    ],
    standalone: false
})
export class ThyAvatarCustomExampleComponent {
    sizes = ['xs', 'sm', 'md', 'lg'];
}
