export const DEFAULT_WATERMARK_CONFIG = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: '0.8',
    'background-repeat': 'repeat',
    'pointer-events': 'none',
    'z-index': 2147483647,
    'background-image': ''
};

export const DEFAULT_CANVAS_CONFIG = {
    styles: {
        rotate: 15,
        textAlign: 'center',
        textBaseline: 'middle',
        color: 'rgba(51, 51, 51, 0.12)',
        fontsize: '12px'
    },
    textLineHeight: 20,
    xSpace: 200, // x轴间隔
    ySpace: 200 // y轴间隔
};
