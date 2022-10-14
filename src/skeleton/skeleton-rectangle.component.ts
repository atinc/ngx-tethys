import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Input,
    OnInit,
    Optional,
    OnChanges,
    SimpleChanges,
    Inject
} from '@angular/core';
import { ThySkeletonComponent } from './skeleton.component';
import { helpers } from 'ngx-tethys/util';
import { InputCssPixel, InputBoolean } from 'ngx-tethys/core';
import { SkeletonDefaultConfig, THY_SKELETON_CONFIG, ThySkeletonConfigModel } from './skeleton.config';
interface Style {
    background?: string;
    animation?: string;
}
@Component({
    selector: 'thy-skeleton-rectangle',
    host: {
        '[class.thy-skeleton]': 'true',
        '[class.thy-skeleton-rectangle]': 'true',
        '[style.background]': 'thyPrimaryColor',
        '[style.width]': 'thyRowWidth',
        '[style.height]': 'thyRowHeight',
        '[style.borderRadius]': 'thyBorderRadius'
    },
    template: `
        <div class="thy-skeleton-after" [ngStyle]="afterStyles"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ThySkeletonRectangleComponent implements OnInit, OnChanges {
    /**
     * 是否开启动画
     */
    @Input()
    @InputBoolean()
    thyAnimated: boolean;

    /**
     * 动画速度
     * @default 1.2s
     */
    @Input() thyAnimatedInterval: number;

    /**
     * 骨架边框圆角
     * @default 6px
     */
    @Input()
    @InputCssPixel()
    thyBorderRadius: string | number;

    /**
     * 骨架宽度
     * @default 100%
     */
    @Input()
    @InputCssPixel()
    thyRowWidth: string | number;

    /**
     * 骨架高度
     * @default 1rem
     */
    @Input()
    @InputCssPixel()
    thyRowHeight: string | number;

    /**
     * 骨架主色
     * @default #F7F7F7
     */
    @Input() thyPrimaryColor: string;

    /**
     * 骨架次色
     * @default #eeeeee
     */
    @Input() thySecondaryColor: string;

    afterStyles: Style = {};

    constructor(
        @Optional()
        @Inject(THY_SKELETON_CONFIG)
        private skeletonConfigModel: ThySkeletonConfigModel,
        @Optional() private _parent: ThySkeletonComponent
    ) {}

    ngOnInit() {
        const config = { ...SkeletonDefaultConfig, ...this.skeletonConfigModel, ...(this._parent || {}) };
        const { thyAnimatedInterval, thyPrimaryColor, thySecondaryColor, thyAnimated } = config;

        for (let key in { thyAnimatedInterval, thyPrimaryColor, thySecondaryColor, thyAnimated }) {
            this[key] = this[key] || config[key];
        }
        this.crateAfterStyles();
    }

    crateAfterStyles() {
        this.afterStyles = {
            ...(this.thySecondaryColor && {
                background: `linear-gradient(90deg, ${helpers.hexToRgb(this.thySecondaryColor, 0)}, ${helpers.hexToRgb(
                    this.thySecondaryColor,
                    0.4
                )}, ${helpers.hexToRgb(this.thySecondaryColor, 0)}`
            }),
            animation: this.thyAnimated !== false ? `thy-skeleton-animation ${this.thyAnimatedInterval}s infinite` : 'none'
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thySecondaryColor, thyAnimated, thyAnimatedInterval } = changes;
        if (!thySecondaryColor?.firstChange || !thyAnimated?.firstChange || !thyAnimatedInterval?.firstChange) {
            this.crateAfterStyles();
        }
    }
}
