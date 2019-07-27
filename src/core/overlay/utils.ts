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

export function getFlexiblePosition(placement: ThyPlacement, offset?: number): ConnectionPositionPair {
    return {
        ...POSITION_MAP[placement],
        ...(offset ? getConnectedPositionOffset(placement, offset) : null)
    };
}

export function getFallbackPlacements(placement: ThyPlacement): ThyPlacement[] {
    return connectionFallbackPositionsMap[placement] || [];
}

export function getFlexiblePositions(placement: ThyPlacement, offset?: number): ConnectionPositionPair[] {
    const fallbackPlacements = getFallbackPlacements(placement);

    return [placement, ...fallbackPlacements].map(placementName => {
        return getFlexiblePosition(placementName, offset);
    });
    // switch (placement) {
    //     case 'top':
    //         fallbackPositions = [getFlexiblePosition('bottom', offset)];
    //         break;
    //     case 'topLeft':
    //         fallbackPositions = [getFlexiblePosition('right', offset)];
    //         break;
    //     case 'right':
    //         fallbackPositions = [getFlexiblePosition('left', offset)];
    //         break;
    //     case 'bottom':
    //         fallbackPositions = [getFlexiblePosition('top', offset)];
    //         break;
    //     case 'left':
    //         fallbackPositions = [getFlexiblePosition('right', offset)];
    //         break;
    // }
    // return [getFlexiblePosition(placement, offset), ...fallbackPositions];
}

export function getPlacementByPosition(position: ConnectionPositionPair) {
    const keyList = ['originX', 'originY', 'overlayX', 'overlayY'];
    for (const placement in POSITION_MAP) {
        if (keyList.every(key => position[key] === POSITION_MAP[placement][key])) {
            return placement;
        }
    }
}

export function setPositionPanelClass(panelClassPrefix: string, positions: ConnectionPositionPair[]) {
    return positions.map((position: ConnectionPositionPair) => {
        const key = getPlacementByPosition(position);
        return { ...position, panelClass: `${panelClassPrefix}-${key}` };
    });
}

export function getConnectedPositionOffset(placement: ThyPlacement, offset: number): ConnectedPositionOffset {
    const connectedPositionOffset: ConnectedPositionOffset = {};
    if (placement.startsWith('top')) {
        connectedPositionOffset.offsetY = -offset;
    } else if (placement.startsWith('bottom')) {
        connectedPositionOffset.offsetY = offset;
    } else if (placement.startsWith('left')) {
        connectedPositionOffset.offsetX = -offset;
    } else if (placement.startsWith('right')) {
        connectedPositionOffset.offsetY = offset;
    } else {
        // do nothings
    }
    return connectedPositionOffset;
}
