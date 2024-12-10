import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';

@Component({
    selector: 'thy-back-top-target-example',
    templateUrl: './target.component.html',
    styleUrls: ['./target.scss'],
    standalone: false
})
export class ThyBackTopTargetExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    demos: number[] = [];

    ngOnInit(): void {
        for (let index = 0; index < 30; index++) {
            this.demos.push(index);
        }
    }

    visibleChange(visible: boolean) {
        this.notifyService.show({
            type: 'info',
            placement: 'bottomLeft',
            title: `target backTop button ${visible ? 'visible' : 'hidden'}`
        });
    }

    click($event: boolean) {
        this.notifyService.show({
            type: 'info',
            placement: 'bottomLeft',
            title: `backup button has clicked`
        });
    }
}
