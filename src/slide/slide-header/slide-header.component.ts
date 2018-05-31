import { Component, ContentChild, TemplateRef, Input, Output, OnInit } from '@angular/core';
import { ThySlideService } from '../slide.service';

@Component({
    selector: 'thy-slide-header',
    templateUrl: './slide-header.component.html'
})
export class ThySlideHeaderComponent implements OnInit {

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

    closeModal() {
        this.thySlideService.hide();
    }

}
