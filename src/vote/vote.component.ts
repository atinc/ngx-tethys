import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, contentChild, effect, input, TemplateRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyVoteSize = 'default' | 'sm';

/** @deprecated use ThyVoteSize */
export type ThyVoteSizes = ThyVoteSize;

export type ThyVoteColor = 'primary' | 'success';

export type ThyVoteAppearance = 'fill' | 'subtle';

/** @deprecated use ThyVoteColor and ThyVoteAppearance */
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
        '[class.has-voted]': 'voted()',
        '[class.thy-vote-disabled]': `thyDisabled()`
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon, NgTemplateOutlet]
})
export class ThyVote {
    private hostRenderer = useHostRenderer();

    /**
     * 大小，thyLayout="vertical" 时，支持: sm | default
     * @type sm | default
     * @default default
     */
    readonly thySize = input<ThyVoteSize, ThyVoteSize>('default', {
        transform: (value: ThyVoteSize) => value || 'default'
    });

    /**
     * 颜色
     * @type primary | success
     * @default primary
     */
    readonly thyColor = input<ThyVoteColor>();

    /**
     * 外观
     * @type fill | subtle
     * @default fill
     */
    readonly thyAppearance = input<ThyVoteAppearance>('fill');

    /**
     * 标签类型（已废弃，将在 v23 彻底移除），请使用 thyColor + thyAppearance
     * @deprecated please use thyColor and thyAppearance
     * @type primary | success | primary-weak | success-weak
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
    readonly thyCount = input<number | string>();

    /**
     * 赞同的数量
     * @deprecated please use thyCount
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
    readonly thyVoted = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否赞同
     * @deprecated please use thyVoted
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

    readonly count = computed(() => this.thyCount() ?? this.thyVoteCount());

    readonly voted = computed(() => this.thyVoted() || this.thyHasVoted());

    private readonly resolved = computed(() => {
        const colorInput = this.thyColor();
        const appearanceInput = this.thyAppearance() || 'fill';
        const vote = this.thyVote();

        if (colorInput) {
            return { color: colorInput, appearance: appearanceInput };
        }

        if (vote === 'primary-weak') {
            return { color: 'primary' as const, appearance: 'subtle' as const };
        }
        if (vote === 'success-weak') {
            return { color: 'success' as const, appearance: 'subtle' as const };
        }
        if (vote === 'primary' || vote === 'success') {
            return { color: vote, appearance: appearanceInput };
        }

        return { color: 'primary' as const, appearance: appearanceInput };
    });

    constructor() {
        effect(() => {
            this.setClassesByType();
        });
    }

    private setClassesByType() {
        const classNames = [];
        const { color, appearance } = this.resolved();

        if (this.thyRound()) {
            classNames.push('thy-vote-round');
        }
        classNames.push(appearance === 'fill' ? `thy-vote-${color}` : `thy-vote-${appearance}-${color}`);
        classNames.push(`thy-vote-${this.thyLayout()}`);
        classNames.push(`thy-vote-${this.thyLayout()}-size-${this.thySize()}`);
        this.hostRenderer.updateClass(classNames);
    }
}
