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
    rotate: 15,
    textLineHeight: 20,
    xSpace: 40, // 水印x轴间隔
    ySpace: 20, // 水印y轴间隔
    fontsize: '14px', // 水印字体大小
    color: '#ccc',
    textAlign: 'center',
    textBaseline: 'middle',
    fillStyle: 'rgba(184, 184, 184, 0.8)'
};
