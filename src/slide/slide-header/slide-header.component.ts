import { Component, ContentChild, TemplateRef, Input, OnInit, HostBinding } from '@angular/core';
import { ThySlideService } from '../slide.service';

@Component({
    selector: 'thy-slide-header',
    templateUrl: './slide-header.component.html'
})
export class ThySlideHeaderComponent implements OnInit {
    @HostBinding('class.thy-slide-header') slideLayoutHeader = true;

    @Input() thyTitle: string;

    @Input() thyIcon: string;

    @ContentChild('thyHeader') headerTemplate: TemplateRef<any>;

    @ContentChild('thyHeaderOperate') headerOperateTemplate: TemplateRef<any>;

    constructor(private thySlideService: ThySlideService) {}

    ngOnInit() {}

    closeModal(event: Event) {
        this.thySlideService.hide();
    }
}
