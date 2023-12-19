import { fakeAsync } from '@angular/core/testing';
import { ThyColor } from '../helpers/color.class';

describe('thyColor class', () => {
    it('should get Color by string', fakeAsync(() => {
        const color = new ThyColor('#33333380');
        expect(color.alpha).toEqual(0.5);
        const color1 = new ThyColor('#333333');
        const color2 = new ThyColor('#333');
        expect(color1.displayValue).toEqual(color2.displayValue);

        const color3 = new ThyColor('rgba(51,51,51,0.5)');
        expect(color3.rgba.alpha).toEqual(0.5);
        expect(color3.rgba.red).toEqual(51);
        expect(color3.rgba.green).toEqual(51);
        expect(color3.rgba.blue).toEqual(51);

        const color4 = new ThyColor('hsla(10,20,30,0.5)');
        expect(color4.rgba.alpha).toEqual(0.5);
        expect(Math.round(color4.rgba.red)).toEqual(92);
        expect(Math.round(color4.rgba.green)).toEqual(66);
        expect(Math.round(color4.rgba.blue)).toEqual(61);

        const color5 = new ThyColor({ h: 0, s: 0, v: 20, alpha: 0.5 });
        expect(color5.rgba.alpha).toEqual(0.5);
        expect(color5.rgba.red).toEqual(51);
        expect(color5.rgba.green).toEqual(51);
        expect(color5.rgba.blue).toEqual(51);
    }));
    it('should setRgba', fakeAsync(() => {
        const color1 = new ThyColor().setRgba(51, 51, 51, 0.5);
        expect(color1.rgba.alpha).toEqual(0.5);
        expect(color1.rgba.red).toEqual(51);
        expect(color1.rgba.green).toEqual(51);
        expect(color1.rgba.blue).toEqual(51);
        expect(color1.hue).toEqual(0);
        expect(color1.saturation).toEqual(0);
        expect(color1.value).toEqual(20);
    }));

    it('should get hsv by rgb', fakeAsync(() => {
        const color1 = new ThyColor().rgbTohsv(37, 50, 20);
        expect(color1.h).toEqual(86);
        expect(color1.s).toEqual(60);
        expect(color1.v).toEqual(20);

        const color2 = new ThyColor().rgbTohsv(87, 50, 20);
        expect(color2.h).toEqual(27);
        expect(color2.s).toEqual(77);
        expect(color2.v).toEqual(34);

        const color3 = new ThyColor().rgbTohsv(30, 50, 80);
        expect(color3.h).toEqual(216);
        expect(color3.s).toEqual(63);
        expect(color3.v).toEqual(31);
    }));

    it('should get rgba by hsla', fakeAsync(() => {
        const color4 = new ThyColor('hsla(400,20,30,0.5)');
        expect(color4.rgba.alpha).toEqual(0.5);
        expect(Math.round(color4.rgba.red)).toEqual(92);
        expect(Math.round(color4.rgba.green)).toEqual(82);
        expect(Math.round(color4.rgba.blue)).toEqual(61);

        const color1 = new ThyColor('hsla(100,20,30,0.2)');
        expect(color1.rgba.alpha).toEqual(0.2);
        expect(Math.round(color1.rgba.red)).toEqual(71);
        expect(Math.round(color1.rgba.green)).toEqual(92);
        expect(Math.round(color1.rgba.blue)).toEqual(61);
    }));

    it('should get Rgba by hsva', fakeAsync(() => {
        const color4 = new ThyColor().hsvaToRgba(60, 80, 90, 0.5);
        expect(color4.alpha).toEqual(0.5);
        expect(Math.round(color4.red)).toEqual(230);
        expect(Math.round(color4.green)).toEqual(230);
        expect(Math.round(color4.blue)).toEqual(46);

        const color1 = new ThyColor().hsvaToRgba(120, 80, 90, 0.5);
        expect(color1.alpha).toEqual(0.5);
        expect(Math.round(color1.red)).toEqual(46);
        expect(Math.round(color1.green)).toEqual(230);
        expect(Math.round(color1.blue)).toEqual(46);

        const color2 = new ThyColor().hsvaToRgba(180, 80, 90, 0.5);
        expect(color2.alpha).toEqual(0.5);
        expect(Math.round(color2.red)).toEqual(46);
        expect(Math.round(color2.green)).toEqual(230);
        expect(Math.round(color2.blue)).toEqual(230);

        const color3 = new ThyColor().hsvaToRgba(240, 80, 90, 0.5);
        expect(color3.alpha).toEqual(0.5);
        expect(Math.round(color3.red)).toEqual(46);
        expect(Math.round(color3.green)).toEqual(46);
        expect(Math.round(color3.blue)).toEqual(230);

        const color6 = new ThyColor().hsvaToRgba(300, 80, 90, 0.5);
        expect(color6.alpha).toEqual(0.5);
        expect(Math.round(color6.red)).toEqual(230);
        expect(Math.round(color6.green)).toEqual(46);
        expect(Math.round(color6.blue)).toEqual(230);

        const color5 = new ThyColor().hsvaToRgba(360, 80, 90, 0.5);
        expect(color5.alpha).toEqual(0.5);
        expect(Math.round(color5.red)).toEqual(230);
        expect(Math.round(color5.green)).toEqual(46);
        expect(Math.round(color5.blue)).toEqual(46);
    }));

    it('should get final displayValue', fakeAsync(() => {
        const color1 = new ThyColor();
        color1.updateColor(300, 80, 90, 1, true, true, 'rgb');
        expect(color1.displayValue).toEqual('rgba(230, 46, 230, 1)');

        const color2 = new ThyColor();
        color2.updateColor(300, 80, 90, 1, true, true, 'hsl');
        expect(color2.displayValue).toEqual('hsla(300, 78%, 54%, 1)');

        const color3 = new ThyColor();
        color3.updateColor(300, 80, 90, 1, true, true, 'hsv');
        expect(color3.displayValue).toEqual('hsva(300, 80%, 90%, 1)');

        const color4 = new ThyColor();
        color4.updateColor(300, 80, 90, 1, true, false, 'rgb');
        expect(color4.displayValue).toEqual('rgb(230, 46, 230)');

        const color5 = new ThyColor();
        color5.updateColor(300, 80, 90, 1, true, false, 'hsl');
        expect(color5.displayValue).toEqual('hsl(300, 78%, 54%)');

        const color6 = new ThyColor();
        color6.updateColor(300, 80, 90, 1, true, false, 'hsv');
        expect(color6.displayValue).toEqual('hsv(300, 80%, 90%)');

        const color7 = new ThyColor();
        color7.updateColor(300, 80, 90, 1, true, false, 'hex');
        expect(color7.displayValue).toEqual('#E62EE6');
    }));

    it('should get rgba', fakeAsync(() => {
        const color1 = new ThyColor('#333');
        const rgba = color1.getRgba();
        expect(rgba.alpha).toEqual(1);
        expect(rgba.red).toEqual(51);
        expect(rgba.green).toEqual(51);
        expect(rgba.blue).toEqual(51);
    }));
});
