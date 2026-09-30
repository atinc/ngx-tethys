/** CSS class names for dialog zoom motion (Ant Design–style two-phase enter/leave). */
export const THY_DIALOG_ZOOM_CLASS_NAME_MAP = {
    enter: 'thy-dialog-zoom-enter',
    enterActive: 'thy-dialog-zoom-enter-active',
    leave: 'thy-dialog-zoom-leave',
    leaveActive: 'thy-dialog-zoom-leave-active'
} as const;

/** Keyframe names used in `animationend` filtering. */
export const THY_DIALOG_ZOOM_ANIMATION_NAME = {
    enter: 'thyDialogZoomIn',
    leave: 'thyDialogZoomOut'
} as const;
