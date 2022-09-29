export const presetThemeColors = ['primary', 'success', 'info', 'warning', 'danger', 'default', 'light'] as const;

export type ThyThemeColor = typeof presetThemeColors[number];

export function isThemeColor(color: ThyThemeColor | string): boolean {
    return presetThemeColors.includes(color as ThyThemeColor);
}

export const presetTextColors = [...presetThemeColors, 'secondary', 'muted', 'desc', 'placeholder', 'white', 'body'] as const;

export type ThyTextColor = typeof presetTextColors[number];

export function isTextColor(color: ThyTextColor | string): boolean {
    return presetTextColors.includes(color as ThyTextColor);
}

export const presetBgColors = [...presetThemeColors, 'secondary', 'white'] as const;

export type ThyBgColor = typeof presetBgColors[number];

export function isBgColor(color: ThyBgColor | string): boolean {
    return presetBgColors.includes(color as ThyBgColor);
}
