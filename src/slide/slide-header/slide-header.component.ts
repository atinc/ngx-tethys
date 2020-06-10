import { Component, ContentChild, TemplateRef, Input, OnInit, HostBinding } from '@angular/core';
import { ThySlideService } from '../slide.service';

@Component({
    selector: 'thy-slide-header',
    templateUrl: './slide-header.component.html'
})
export class ThySlideHeaderComponent implements OnInit {
    isIconFont = false;

    private _iconName = '';

    @HostBinding('class.thy-slide-header') slideLayoutHeader = true;

    @Input() thyTitle: string;

    @Input() set thyIcon(value: string) {
        this._iconName = value;
        if (value.includes('wtf')) {
            this.isIconFont = true;
        } else {
            this.isIconFont = false;
        }
    }

    get thyIcon() {
        return this._iconName;
    }

    @ContentChild('thyHeader', { static: true }) headerTemplate: TemplateRef<any>;

    @ContentChild('thyHeaderOperate', { static: true }) headerOperateTemplate: TemplateRef<any>;

    constructor(private thySlideService: ThySlideService) {}

    ngOnInit() {}

    closeModal(event: Event) {
        event.stopPropagation();
        this.thySlideService.close();
    }
}
