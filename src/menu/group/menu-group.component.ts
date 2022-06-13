import {
    Component,
    OnInit,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    TemplateRef,
    ContentChild
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyMenuComponent, ThyMenuTheme } from '../menu.component';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-menu-group, [thy-menu-group],[thyMenuGroup]',
    templateUrl: './menu-group.component.html',
    animations: [
        trigger('detailsContentAnimation', [
            state(
                'void',
                style({
                    height: '*'
                })
            ),
            state(
                '1',
                style({
                    height: 0,
                    overflow: 'hidden'
                })
            ),
            state(
                '0',
                style({
                    height: '*'
                })
            ),
            transition('* => *', animate('0ms ease-out'))
        ])
    ]
})
export class ThyMenuGroupComponent implements OnInit {
    public _actionMenu: ComponentType<any> | TemplateRef<any>;

    public rightIconClass = 'more';

    public iconClass = 'folder-bold';

    public groupHeaderPaddingLeft = 0;

    get menuTheme(): ThyMenuTheme {
        return this.parent?.thyTheme;
    }

    @ViewChild('thyMenuGroup', { static: true }) _thyMenuGroup: ElementRef;

    @ContentChild('headerContent')
    headerContentTemplateRef: TemplateRef<any>;

    @HostBinding('class.thy-menu-group') isThyMenuGroup = true;

    @HostBinding('class.has-icon') showIcon = false;

    @HostBinding('class.collapsed') isCollapsed = false;

    @Input() thyTitle = '';

    @Input('thyExpand')
    set thyExpand(value: boolean) {
        this.isCollapsed = !!!value;
    }

    @Input('thyCollapsed')
    @InputBoolean()
    set thyCollapsed(value: boolean) {
        this.isCollapsed = value;
    }

    @Input() @InputBoolean() thyCollapsible: boolean = true;

    @Input('thyShowIcon')
    set thyShowIcon(value: boolean) {
        this.showIcon = value;
    }

    @Input('thyIcon')
    set thyIcon(value: string) {
        this.iconClass = value;
    }

    @Input('thyActionIcon')
    set thyActionIcon(value: string) {
        this.rightIconClass = value;
    }

    @Input() thyShowAction = false;

    @Input() thyActionStopPropagation = true;

    @Output() thyOnActionClick: EventEmitter<Event> = new EventEmitter<Event>();

    @Input()
    set thyActionMenu(value: ComponentType<any> | TemplateRef<any>) {
        this._actionMenu = value;
    }

    constructor(private popover: ThyPopover, public parent: ThyMenuComponent) {}

    ngOnInit(): void {}

    collapseGroup(): void {
        if (!this.thyCollapsible) {
            return;
        }
        this.isCollapsed = !this.isCollapsed;
    }

    onActionClick(event: Event): void {
        if (this.thyActionStopPropagation) {
            event.stopPropagation();
        }
        if (this._actionMenu) {
            this.popover.open(this._actionMenu, {
                origin: event.currentTarget as HTMLElement,
                insideClosable: true,
                placement: 'bottom'
            });
        } else {
            this.thyOnActionClick.emit(event);
        }
    }
}
