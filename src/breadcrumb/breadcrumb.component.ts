import {
    Component,
    ChangeDetectionStrategy,
    HostBinding,
    Input,
    ContentChild,
    QueryList,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    ContentChildren,
    ViewChild,
    ElementRef,
    EmbeddedViewRef
} from '@angular/core';
import { ThyBreadcrumbItemComponent } from './breadcrumb-item.component';
import { ChangeDetectorRef } from '@angular/core';
export const BREADCRUMB_SHOW_MAX = 5;
@Component({
    selector: 'thy-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    exportAs: 'ThyBreadcrumb',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyBreadcrumbComponent {
    @HostBinding(`class.thy-breadcrumb`) _isBreadcrumb = true;
    @HostBinding(`class.separator-slash`) isSlash = false;
    @HostBinding(`class.separator-backslash`) isBackslash = false;

    iconClasses: string[];
    svgIconName: string;

    @Input('thyMaxItemCount') max: number = BREADCRUMB_SHOW_MAX;

    @ContentChildren(ThyBreadcrumbItemComponent) set breadcrumbItem(components: QueryList<ThyBreadcrumbItemComponent>) {
        if (components) {
            this.breadcrumbItems = components.map(component => {
                return component;
            });
            this.initialContentChildren(this.breadcrumbItems);
        }
    }

    breadcrumbItems: ThyBreadcrumbItemComponent[];

    foldItems: ThyBreadcrumbItemComponent[] = [];

    expandItems: ThyBreadcrumbItemComponent[] = [];

    @Input()
    set thyIcon(icon: string) {
        this.setIcon(icon);
    }

    @Input()
    set thySeparator(type: string) {
        if (type === 'slash') {
            this.isSlash = true;
        }
        if (type === 'backslash') {
            this.isBackslash = true;
        }
    }

    private setIcon(icon: string) {
        if (icon) {
            if (icon.includes('wtf')) {
                const classes = icon.split(' ');
                if (classes.length === 1) {
                    classes.unshift('wtf');
                }
                this.iconClasses = classes;
            } else {
                this.svgIconName = icon;
            }
        } else {
            this.iconClasses = null;
            this.svgIconName = null;
        }
    }

    constructor(private cdr: ChangeDetectorRef) {}

    private initialContentChildren(components: ThyBreadcrumbItemComponent[]) {
        let max = Number(this.max);
        this.expandItems = [];
        this.foldItems = [];

        if (max < 0) {
            max = BREADCRUMB_SHOW_MAX;
        }
        // if have content ref in breadcrumb item, show all item. else show folded item.
        const showEveryItem = this.isShowEveryItem(components);
        if (showEveryItem) {
            this.foldItems = [...components];
        }
        components.forEach((component, index) => {
            if (index >= components.length - max) {
                this.expandItems = [...this.expandItems, component];
            } else {
                if (!showEveryItem) {
                    this.foldItems = [...this.foldItems, component];
                }
            }
        });
        this.cdr.detectChanges();
    }

    private isShowEveryItem(components: ThyBreadcrumbItemComponent[]) {
        return components.every(component => {
            return component.contentRef;
        });
    }

    trackBy(index: number) {
        return index;
    }
}
