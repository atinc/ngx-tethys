import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { FormsModule } from '@angular/forms';
import { ThyDot } from 'ngx-tethys/dot';
import { NgClass } from '@angular/common';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-select-vertical-center-example',
    templateUrl: './vertical-center.component.html',
    styles: [
        `
            thy-select {
                width: 400px;
                margin-top: 15px;
            }
        `
    ],
    imports: [ThySelect, ThyOption, ThyButtonGroup, FormsModule, ThyDot, NgClass, ThyTag, ThyAvatar, ThyIcon, ThyButton]
})
export class ThySelectVerticalCenterExampleComponent implements OnInit {
    listOfOption: { value: string; text: string }[];

    listOfSelectedValue = ['option1', 'option2'];

    avatarSrc = 'assets/images/one-avatar.jpg';

    selectSizes = [
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: 'default',
            height: 36
        },
        {
            name: 'lg',
            height: 44
        }
    ];

    currentSize = this.selectSizes[2];

    ngOnInit() {
        this.listOfOption = listOfOption;
    }
}
