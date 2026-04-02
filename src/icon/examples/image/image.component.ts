import { Component, signal } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-icon-image-example',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    imports: [ThyIcon]
})
export class ThyIconImageExampleComponent {
    // 网络图片地址
    readonly imageUrl = signal('https://github.githubassets.com/images/icons/emoji/unicode/2764.png');
    // data URL
    readonly dataUrl = signal(
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23409eff'/%3E%3C/svg%3E"
    );
    // 应用内静态资源
    readonly staticUrl = signal('assets/images/one-avatar.jpg');
}
