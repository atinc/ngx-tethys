export const DEFAULT_WATERMARK_CONFIG = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: '0.8',
    'pointer-events': 'none',
    'z-index': 2147483647
};

export const DEFAULT_CANVAS_CONFIG = {
    rotate: 20,
    textLineHeight: 20,
    x: 0, // 水印起始位置x轴坐标
    y: 0, // 水印起始位置Y轴坐标
    xSpace: 20, // 水印x轴间隔
    ySpace: 30, // 水印y轴间隔
    fontsize: '12px', // 水印字体大小
    color: '#cfcccc',
    textAlign: 'center',
    textBaseline: 'middle'
};
