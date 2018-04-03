import { Injectable, ElementRef } from '@angular/core';
import { PopBoxOptions } from "../pop-box/pop-box-member-options.class";

@Injectable()
export class PopBoxMemberOptions extends PopBoxOptions {


}

export const popBoxMemberConfigDefaults: PopBoxMemberOptions = {
    placement: 'bottom left',
    visibleArrow: false,
    keyboard: true,
    outsideClick: true,
    autoClose: false,
}