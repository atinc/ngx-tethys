export type ThyButtonAppearance = 'fill' | 'outline' | 'link';

/**
 * 特殊 color × appearance 映射（对齐旧 btnTypeClassesMap 中无法由规则推导的项）。
 * - secondary fill → 中号主按钮
 * - secondary / default / danger-weak 在无对应 class 的外观下回退到合法组合
 */
const specialButtonClassesMap: Record<string, Partial<Record<ThyButtonAppearance, string[]>>> = {
    secondary: {
        fill: ['btn-primary', 'btn-md'],
        outline: ['btn-outline-default'],
        link: ['btn-link', 'btn-link-primary-weak']
    },
    default: {
        fill: ['btn-outline-default'],
        outline: ['btn-outline-default'],
        link: ['btn-link', 'btn-link-default']
    },
    'danger-weak': {
        fill: ['btn-link', 'btn-link-danger-weak'],
        outline: ['btn-link', 'btn-link-danger-weak'],
        link: ['btn-link', 'btn-link-danger-weak']
    }
};

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
    const special = specialButtonClassesMap[color]?.[appearance];
    if (special) {
        return [...special];
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
