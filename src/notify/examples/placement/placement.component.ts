import { ThyNotifyService } from 'ngx-tethys/notify';
import { Component, OnInit, inject } from '@angular/core';

@Component({
    selector: 'thy-notify-placement-example',
    templateUrl: './placement.component.html',
    standalone: false
})
export class ThyNotifyPlacementExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    ngOnInit() {}

    showTopLeft() {
        this.notifyService.show({
            type: 'info',
            title: 'Notify topLeft!',
            content: '这里是content。',
            placement: 'topLeft'
        });
    }
    showTopRight() {
        this.notifyService.show({
            type: 'info',
            title: 'Notify topRight!',
            content: '这里是content。',
            placement: 'topRight'
        });
    }
    showBottomLeft() {
        this.notifyService.show({
            type: 'info',
            title: 'Notify bottomLeft!',
            content: '这里是content。',
            placement: 'bottomLeft'
        });
    }
    showBottomRight() {
        this.notifyService.show({
            type: 'info',
            title: 'Notify bottomRight!',
            content: '这里是content。',
            placement: 'bottomRight'
        });
    }
}
