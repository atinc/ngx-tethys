export interface ThemeInterface {
    key: string;
    name?: string;
}

export enum ThemeKeysConstant {
    // 'bright-black',
    'bright-purple' = 'bright-purple',
    'bright-yellow' = 'bright-yellow',
    'brown-black' = 'brown-black',
    'default' = 'default',
    'olivine' = 'olivine',
    'purple' = 'purple',
    'qq-blue' = 'qq-blue',
    'sky-blue' = 'sky-blue',
    'pink' = 'pink'
    // 'watermelon',
}

export const ThemesConstant = [
    // { key: ThemeKeysConstant['bright-black'], name: '' },
    { key: ThemeKeysConstant['default'], name: '碧波万顷', color: '#22d7bb' },
    { key: ThemeKeysConstant['brown-black'], name: '千岩竞秀', color: '#484848' },
    { key: ThemeKeysConstant['sky-blue'], name: '紫气东来', color: '#6f76fa' },
    { key: ThemeKeysConstant['purple'], name: '水墨丹青', color: '#48525c' },
    { key: ThemeKeysConstant['olivine'], name: '郁郁葱葱', color: '#66c060' },
    { key: ThemeKeysConstant['bright-yellow'], name: '午后暖阳', color: '#febc20' },
    { key: ThemeKeysConstant['qq-blue'], name: '湖光山色', color: '#2dbcff' },
    { key: ThemeKeysConstant['bright-purple'], name: '青出于蓝', color: '#4e8afa' },
    { key: ThemeKeysConstant['pink'], name: '人间烟火', color: '#f7a3b7' },
    // { key: ThemeKeysConstant['watermelon'], name: '' },
];
