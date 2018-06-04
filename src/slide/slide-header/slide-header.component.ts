import { Component, ContentChild, TemplateRef, Input, Output, OnInit, HostBinding } from '@angular/core';
import { ThySlideService } from '../slide.service';

@Component({
    selector: 'thy-slide-header',
    templateUrl: './slide-header.component.html'
})
export class ThySlideHeaderComponent implements OnInit {

    @HostBinding('class.thy-slide-header') thySlideHeader = true;

    @ContentChild(TemplateRef)
    public headerTemplate: TemplateRef<any>;

    public isTemplateRef: boolean;

    constructor(
        private thySlideService: ThySlideService
    ) { }

    @Input() thyTitle: string;

    @Input() thyIcon: string;

    ngOnInit() {
        this.isTemplateRef = this.headerTemplate instanceof TemplateRef;
    }

    closeModal(event: Event) {
        this.thySlideService.hide();
    }

}
