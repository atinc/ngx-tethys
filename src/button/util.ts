export type ThyButtonColor = 'primary' | 'info' | 'warning' | 'danger' | 'success' | 'default' | 'secondary';

export type ThyButtonAppearance = 'fill' | 'outline' | 'link';

export type ThyButtonGroupAppearance = Exclude<ThyButtonAppearance, 'link'>;


/** 兼容：outline-primary → { primary, outline }；link-danger → { danger, link } */
export function parseButtonType(value: string): {
    color: string;
    appearance: ThyButtonAppearance;
} {
    if (value === 'link') {
        return { color: 'primary', appearance: 'link' };
    }
    const match = value.match(/^(outline|link)-(.+)$/);
    if (match) {
        return { appearance: match[1] as ThyButtonAppearance, color: match[2] };
    }
    return { color: value, appearance: 'fill' };
}

/** 兼容：outline-primary → { primary, outline }；primary → { primary, fill } */
export function parseButtonGroupType(value: string): {
    color: string;
    appearance: ThyButtonAppearance;
} {
    if (value.startsWith('outline-')) {
        return { appearance: 'outline', color: value.slice('outline-'.length) };
    }
    return { color: value, appearance: 'fill' };
}

const buttonClassBuilders: Record<ThyButtonAppearance, (color: string) => string[]> = {
    fill: color => (color === 'secondary' ? ['btn-primary', 'btn-md'] : [`btn-${color}`]),
    outline: color => [`btn-outline-${color}`],
    link: color => {
        if (!color || color === 'primary') {
            return ['btn-link'];
        }
        if (color === 'secondary') {
            return ['btn-link', 'btn-link-primary-weak'];
        }
        return ['btn-link', `btn-link-${color}`];
    }
};

/** appearance × color → btn-* class */
export function resolveButtonClasses(color: string, appearance: ThyButtonAppearance): string[] {
    return buttonClassBuilders[appearance](color);
}

/** appearance × color → btn-group-* class */
export function resolveButtonGroupClass(color: string, appearance: ThyButtonGroupAppearance): string {
    return appearance === 'outline' ? `btn-group-outline-${color}` : `btn-group-${color}`;
}
