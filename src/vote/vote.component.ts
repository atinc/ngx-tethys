import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, contentChild, effect, input, TemplateRef } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyVoteSizes = 'default' | 'sm';

export type ThyVoteType = 'primary' | 'success' | 'primary-weak' | 'success-weak';

export type ThyVoteLayout = 'vertical' | 'horizontal';

/**
 * 投票组件
 * @name thy-vote,[thyVote]
 * @order 10
 */
@Component({
    selector: 'thy-vote,[thyVote]',
    templateUrl: './vote.component.html',
    host: {
        class: 'thy-vote',
        '[class.has-voted]': 'thyHasVoted()',
        '[class.thy-vote-disabled]': `thyDisabled()`
    },
    imports: [ThyIcon, NgTemplateOutlet]
})
export class ThyVote {
    private hostRenderer = useHostRenderer();

    /**
     * 大小，thyLayout="vertical" 时，支持: sm | default
     */
    readonly thySize = input<ThyVoteSizes, ThyVoteSizes>('default', {
        transform: (value: ThyVoteSizes) => value || 'default'
    });

    /**
     * 标签类型: primary | success | primary-weak | success-weak
     */
    readonly thyVote = input<ThyVoteType, ThyVoteType>('primary', {
        transform: (value: ThyVoteType) => value || 'primary'
    });

    /**
     * 是否是偏圆型
     */
    readonly thyRound = input(false, { transform: coerceBooleanProperty });

    /**
     * 布局: horizontal | vertical
     */
    readonly thyLayout = input<ThyVoteLayout, ThyVoteLayout>('horizontal', {
        transform: (value: ThyVoteLayout) => value || 'horizontal'
    });

    /**
     * 赞同的数量
     */
    readonly thyVoteCount = input<number | string>();

    /**
     * 图标
     */
    readonly thyIcon = input<string, string>('thumb-up', {
        transform: (value: string) => value || 'thumb-up'
    });

    /**
     * 是否赞同
     */
    readonly thyHasVoted = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    /**
     * 自定义Icon模板
     */
    readonly voteIcon = contentChild<TemplateRef<any>>('voteIcon');

    constructor() {
        effect(() => {
            this.setClassesByType();
        });
    }

    private setClassesByType() {
        const classNames = [];

        if (this.thyRound()) {
            classNames.push('thy-vote-round');
        }
        classNames.push(`thy-vote-${this.thyVote()}`);
        classNames.push(`thy-vote-${this.thyLayout()}`);
        classNames.push(`thy-vote-${this.thyLayout()}-size-${this.thySize()}`);
        this.hostRenderer.updateClass(classNames);
    }
}
