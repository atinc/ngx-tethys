import { ElementRef } from '@angular/core';

export class ThySliderOption {
    target?: ElementRef | any;
    from?: string; // 'left','right','top','bottom'
    width?: number | string;
    height?: number | string;
    align?: string; // 'left','center','right'
    vertical?: string; // 'top','middle','left'
}

export const thySlideOptionDefaults: ThySliderOption = {
    from: 'right', // 'left','right','top','bottom'
    width: 350,
    height: '100%',
    align: 'left', // 'left','center','right'
    vertical: 'middle', // 'top','middle','left'
};
