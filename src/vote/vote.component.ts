import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, contentChild, effect, input, TemplateRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyVoteSize = 'default' | 'sm';

/** @deprecated use ThyVoteSize, will be remove in v23 */
export type ThyVoteSizes = ThyVoteSize;

export type ThyVoteColor = 'primary' | 'success';

export type ThyVoteAppearance = 'fill' | 'subtle';

/** @deprecated use ThyVoteColor and ThyVoteAppearance, will be remove in v23 */
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
     * 颜色，一般使用`thyVote`指令写法
     * @type primary | success
     * @default primary
     */
    readonly thyVote = input<ThyVoteColor | ThyVoteType>();

    /**
     * 颜色，一般使用`thyVote`指令写法；通过`thy-vote`组件使用时，使用该参数控制颜色
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
     * 赞同的数量（已废弃，将在 v23 彻底移除），请使用 thyCount
     * @deprecated please use thyCount, will be remove in v23
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
     * 是否赞同（已废弃，将在 v23 彻底移除），请使用 thyVoted
     * @deprecated please use thyVoted, will be remove in v23
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
        const appearanceInput = this.thyAppearance() || 'fill';
        // Prefer thyVote (directive) then thyColor (component), like button: thyButton || thyColor
        const value = this.thyVote() || this.thyColor();

        if (value === 'primary-weak') {
            return { color: 'primary' as const, appearance: 'subtle' as const };
        }
        if (value === 'success-weak') {
            return { color: 'success' as const, appearance: 'subtle' as const };
        }
        if (value === 'primary' || value === 'success') {
            return { color: value, appearance: appearanceInput };
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
        classNames.push(appearance === 'fill' ? `thy-vote-${color}` : `thy-vote-${color}-${appearance}`);
        classNames.push(`thy-vote-${this.thyLayout()}`);
        classNames.push(`thy-vote-${this.thyLayout()}-size-${this.thySize()}`);
        this.hostRenderer.updateClass(classNames);
    }
}
