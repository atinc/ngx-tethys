import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    standalone: false
})
export class ThyMenuThemeExampleComponent implements OnInit {
    private popover = inject(ThyPopover);

    theme: string = 'loose';

    coll: boolean;

    ngOnInit(): void {}

    openActionMenu(event: Event, menuTpl: TemplateRef<any>) {
        this.popover.open(menuTpl, {
            origin: event.currentTarget as HTMLElement,
            placement: 'bottomLeft',
            insideClosable: true,
            originActiveClass: 'active'
        });
    }
}
