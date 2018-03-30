import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'avatarShortName' })
export class AvatarShortNamePipe implements PipeTransform {
    transform(name: string): string {
        name = name.trim();
        if (/^[\u4e00-\u9fa5]+$/.test(name)) {
            if (name.length > 2) {
                return name.substr(name.length - 2, 2);
            }
        }
        if (/^[a-zA-Z\/ ]+$/.test(name)) {
            if (name.indexOf(' ') > 0) {
                const ens: string[] = name.split(' ');
                return (ens[0].substr(0, 1) + ens[1].substr(0, 1)).toUpperCase();
            }
        }
        if (name.length > 2) {
            return name.substr(0, 2).toUpperCase();
        }
        return name.toUpperCase();
    }
}

@Pipe({ name: 'avatarBgColor' })
export class AvatarBgColorPipe implements PipeTransform {
    transform(name: string) {
        const colors = ['#2cccda', '#2dbcff', '#4e8af9', '#7076fa', '#9473fd', '#ef7ede', '#99d75a', '#66c060', '#39ba5d'];
        const nameArray: string[] = name.split('');
        const code: number = name && name.length > 0 ? nameArray.reduce(function (result, item) {
            result.value += item.charCodeAt(0);
            return result;
        }, { value: 0 }).value : 0;
        return {
            'background-color': colors[(code % 9)]
        };
    }
}

export const AvatarPipes = [
    AvatarShortNamePipe,
    AvatarBgColorPipe
];
