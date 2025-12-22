import { Pipe, PipeTransform, inject } from '@angular/core';
import { ThyAvatarService } from './avatar.service';

/**
 * `\u4e00`: https://www.compart.com/en/unicode/U+4E00
 * `\u9fa5`: https://www.compart.com/en/unicode/U+9FA5
 */
const UNIFIED_IDEOGRAPHS_REGEX = /^[\u4e00-\u9fa5]+$/;

// eslint-disable-next-line no-useless-escape
const SET_OF_LETTERS_REGEX = /^[a-zA-Z\/ ]+$/;

/**
 * @private
 */
@Pipe({
    name: 'avatarShortName'
})
export class AvatarShortNamePipe implements PipeTransform {
    transform(name: string | null | undefined): string {
        if (!name) {
            return '';
        }

        name = name.trim();

        if (UNIFIED_IDEOGRAPHS_REGEX.test(name) && name.length > 2) {
            return name.slice(name.length - 2);
        }

        if (SET_OF_LETTERS_REGEX.test(name) && name.indexOf(' ') > 0) {
            const words: string[] = name.split(' ');
            return (words[0].slice(0, 1) + words[1].slice(0, 1)).toUpperCase();
        }

        return name.length > 2 ? name.slice(0, 2).toUpperCase() : name.toUpperCase();
    }
}

/**
 * @private
 */
@Pipe({
    name: 'avatarBgColor'
})
export class AvatarBgColorPipe implements PipeTransform {
    transform(name: string) {
        if (!name) {
            return;
        }
        const colors = ['#56abfb', '#5dcfff', '#84e17e', '#73d897', '#ff9f73', '#fa8888', '#fb7fb7', '#9a7ef4', '#868af6'];
        const nameArray: string[] = name.split('');
        const code: number =
            name && name.length > 0
                ? nameArray.reduce(
                      function (result, item) {
                          result.value += item.charCodeAt(0);
                          return result;
                      },
                      { value: 0 }
                  ).value
                : 0;
        return {
            'background-color': colors[code % 9]
        };
    }
}

/**
 * @private
 */
@Pipe({
    name: 'thyAvatarSrc'
})
export class AvatarSrcPipe implements PipeTransform {
    private thyAvatarService = inject(ThyAvatarService);

    transform(src: string, size: number) {
        return this.thyAvatarService.srcTransform
            ? this.thyAvatarService.srcTransform(src, size)
            : this.thyAvatarService.avatarSrcTransform(src, size);
    }
}

export const AvatarPipes = [AvatarShortNamePipe, AvatarBgColorPipe, AvatarSrcPipe];
