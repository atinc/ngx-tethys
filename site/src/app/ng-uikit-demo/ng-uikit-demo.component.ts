import { Component, signal } from '@angular/core';
import { NxAvatar, NxAvatarService, NxDefaultAvatarService } from '@pc-nexus/ng-uikit/avatar';
import { NxButton } from '@pc-nexus/ng-uikit/button';

@Component({
    selector: 'ng-uikit-demo',
    templateUrl: './ng-uikit-demo.component.html',
    imports: [NxButton, NxAvatar],
    providers: [{ provide: NxAvatarService, useClass: NxDefaultAvatarService }]
})
export class NgUIKitDemoComponent {
    readonly lastClick = signal<string | null>(null);
    readonly lastRemove = signal<string | null>(null);
    count = 0;

    buttonClick(label: string, event: MouseEvent): void {
        this.lastClick.set(`${label}（${event.type}）`);
    }

    avatarRemove(name: string, event: Event): void {
        this.lastRemove.set(`${name}（${event.type}） ${this.count++}`);
    }
}
