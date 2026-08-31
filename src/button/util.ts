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
 *
 * 特殊 token 合法矩阵（无对应 class 时会约束到可用外观）：
 * - `secondary`：fill → `btn-primary btn-md`；link → `btn-link-primary-weak`；outline → `btn-outline-default`
 * - `default`：仅 outline / link（`btn-outline-default` / `btn-link-default`）；fill 回退为 outline
 * - `danger-weak`：仅 link（`btn-link-danger-weak`）；fill / outline 回退为 link
 */
export function buildButtonClassesByAppearance(color: string, appearance: ThyButtonAppearance): string[] {
    if (color === 'secondary') {
        if (appearance === 'link') {
            return ['btn-link', 'btn-link-primary-weak'];
        }
        if (appearance === 'outline') {
            return ['btn-outline-default'];
        }
        return ['btn-primary', 'btn-md'];
    }

    if (color === 'default') {
        if (appearance === 'link') {
            return ['btn-link', 'btn-link-default'];
        }
        // fill 无 .btn-default，与 outline 一样走 outline-default
        return ['btn-outline-default'];
    }

    if (color === 'danger-weak') {
        // 仅有 link 样式
        return ['btn-link', 'btn-link-danger-weak'];
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
