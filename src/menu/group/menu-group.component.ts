import { Component, OnInit, HostBinding, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ThyPopBoxService } from '../../pop-box';
import { ElementDef } from '@angular/core/src/view';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    public _templateRef: ElementRef;

    public rightIconClass = 'wtf wtf-more-lg';

    public iconClass = 'wtf wtf-drive-o';

    @ViewChild('thyMenuGroup') _thyMenuGroup: ElementRef;

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

    @Output() thyActionClick: EventEmitter<Event> = new EventEmitter<Event>();

    @Input()
    set thyActionMenu(value: ElementRef) {
        this._templateRef = value;
    }

    constructor(private popBoxService: ThyPopBoxService, private el: ElementRef, private render: Renderer2) {}

    ngOnInit(): void {}

    collapseGroup(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    rightIconAction(event: Event): void {
        event.stopPropagation();
        if (this._templateRef) {
            this.popBoxService.show(this._templateRef, {
                target: event.currentTarget,
                insideAutoClose: true,
                stopPropagation: true,
                placement: 'bottom right'
            });
        } else {
            if (this.thyActionClick) {
                this.thyActionClick.emit(event);
            }
        }
    }
}
