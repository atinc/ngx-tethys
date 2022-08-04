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
    canvasStyles: {
        rotate: 15,
        color: '#ccc',
        textAlign: 'center',
        textBaseline: 'middle',
        fillStyle: 'rgba(184, 184, 184, 0.8)',
        fontsize: '14px'
    },
    textLineHeight: 20,
    xSpace: 40, // x轴间隔
    ySpace: 20 // y轴间隔
};
