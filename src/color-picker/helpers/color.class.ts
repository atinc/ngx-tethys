import { ThyColorsTable } from './colors-table.class';
import { ThyRgba } from './rgba.class';

const hsv2hsl = function (hue: number, sat: number, val: number) {
    return [hue, (sat * val) / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue) || 0, hue / 2];
};

export class ThyColor {
    hue = 0;
    saturation = 0;
    value = 0;
    alpha = 1;
    enableAlpha = false;
    format = 'hex';
    displayValue = '#000000'; // 最终展示的值
    rgba: ThyRgba = new ThyRgba(0, 0, 0, 1);

    constructor(color?: string | { h: number; s: number; v: number; alpha: number }) {
        if (color) {
            this.stringToColor(color);
        }
    }

    private stringToColor(color: string | { h: number; s: number; v: number; alpha: number }): this {
        if (typeof color === 'string') {
            const str = color.replace(/ /g, '').toLowerCase();
            /**
             * try to find color by name in table
             */
            let rgba: ThyRgba = ThyColorsTable[str] || null;

            /**
             * hex find
             */
            if (str[0] === '#') {
                let hex = str.substr(1);
                const length = hex.length;
                let hexArray: string[] = [];

                if (length === 3) {
                    hexArray = hex.split('').map(value => value + value);
                } else if (length === 6) {
                    hexArray = hex.match(/.{2}/g);
                } else if (length === 8) {
                    const alpha = hex.substr(-2);
                    hex = hex.substr(0, length - 2);
                    this.alpha = this.roundNumber(parseInt(alpha || 'FF', 16) / 255);
                    hexArray = hex.match(/.{2}/g);
                }

                if (hexArray.length === 3) {
                    rgba = new ThyRgba(parseInt(hexArray[0], 16), parseInt(hexArray[1], 16), parseInt(hexArray[2], 16), this.alpha);
                }
            }
            const OpenParenthesis = str.indexOf('(');
            const CloseParenthesis = str.indexOf(')');
            if (OpenParenthesis !== -1 && CloseParenthesis + 1 === str.length) {
                const colorTypeName = str.substr(0, OpenParenthesis);
                const params = str.substr(OpenParenthesis + 1, CloseParenthesis - (OpenParenthesis + 1)).split(',');
                switch (colorTypeName) {
                    case 'rgba':
                        this.alpha = parseFloat(params.pop());
                    case 'rgb':
                        rgba = new ThyRgba(parseInt(params[0], 10), parseInt(params[1], 10), parseInt(params[2], 10), this.alpha);
                        break;
                    case 'hsla':
                        this.alpha = parseFloat(params.pop());
                    case 'hsl':
                        rgba = this.hslaToRgba(parseInt(params[0], 10), parseInt(params[1], 10), parseInt(params[2], 10), this.alpha);
                        break;
                    // case 'cmyk':
                    //     const cmyk = new Cmyk(
                    //         parseInt(params[0], 10),
                    //         parseInt(params[1], 10),
                    //         parseInt(params[2], 10),
                    //         parseInt(params[3], 10)
                    //     );
                    //     rgba = this.cmykToRgba(cmyk);
                    //     break;
                }
            }
            if (rgba) {
                this.rgba = new ThyRgba(rgba.red, rgba.green, rgba.blue, rgba.alpha);
                const hsv = this.rgbTohsv(rgba.red, rgba.green, rgba.blue);
                this.updateColor(hsv.h, hsv.s, hsv.v, rgba.alpha, false);
            }
        } else {
            this.updateColor(color.h, color.s, color.v, color.alpha, true);
        }
        return this;
    }

    public setRgba(red: number = null, green: number = null, blue: number = null, alpha: number = 1): this {
        if (red != null) {
            this.rgba.red = red;
        }

        if (green != null) {
            this.rgba.green = green;
        }

        if (blue != null) {
            this.rgba.blue = blue;
        }

        if (alpha != null) {
            alpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
            this.rgba.alpha = alpha;
        }

        const { h, s, v } = this.rgbTohsv(this.rgba.red, this.rgba.green, this.rgba.blue);
        this.updateColor(h, s, v, this.rgba.alpha, false);
        return this;
    }

    rgbTohsv(r: number, g: number, b: number) {
        const red = r / 255;
        const green = g / 255;
        const blue = b / 255;
        const Cmax = Math.max(red, green, blue);
        const Cmin = Math.min(red, green, blue);
        const delta = Cmax - Cmin;
        let hue = 0;
        let saturation: number = Cmax === 0 ? 0 : delta / Cmax;
        let brightness: number = Cmax;
        if (Cmax !== Cmin) {
            switch (Cmax) {
                case red:
                    hue = (green - blue) / delta + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = 2 + (blue - red) / delta;
                    break;
                case blue:
                    hue = 4 + (red - green) / delta;
                    break;
            }
            hue /= 6;
        }

        return { h: Math.round(hue * 360), s: Math.round(saturation * 100), v: Math.round(brightness * 100) };
    }

