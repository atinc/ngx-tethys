import type { ThyButtonAppearance } from './button.component';

/** 从 thyButton/thyType 取值中解析颜色，供 thyAppearance 组合使用 */
export function getButtonColor(value: string): string {
    if (value === 'link') {
        return 'primary';
    }
    const match = value.match(/^(outline|link)-(.+)$/);
    if (match) {
        return match[2];
    }
    return value;
}

/** thyAppearance × color → btn-* class */
export function buildButtonClassesByAppearance(color: string, appearance: ThyButtonAppearance): string[] {
    if (appearance === 'fill' && color === 'secondary') {
        return ['btn-primary', 'btn-md'];
    }
    if (appearance === 'outline') {
        return [`btn-outline-${color}`];
    }
    if (appearance === 'link') {
        if (!color || color === 'primary') {
            return ['btn-link'];
        }
        if (color === 'secondary') {
            return ['btn-link', 'btn-link-primary-weak'];
        }
        return ['btn-link', `btn-link-${color}`];
    }
    return [`btn-${color}`];
}
