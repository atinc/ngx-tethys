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
    degree: 15,
    color: 'rgba(51, 51, 51, 0.12)',
    fontSize: 12,
    textLineHeight: 20,
    distributeType: 'less' //分布类型： more密集 less松散
};

export const distributeTypeObj = {
    more: [5, 5],
    less: [250, 200]
};
