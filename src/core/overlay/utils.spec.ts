import {
    buildConnectedPositionOffset,
    buildConnectedPositionPair,
    getFallbackPlacements,
    getFlexiblePositions,
    getPlacementByPosition
} from './utils';
import { POSITION_MAP } from './overlay-position-map';
import { ThyPlacement } from './interface';

describe(`overlay`, () => {
    const allPlacements: ThyPlacement[] = [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom'
    ];

    describe('buildConnectedPositionOffset', () => {
        it(`should get correct position offset(offsetY: -3) for placement=top and offset=3`, () => {
            const result = buildConnectedPositionOffset('top', 3);
            expect(result).toEqual({
                offsetY: -3
            });
        });

        it(`should get correct position offset(offsetY: -3) for placement=bottom and offset=3`, () => {
            const result = buildConnectedPositionOffset('bottom', 3);
            expect(result).toEqual({
                offsetY: 3
            });
        });

        it(`should get correct position offset(offsetX: -3) for placement=left and offset=3`, () => {
            const result = buildConnectedPositionOffset('left', 3);
            expect(result).toEqual({
                offsetX: -3
            });
        });

        it(`should get correct position offset(offsetX: 3) for placement=right and offset=3`, () => {
            const result = buildConnectedPositionOffset('right', 3);
            expect(result).toEqual({
                offsetX: 3
            });
        });
    });

    describe('buildConnectedPositionPair', () => {
        it(`should get correct position when placement is top,bottom,left,right... and without offset`, () => {
            allPlacements.forEach(placement => {
                const positionPair = buildConnectedPositionPair(placement);
                expect(positionPair).toEqual({
                    ...POSITION_MAP[placement]
                });
            });
        });

        it(`should get correct position when placement is top,bottom,left,right... and with offset 10`, () => {
            const offset = 10;
            allPlacements.forEach(placement => {
                const positionPair = buildConnectedPositionPair(placement, 10);
                if (placement.startsWith('top')) {
                    expect(positionPair).toEqual({
                        ...POSITION_MAP[placement],
                        offsetY: -offset
                    });
                } else if (placement.startsWith('bottom')) {
                    expect(positionPair).toEqual({
                        ...POSITION_MAP[placement],
                        offsetY: offset
                    });
                } else if (placement.startsWith('left')) {
                    expect(positionPair).toEqual({
                        ...POSITION_MAP[placement],
                        offsetX: -offset
                    });
                } else if (placement.startsWith('right')) {
                    expect(positionPair).toEqual({
                        ...POSITION_MAP[placement],
                        offsetX: offset
                    });
                }
            });
        });
    });

    describe('getFallbackPlacements', () => {
        it('should get fallback placements for top', () => {
            const fallbackPlacements = getFallbackPlacements('top');
            expect(fallbackPlacements).toEqual(['topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight']);
        });

        it('should get fallback placements for bottom', () => {
            const fallbackPlacements = getFallbackPlacements('bottom');
            expect(fallbackPlacements).toEqual(['bottomLeft', 'bottomRight', 'top', 'topLeft', 'topRight']);
        });

        it('should get fallback placements for left', () => {
            const fallbackPlacements = getFallbackPlacements('left');
            expect(fallbackPlacements).toEqual(['leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom']);
        });

        it('should get fallback placements for right', () => {
            const fallbackPlacements = getFallbackPlacements('right');
            expect(fallbackPlacements).toEqual(['rightTop', 'rightBottom', 'left', 'leftTop', 'leftBottom']);
        });
    });

    describe('getFlexiblePositions', () => {
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

        it(`should get correct positions for top placement without offset`, () => {
            const topPositions = getFlexiblePositions('top');

            const fallbackPositions = connectionFallbackPositionsMap['top'].map(placement => {
                return POSITION_MAP[placement];
            });
            expect(topPositions).toEqual([POSITION_MAP['top'], ...fallbackPositions]);
        });

        it(`should get correct positions for bottom placement without offset`, () => {
            const topPositions = getFlexiblePositions('bottom');
            const fallbackPositions = connectionFallbackPositionsMap['bottom'].map(placement => {
                return POSITION_MAP[placement];
            });
            expect(topPositions).toEqual([POSITION_MAP['bottom'], ...fallbackPositions]);
        });

        it(`should get correct positions for left placement without offset`, () => {
            const topPositions = getFlexiblePositions('left');
            const fallbackPositions = connectionFallbackPositionsMap['left'].map(placement => {
                return POSITION_MAP[placement];
            });
            expect(topPositions).toEqual([POSITION_MAP['left'], ...fallbackPositions]);
        });

        it(`should get correct positions for right placement without offset`, () => {
            const topPositions = getFlexiblePositions('right');
            const fallbackPositions = connectionFallbackPositionsMap['right'].map(placement => {
                return POSITION_MAP[placement];
            });
            expect(topPositions).toEqual([POSITION_MAP['right'], ...fallbackPositions]);
        });

        const offset = 10;

        it(`should get correct positions for top, bottom, left,right placement with offset 10`, () => {
            allPlacements.forEach(targetPlacement => {
                const topPositions = getFlexiblePositions(targetPlacement, offset);

                const fallbackPositions = connectionFallbackPositionsMap[targetPlacement].map(placement => {
                    return { ...POSITION_MAP[placement], ...buildConnectedPositionOffset(placement, offset) };
                });
                expect(topPositions).toEqual([
                    {
                        ...POSITION_MAP[targetPlacement],
                        ...buildConnectedPositionOffset(targetPlacement, 10)
                    },
                    ...fallbackPositions
                ]);
            });
        });

        it(`should get correct positions for top, bottom, left,right placement with panelClassPrefix thy-test-overlay`, () => {
            allPlacements.forEach(targetPlacement => {
                const topPositions = getFlexiblePositions(targetPlacement, undefined, 'thy-test-overlay');

                const fallbackPositions = connectionFallbackPositionsMap[targetPlacement].map(placement => {
                    return {
                        ...POSITION_MAP[placement],
                        panelClass: `thy-test-overlay-${placement}`
                    };
                });
                expect(topPositions).toEqual([
                    {
                        ...POSITION_MAP[targetPlacement],
                        panelClass: `thy-test-overlay-${targetPlacement}`
                    },
                    ...fallbackPositions
                ]);
            });
        });
    });

    describe('getPlacementByPosition', () => {
        it('should get correct placement when input top, bottom, left, right', () => {
            allPlacements.forEach(placement => {
                const result = getPlacementByPosition(POSITION_MAP[placement]);
                expect(result).toEqual(placement);
            });
        });

        it('should get correct placement when input top, bottom, left, right with offsetX', () => {
            allPlacements.forEach(placement => {
                const result = getPlacementByPosition({
                    ...POSITION_MAP[placement],
                    offsetX: 10
                });
                expect(result).toEqual(placement);
            });
        });

        it('should get correct placement when input top, bottom, left, right with offsetY', () => {
            allPlacements.forEach(placement => {
                const result = getPlacementByPosition({
                    ...POSITION_MAP[placement],
                    offsetY: 10
                });
                expect(result).toEqual(placement);
            });
        });
    });
});
