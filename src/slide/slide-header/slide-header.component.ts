import { Component, TemplateRef, OnInit, inject, input, computed, contentChild } from '@angular/core';
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
    imports: [NgTemplateOutlet, ThyIcon, ThyAction],
    host: {
        class: 'thy-slide-header'
    }
})
export class ThySlideHeader implements OnInit {
    private thySlideService = inject(ThySlideService);

    /**
     * 标题
     */
    readonly thyTitle = input<string>();

    /**
     * 标题的图标
     */
    readonly thyIcon = input<string>();

    readonly isIconFont = computed(() => (this.thyIcon() || '').includes('wtf'));

    /**
     * 自定义头模板
     * @type TemplateRef
     */
    readonly headerTemplate = contentChild<TemplateRef<any>>('thyHeader');

    /**
     * 头部操作区域模板
     * @type TemplateRef
     */
    readonly headerOperateTemplate = contentChild<TemplateRef<any>>('thyHeaderOperate');

    ngOnInit() {}

    closeModal(event: Event) {
        event.stopPropagation();
        this.thySlideService.close();
    }
}