    public getRgba(): ThyRgba {
        return new ThyRgba(this.rgba.red, this.rgba.green, this.rgba.blue, this.rgba.alpha);
    }

    private hslaToRgba(h: number, s: number, l: number, a: number): ThyRgba {
        const hue = h / 360;
        const saturation = s / 100;
        const lightness = l / 100;
        const alpha = a;

        let red = lightness;
        let green = lightness;
        let blue = lightness;

        if (saturation !== 0) {
            const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
            const p = 2 * lightness - q;

            red = this.hueToRgb(p, q, hue + 1 / 3);
            green = this.hueToRgb(p, q, hue);
            blue = this.hueToRgb(p, q, hue - 1 / 3);
        }

        red = red * 255;
        green = green * 255;
        blue = blue * 255;

        return new ThyRgba(red, green, blue, alpha);
    }

    private hueToRgb(p: number, q: number, t: number): number {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }

    private roundNumber(n: number): number {
        return Math.round(n * 100) / 100;
    }

    updateColor(h: number, s: number, v: number, alpha: number, updateRgba: boolean, enableAlpha = true, format = 'hex') {
        this.hue = Math.max(0, Math.min(360, h));
        this.saturation = Math.max(0, Math.min(100, s));
        this.value = Math.max(0, Math.min(100, v));
        this.alpha = alpha;
        if (updateRgba) {
            this.rgba = this.hsvaToRgba(this.hue, Math.round(this.saturation), Math.round(this.value), this.alpha);
        }
        this.enableAlpha = enableAlpha;
        this.format = format;
        this.getFinalValue();
    }

    public toHexString(alpha: boolean = false): string {
        let hex = '#' + ((1 << 24) | (this.rgba.getRed() << 16) | (this.rgba.getGreen() << 8) | this.rgba.getBlue()).toString(16).substr(1);
        if (alpha && this.rgba.alpha !== 1) {
            hex += ((1 << 8) | Math.round(this.rgba.alpha * 255)).toString(16).substr(1);
        }
        return hex.toUpperCase();
    }

    hsvaToRgba(h: number, s: number, v: number, alpha: number) {
        let red = 1;
        let green = 0;
        let blue = 0;
        const saturation = Math.round(s) / 100;
        const brightness = Math.round(v) / 100;
        const hex = h / 60;
        const primary = Math.floor(hex);
        const secoundary = hex - primary;
        const a = (1 - saturation) * brightness;
        const b = (1 - saturation * secoundary) * brightness;
        const c = (1 - saturation * (1 - secoundary)) * brightness;

        switch (primary) {
            case 6:
            case 0:
                red = brightness;
                green = c;
                blue = a;
                break;
            case 1:
                red = b;
                green = brightness;
                blue = a;
                break;
            case 2:
                red = a;
                green = brightness;
                blue = c;
                break;
            case 3:
                red = a;
                green = b;
                blue = brightness;
                break;
            case 4:
                red = c;
                green = a;
                blue = brightness;
                break;
            case 5:
                red = brightness;
                green = a;
                blue = b;
                break;
        }

        red = red * 255;
        green = green * 255;
        blue = blue * 255;

        return new ThyRgba(Math.round(red), Math.round(green), Math.round(blue), alpha);
    }

    getFinalValue() {
        let { hue, saturation, value, alpha, format } = this;
        if (this.enableAlpha) {
            switch (format) {
                case 'hsl':
                    const hsl = hsv2hsl(hue, saturation / 100, value / 100);
                    this.displayValue = `hsla(${hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%, ${alpha})`;
                    break;
                case 'hsv':
                    this.displayValue = `hsva(${hue}, ${Math.round(saturation)}%, ${Math.round(value)}%, ${alpha})`;
                    break;
                case 'rgb':
                    this.displayValue = `rgba(${this.rgba.red}, ${this.rgba.green}, ${this.rgba.blue}, ${this.rgba.alpha})`;
                    break;
                default:
                    this.displayValue = this.toHexString(true);
            }
        } else {
            switch (format) {
                case 'hsl':
                    const hsl = hsv2hsl(hue, saturation / 100, value / 100);
                    this.displayValue = `hsl(${hue}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`;
                    break;
                case 'hsv':
                    this.displayValue = `hsv(${hue}, ${Math.round(saturation)}%, ${Math.round(value)}%)`;
                    break;
                case 'rgb':
                    this.displayValue = `rgb(${this.rgba.red}, ${this.rgba.green}, ${this.rgba.blue})`;
                    break;
                default:
                    this.displayValue = this.toHexString();
            }
        }
    }
}
