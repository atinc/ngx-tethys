import { Component, OnInit, HostBinding, Input, Output, EventEmitter, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { ThyPopover } from '../../popover';

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

    @ViewChild('thyMenuGroup', { static: true }) _thyMenuGroup: ElementRef;

    @HostBinding('class.thy-menu-group') isThyMenuGroup = true;

    @HostBinding('class.has-icon') showIcon = false;

    @HostBinding('class.collapsed') isCollapsed = true;

    @Input() thyTitle = '';

    @Input('thyExpand')
    set thyExpand(value: boolean) {
        this.isCollapsed = !!!value;
    }

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

    constructor(private popover: ThyPopover) {}

    ngOnInit(): void {}

    collapseGroup(): void {
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
