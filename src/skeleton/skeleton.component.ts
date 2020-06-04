import {
    Component,
    OnInit,
    Input,
    Inject,
    PLATFORM_ID,
    SimpleChanges,
    OnChanges,
    HostBinding,
    TemplateRef,
    ContentChild
} from '@angular/core';
import { helpers } from '../util';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'thy-skeleton',
    templateUrl: './skeleton.component.html'
})
export class ThySkeletonComponent implements OnInit, OnChanges {
    @HostBinding('class.thy-skeleton') addSkeletonClass = true;

    @Input() thyAnimate = true;

    @Input() thyBaseUrl = '';

    @Input() thyWidth: string | number = '100%';

    @Input() thyHeight: string | number = '100%';

    @Input() thyViewBoxWidth: string | number = 400;

    @Input() thyViewBoxHeight: string | number = 130;

    @Input() thySpeed = 2;

    @Input() thyPreserveAspectRatio = 'none'; // xMidYMid meet

    @Input() thyPrimaryColor = '#f0f0f0';

    @Input() thySecondaryColor = '#e0e0e0';

    @Input() thyPrimaryOpacity = 1;

    @Input() thySecondaryOpacity = 1;

    @Input() thyUniqueKey: string;

    @Input() thyRtl: string;

    @Input() thyStyle: { [key: string]: string };

    @Input() thyIgnoreBaseUrl = false;

    @Input() thyLoadingDone = false;

    @ContentChild('content', { static: true })
    customTemplate: TemplateRef<any>;

    contentTemplates: TemplateRef<any>[] = [];

    idClip = helpers.generateRandomStr();

    idGradient = helpers.generateRandomStr();

    defaultAnimation = ['-3; 1', '-2; 2', '-1; 3'];

    rtlAnimation = ['1; -3', '2; -2', '3; -1'];

    animationValues: string[];

    fillStyle: { fill: string };

    clipPath: string;

    constructor(@Inject(PLATFORM_ID) private platformId: string) {}

    ngOnInit() {
        this.animationValues = this.thyRtl ? this.rtlAnimation : this.defaultAnimation;

        if (this.thyBaseUrl === '' && !this.thyIgnoreBaseUrl && isPlatformBrowser(this.platformId)) {
            this.thyBaseUrl = window.location.pathname;
        }

        this.setFillStyle();
        this.setClipPath();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['thyBaseUrl']) {
            if (changes['thyBaseUrl'].previousValue !== changes['thyBaseUrl'].currentValue) {
                this.setFillStyle();
                this.setClipPath();
            }
        }
    }

    setFillStyle() {
        this.fillStyle = {
            fill: `url(${this.thyBaseUrl}#${this.idGradient})`
        };
    }

    setClipPath() {
        this.clipPath = `url(${this.thyBaseUrl}#${this.idClip})`;
    }

    assignInputProperties(input: ThySkeletonComponent) {
        this.thyAnimate = input.thyAnimate;
        this.thyBaseUrl = input.thyBaseUrl;
        this.thyHeight = input.thyHeight;
        this.thyWidth = input.thyWidth;
        this.thyViewBoxHeight = input.thyViewBoxHeight;
        this.thyViewBoxWidth = input.thyViewBoxWidth;
        this.thyPreserveAspectRatio = input.thyPreserveAspectRatio;
        this.thyPrimaryColor = input.thyPrimaryColor;
        this.thyPrimaryOpacity = input.thyPrimaryOpacity;
        this.thySecondaryColor = input.thySecondaryColor;
        this.thySecondaryOpacity = input.thySecondaryOpacity;
        this.thyRtl = this.thyRtl;
        this.thySpeed = this.thySpeed;
        this.thyUniqueKey = this.thyUniqueKey;
    }

    addTemplate(template: TemplateRef<any>) {
        if (template) {
            this.contentTemplates.push(template);
        }
    }
}
