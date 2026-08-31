export type ThyButtonAppearance = 'fill' | 'outline' | 'link';

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

/**
 * appearance × color → btn-* class。
 * `secondary` / `default` / `danger-weak` 无对应 class 时先约束到合法色或外观，再走统一组装。
 */
export function buildButtonClassesByAppearance(color: string, appearance: ThyButtonAppearance): string[] {
    // 历史特例：secondary fill = 中号主按钮
    if (color === 'secondary' && appearance === 'fill') {
        return ['btn-primary', 'btn-md'];
    }

    if (color === 'default' && appearance === 'fill') {
        appearance = 'outline';
    } else if (color === 'danger-weak') {
        appearance = 'link';
    } else if (color === 'secondary') {
        color = appearance === 'outline' ? 'default' : 'primary-weak';
    }

    switch (appearance) {
        case 'outline':
            return [`btn-outline-${color}`];
        case 'link':
            return !color || color === 'primary' ? ['btn-link'] : ['btn-link', `btn-link-${color}`];
        default:
            return [`btn-${color}`];
    }
}

/** 根据 type 与可选 thyAppearance 解析最终 class */
export function resolveButtonClasses(type: string, appearance?: ThyButtonAppearance): string[] {
    const parsed = parseButtonStyle(type);
    return buildButtonClassesByAppearance(parsed.color, appearance ?? parsed.appearance);
}
