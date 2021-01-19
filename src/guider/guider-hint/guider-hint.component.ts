import { Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { helpers } from 'ngx-tethys/util';
@Component({
    selector: 'thy-guider-hint',
    templateUrl: 'guider-hint.component.html'
})
export class ThyGuiderHintComponent implements OnInit {
    @HostBinding('class.thy-guider-hint-container') guiderHint = true;

    @Input()
    set stepHintData(value: any) {
        this.title = value.title;
        this.setDescription(value.description);
        this.cover = value.cover;
    }

    @Input() current: number;

    public title: string;

    public cover: string;

    public descriptionString: string;

    public descriptionTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}

    private setDescription(value: string | TemplateRef<any>) {
        if (helpers.isString(value)) {
            this.descriptionString = value as string;
        } else {
            this.descriptionTemplateRef = value as TemplateRef<any>;
        }
    }

    jump() {}
}
