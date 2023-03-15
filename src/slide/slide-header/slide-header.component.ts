import { Component, ContentChild, TemplateRef, Input, OnInit, HostBinding } from '@angular/core';
import { ThySlideService } from '../slide.service';
import { ThyActionComponent } from 'ngx-tethys/action';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'thy-slide-header',
    templateUrl: './slide-header.component.html',
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, ThyIconComponent, ThyActionComponent]
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

    @ContentChild('thyHeader') headerTemplate: TemplateRef<any>;

    @ContentChild('thyHeaderOperate') headerOperateTemplate: TemplateRef<any>;

    constructor(private thySlideService: ThySlideService) {}

    ngOnInit() {}

    closeModal(event: Event) {
        event.stopPropagation();
        this.thySlideService.close();
    }
}
