import { Pipe, PipeTransform } from '@angular/core';
import { ThyAvatarService } from './avatar.service';

@Pipe({ name: 'avatarShortName' })
export class AvatarShortNamePipe implements PipeTransform {
    transform(name: string): string {
        if (!name) {
            return;
        }
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
        if (!name) {
            return;
        }
        const colors = [
            '#56abfb',
            '#5dcfff',
            '#84e17e',
            '#73d897',
            '#ff9f73',
            '#fa8888',
            '#fb7fb7',
            '#9a7ef4',
            '#868af6'
        ];
        const nameArray: string[] = name.split('');
        const code: number =
            name && name.length > 0
                ? nameArray.reduce(
                      function(result, item) {
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

@Pipe({ name: 'thyAvatarSrc' })
export class AvatarSrcPipe implements PipeTransform {
    constructor(private thyAvatarService: ThyAvatarService) {}
    transform(src: string, size: number) {
        return this.thyAvatarService.avatarSrcTransform(src, size);
    }
}

@Pipe({ name: 'thyAvatarName' })
export class AvatarNamePipe implements PipeTransform {
    constructor(private thyAvatarService: ThyAvatarService) {}

    transform(name: string) {
        return this.thyAvatarService.avatarNameTransform(name);
    }
}

export const AvatarPipes = [AvatarShortNamePipe, AvatarBgColorPipe, AvatarSrcPipe, AvatarNamePipe];
