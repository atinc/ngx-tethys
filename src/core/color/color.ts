export const presetThemeColors = ['primary', 'success', 'info', 'warning', 'danger', 'default', 'light'] as const;

export type ThyThemeColor = typeof presetThemeColors[number];

export function isThemeColor(color: ThyThemeColor | string): boolean {
    return presetThemeColors.includes(color as ThyThemeColor);
}
