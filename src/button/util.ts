import type { ThyButtonAppearance } from './button.component';

/** 从 thyButton/thyType 组合值解析 color × appearance */
export function parseButtonStyle(value: string): { color: string; appearance: ThyButtonAppearance } {
    if (value === 'link') {
        return { color: 'primary', appearance: 'link' };
    }
    const match = value.match(/^(outline|link)-(.+)$/);
    if (match) {
        return { appearance: match[1] as ThyButtonAppearance, color: match[2] };
    }
    return { color: value, appearance: 'fill' };
}

/** appearance × color → btn-* class */
export function buildButtonClassesByAppearance(color: string, appearance: ThyButtonAppearance): string[] {
    switch (appearance) {
        case 'outline':
            return [`btn-outline-${color}`];
        case 'link':
            return !color || color === 'primary'
                ? ['btn-link']
                : ['btn-link', color === 'secondary' ? 'btn-link-primary-weak' : `btn-link-${color}`];
        default:
            return color === 'secondary' ? ['btn-primary', 'btn-md'] : [`btn-${color}`];
    }
}

/** 根据 type 与可选 thyAppearance 解析最终 class */
export function resolveButtonClasses(type: string, appearance?: ThyButtonAppearance): string[] {
    const parsed = parseButtonStyle(type);
    return buildButtonClassesByAppearance(parsed.color, appearance ?? parsed.appearance);
}
