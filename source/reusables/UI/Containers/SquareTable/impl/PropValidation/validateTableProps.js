export default function validateTableProps(p) {
    if (typeof p.cellsAtSideCount != 'number'
        || p.cellsAtSideCount % 1 >= Number.EPSILON
    )
        throw Error('cellsAtSideCount must be an integer.');

    if (typeof p.innerGapToCellSideLengthRatio != 'number'
        || p.innerGapToCellSideLengthRatio < 0
    )
        throw Error('innerGapToCellSideLengthRatio must be >= 0.');

    if (typeof p.outerGapToInnerGapRatio != 'number'
        || p.outerGapToInnerGapRatio < 0
    )
        throw Error('outerGapToInnerGapRatio must be >= 0.');
}