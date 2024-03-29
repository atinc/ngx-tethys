import { ThyRgba } from './rgba.class';

/**
 * http://www.w3.org/TR/css3-color/
 */
export class ThyColorsTable {
    public static transparent = new ThyRgba(0, 0, 0, 0);
    public static aliceblue = new ThyRgba(240, 248, 255, 1);
    public static antiquewhite = new ThyRgba(250, 235, 215, 1);
    public static aqua = new ThyRgba(0, 255, 255, 1);
    public static aquamarine = new ThyRgba(127, 255, 212, 1);
    public static azure = new ThyRgba(240, 255, 255, 1);
    public static beige = new ThyRgba(245, 245, 220, 1);
    public static bisque = new ThyRgba(255, 228, 196, 1);
    public static black = new ThyRgba(0, 0, 0, 1);
    public static blanchedalmond = new ThyRgba(255, 235, 205, 1);
    public static blue = new ThyRgba(0, 0, 255, 1);
    public static blueviolet = new ThyRgba(138, 43, 226, 1);
    public static brown = new ThyRgba(165, 42, 42, 1);
    public static burlywood = new ThyRgba(222, 184, 135, 1);
    public static cadetblue = new ThyRgba(95, 158, 160, 1);
    public static chartreuse = new ThyRgba(127, 255, 0, 1);
    public static chocolate = new ThyRgba(210, 105, 30, 1);
    public static coral = new ThyRgba(255, 127, 80, 1);
    public static cornflowerblue = new ThyRgba(100, 149, 237, 1);
    public static cornsilk = new ThyRgba(255, 248, 220, 1);
    public static crimson = new ThyRgba(220, 20, 60, 1);
    public static cyan = new ThyRgba(0, 255, 255, 1);
    public static darkblue = new ThyRgba(0, 0, 139, 1);
    public static darkcyan = new ThyRgba(0, 139, 139, 1);
    public static darkgoldenrod = new ThyRgba(184, 134, 11, 1);
    public static darkgray = new ThyRgba(169, 169, 169, 1);
    public static darkgreen = new ThyRgba(0, 100, 0, 1);
    public static darkgrey = ThyColorsTable.darkgray;
    public static darkkhaki = new ThyRgba(189, 183, 107, 1);
    public static darkmagenta = new ThyRgba(139, 0, 139, 1);
    public static darkolivegreen = new ThyRgba(85, 107, 47, 1);
    public static darkorange = new ThyRgba(255, 140, 0, 1);
    public static darkorchid = new ThyRgba(153, 50, 204, 1);
    public static darkred = new ThyRgba(139, 0, 0, 1);
    public static darksalmon = new ThyRgba(233, 150, 122, 1);
    public static darkseagreen = new ThyRgba(143, 188, 143, 1);
    public static darkslateblue = new ThyRgba(72, 61, 139, 1);
    public static darkslategray = new ThyRgba(47, 79, 79, 1);
    public static darkslategrey = ThyColorsTable.darkslategray;
    public static darkturquoise = new ThyRgba(0, 206, 209, 1);
    public static darkviolet = new ThyRgba(148, 0, 211, 1);
    public static deeppink = new ThyRgba(255, 20, 147, 1);
    public static deepskyblue = new ThyRgba(0, 191, 255, 1);
    public static dimgray = new ThyRgba(105, 105, 105, 1);
    public static dimgrey = ThyColorsTable.dimgray;
    public static dodgerblue = new ThyRgba(30, 144, 255, 1);
    public static firebrick = new ThyRgba(178, 34, 34, 1);
    public static floralwhite = new ThyRgba(255, 250, 240, 1);
    public static forestgreen = new ThyRgba(34, 139, 34, 1);
    public static fuchsia = new ThyRgba(255, 0, 255, 1);
    public static gainsboro = new ThyRgba(220, 220, 220, 1);
    public static ghostwhite = new ThyRgba(248, 248, 255, 1);
    public static gold = new ThyRgba(255, 215, 0, 1);
    public static goldenrod = new ThyRgba(218, 165, 32, 1);
    public static gray = new ThyRgba(128, 128, 128, 1);
    public static grey = ThyColorsTable.gray;
    public static green = new ThyRgba(0, 128, 0, 1);
    public static greenyellow = new ThyRgba(173, 255, 47, 1);
    public static honeydew = new ThyRgba(240, 255, 240, 1);
    public static hotpink = new ThyRgba(255, 105, 180, 1);
    public static indianred = new ThyRgba(205, 92, 92, 1);
    public static indigo = new ThyRgba(75, 0, 130, 1);
    public static ivory = new ThyRgba(255, 255, 240, 1);
    public static khaki = new ThyRgba(240, 230, 140, 1);
    public static lavender = new ThyRgba(230, 230, 250, 1);
    public static lavenderblush = new ThyRgba(255, 240, 245, 1);
    public static lawngreen = new ThyRgba(124, 252, 0, 1);
    public static lemonchiffon = new ThyRgba(255, 250, 205, 1);
    public static lightblue = new ThyRgba(173, 216, 230, 1);
    public static lightcoral = new ThyRgba(240, 128, 128, 1);
    public static lightcyan = new ThyRgba(224, 255, 255, 1);
    public static lightgoldenrodyellow = new ThyRgba(250, 250, 210, 1);
    public static lightgray = new ThyRgba(211, 211, 211, 1);
    public static lightgreen = new ThyRgba(144, 238, 144, 1);
    public static lightgrey = ThyColorsTable.lightgray;
    public static lightpink = new ThyRgba(255, 182, 193, 1);
    public static lightsalmon = new ThyRgba(255, 160, 122, 1);
    public static lightseagreen = new ThyRgba(32, 178, 170, 1);
    public static lightskyblue = new ThyRgba(135, 206, 250, 1);
    public static lightslategray = new ThyRgba(119, 136, 153, 1);
    public static lightslategrey = ThyColorsTable.lightslategray;
    public static lightsteelblue = new ThyRgba(176, 196, 222, 1);
    public static lightyellow = new ThyRgba(255, 255, 224, 1);
    public static lime = new ThyRgba(0, 255, 0, 1);
    public static limegreen = new ThyRgba(50, 205, 50, 1);
    public static linen = new ThyRgba(250, 240, 230, 1);
    public static magenta = new ThyRgba(255, 0, 255, 1);
    public static maroon = new ThyRgba(128, 0, 0, 1);
    public static mediumaquamarine = new ThyRgba(102, 205, 170, 1);
    public static mediumblue = new ThyRgba(0, 0, 205, 1);
    public static mediumorchid = new ThyRgba(186, 85, 211, 1);
    public static mediumpurple = new ThyRgba(147, 112, 219, 1);
    public static mediumseagreen = new ThyRgba(60, 179, 113, 1);
    public static mediumslateblue = new ThyRgba(123, 104, 238, 1);
    public static mediumspringgreen = new ThyRgba(0, 250, 154, 1);
    public static mediumturquoise = new ThyRgba(72, 209, 204, 1);
    public static mediumvioletred = new ThyRgba(199, 21, 133, 1);
    public static midnightblue = new ThyRgba(25, 25, 112, 1);
    public static mintcream = new ThyRgba(245, 255, 250, 1);
    public static mistyrose = new ThyRgba(255, 228, 225, 1);
    public static moccasin = new ThyRgba(255, 228, 181, 1);
    public static navajowhite = new ThyRgba(255, 222, 173, 1);
    public static navy = new ThyRgba(0, 0, 128, 1);
    public static oldlace = new ThyRgba(253, 245, 230, 1);
    public static olive = new ThyRgba(128, 128, 0, 1);
    public static olivedrab = new ThyRgba(107, 142, 35, 1);
    public static orange = new ThyRgba(255, 165, 0, 1);
    public static orangered = new ThyRgba(255, 69, 0, 1);
    public static orchid = new ThyRgba(218, 112, 214, 1);
    public static palegoldenrod = new ThyRgba(238, 232, 170, 1);
    public static palegreen = new ThyRgba(152, 251, 152, 1);
    public static paleturquoise = new ThyRgba(175, 238, 238, 1);
    public static palevioletred = new ThyRgba(219, 112, 147, 1);
    public static papayawhip = new ThyRgba(255, 239, 213, 1);
    public static peachpuff = new ThyRgba(255, 218, 185, 1);
    public static peru = new ThyRgba(205, 133, 63, 1);
    public static pink = new ThyRgba(255, 192, 203, 1);
    public static plum = new ThyRgba(221, 160, 221, 1);
    public static powderblue = new ThyRgba(176, 224, 230, 1);
    public static purple = new ThyRgba(128, 0, 128, 1);
    public static red = new ThyRgba(255, 0, 0, 1);
    public static rosybrown = new ThyRgba(188, 143, 143, 1);
    public static royalblue = new ThyRgba(65, 105, 225, 1);
    public static saddlebrown = new ThyRgba(139, 69, 19, 1);
    public static salmon = new ThyRgba(250, 128, 114, 1);
    public static sandybrown = new ThyRgba(244, 164, 96, 1);
    public static seagreen = new ThyRgba(46, 139, 87, 1);
    public static seashell = new ThyRgba(255, 245, 238, 1);
    public static sienna = new ThyRgba(160, 82, 45, 1);
    public static silver = new ThyRgba(192, 192, 192, 1);
    public static skyblue = new ThyRgba(135, 206, 235, 1);
    public static slateblue = new ThyRgba(106, 90, 205, 1);
    public static slategray = new ThyRgba(112, 128, 144, 1);
    public static slategrey = ThyColorsTable.slategray;
    public static snow = new ThyRgba(255, 250, 250, 1);
    public static springgreen = new ThyRgba(0, 255, 127, 1);
    public static steelblue = new ThyRgba(70, 130, 180, 1);
    public static tan = new ThyRgba(210, 180, 140, 1);
    public static teal = new ThyRgba(0, 128, 128, 1);
    public static thistle = new ThyRgba(216, 191, 216, 1);
    public static tomato = new ThyRgba(255, 99, 71, 1);
    public static turquoise = new ThyRgba(64, 224, 208, 1);
    public static violet = new ThyRgba(238, 130, 238, 1);
    public static wheat = new ThyRgba(245, 222, 179, 1);
    public static white = new ThyRgba(255, 255, 255, 1);
    public static whitesmoke = new ThyRgba(245, 245, 245, 1);
    public static yellow = new ThyRgba(255, 255, 0, 1);
    public static yellowgreen = new ThyRgba(154, 205, 50, 1);
}
