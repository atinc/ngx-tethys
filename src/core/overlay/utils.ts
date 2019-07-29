import { ThyPlacement, ConnectedPositionOffset } from './interface';
import { POSITION_MAP } from './overlay-position-map';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

const connectionFallbackPositionsMap: { [key: string]: ThyPlacement[] } = {
    top: ['topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'],
    topLeft: ['top', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'],
    topRight: ['top', 'topLeft', 'bottom', 'bottomLeft', 'bottomRight'],
    bottom: ['bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight'],
    bottomLeft: ['bottom', 'bottomRight', 'top', 'topLeft', 'topRight'],
    bottomRight: ['bottom', 'bottomLeft', 'top', 'topLeft', 'topRight'],
    left: ['leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom'],
    leftTop: ['left', 'leftBottom', 'right', 'rightTop', 'rightBottom'],
    leftBottom: ['left', 'leftTop', 'right', 'rightTop', 'rightBottom'],
    right: ['rightTop', 'rightBottom', 'left', 'leftTop', 'leftBottom'],
    rightTop: ['right', 'rightBottom', 'left', 'leftTop', 'leftBottom'],
    rightBottom: ['right', 'rightTop', 'left', 'leftTop', 'leftBottom']
};

export function buildConnectedPositionOffset(placement: ThyPlacement, offset: number): ConnectedPositionOffset {
    const connectedPositionOffset: ConnectedPositionOffset = {};
    if (placement.startsWith('top')) {
        connectedPositionOffset.offsetY = -offset;
    } else if (placement.startsWith('bottom')) {
        connectedPositionOffset.offsetY = offset;
    } else if (placement.startsWith('left')) {
        connectedPositionOffset.offsetX = -offset;
    } else if (placement.startsWith('right')) {
        connectedPositionOffset.offsetX = offset;
    } else {
        // do nothings
    }
    return connectedPositionOffset;
}

export function buildConnectedPositionPair(
    placement: ThyPlacement,
    offset?: number,
    panelClassPrefix?: string
): ConnectionPositionPair {
    const position: ConnectionPositionPair = {
        ...POSITION_MAP[placement],
        ...(offset ? buildConnectedPositionOffset(placement, offset) : null)
    };
    if (panelClassPrefix) {
        position.panelClass = `${panelClassPrefix}-${placement}`;
    }
    return position;
}

export function getFallbackPlacements(placement: ThyPlacement): ThyPlacement[] {
    return connectionFallbackPositionsMap[placement] || [];
}

/**
 * get flexible positions by placement, return placement position and it's fallback connection position
 * @example
 * getFlexiblePositions('top', 10, 'thy-overlay')
 * [{topPosition}, {topLeftPosition}, {topRightPosition}, {bottomPosition}, {bottomLeftPosition}, {bottomRightPosition},]
 * @returns [ConnectionPositionPair]
 */
export function getFlexiblePositions(
    placement: ThyPlacement,
    offset?: number,
    panelClassPrefix?: string
): ConnectionPositionPair[] {
    const fallbackPlacements = getFallbackPlacements(placement);

    return [placement, ...fallbackPlacements].map(placementName => {
        return buildConnectedPositionPair(placementName, offset, panelClassPrefix);
    });
}

export function getPlacementByPosition(position: ConnectionPositionPair) {
    const keyList = ['originX', 'originY', 'overlayX', 'overlayY'];
    for (const placement in POSITION_MAP) {
        if (keyList.every(key => position[key] === POSITION_MAP[placement][key])) {
            return placement;
        }
    }
}
