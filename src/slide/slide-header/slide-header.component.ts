import { Component, ContentChild, TemplateRef, Input, OnInit, HostBinding, inject } from '@angular/core';
import { ThySlideService } from '../slide.service';
import { ThyAction } from 'ngx-tethys/action';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';

/**
 * 滑动弹出框的头部组件
 * @name thy-slide-header
 * @order 40
 */
@Component({
    selector: 'thy-slide-header',
    templateUrl: './slide-header.component.html',
    standalone: true,
    imports: [NgTemplateOutlet, ThyIcon, ThyAction]
})
export class ThySlideHeader implements OnInit {
    private thySlideService = inject(ThySlideService);

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

    ngOnInit() {}

    closeModal(event: Event) {
        event.stopPropagation();
        this.thySlideService.close();
    }
}
