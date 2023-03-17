import { Component, ContentChild, TemplateRef, Input, OnInit, HostBinding } from '@angular/core';
import { ThySlideService } from '../slide.service';
import { ThyActionComponent } from 'ngx-tethys/action';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

/**
 * 滑动弹出框的头部组件
 */
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

    /**
     * 标题
     */
    @Input() thyTitle: string;

    /**
     * 标题的图标
     */
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

    /**
     * 自定义头模板
     * @type TemplateRef
     */
    @ContentChild('thyHeader') headerTemplate: TemplateRef<any>;

    /**
     * 头部操作区域模板
     * @type TemplateRef
     */
    @ContentChild('thyHeaderOperate') headerOperateTemplate: TemplateRef<any>;

    constructor(private thySlideService: ThySlideService) {}

    ngOnInit() {}

    closeModal(event: Event) {
        event.stopPropagation();
        this.thySlideService.close();
    }
}
