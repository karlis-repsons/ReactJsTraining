import React from 'react';
import PropTypes from 'prop-types';

import { SquareTable, Row, Cell } from 'reusables/all/SquareTable_zW3Ec_v0';
import Cross from './MarkingVisuals/Cross';
import Circle from './MarkingVisuals/Circle';
import {
    cellsAtSideCount, playerX, playerXColor, playerOColor
} from '../constants';
import './Board.scss';

export default class Board extends React.Component {
    render() {
        const p = this.props;
        let classNames = 'dY43c center';
        if (typeof p.className === 'string' && p.className.length > 0)
            classNames += ` ${p.className}`;
        const squareTableProps = {
            widthPx: p.boardSideLength,
            heightPx: p.boardSideLength,
            className: classNames, style: p.style,
            cellsAtSideCount: cellsAtSideCount,
            innerGapToCellSideLengthRatio: 0.04,
            outerGapToInnerGapRatio: 0.333,
            innerGapReplacer: gap => gap < 3 ? 3 : gap,
            outerGapReplacer: gap => gap < 1 ? 1 : gap
        };
        const stMea = SquareTable.calculateMeasures(squareTableProps);

        let content = [];
        if (p.markings) { // Babel fails without these braces
            for (let i = 0; i < cellsAtSideCount; i++) {
                let rowContent = [];
                for (let j = 0; j < cellsAtSideCount; j++) {
                    let cellClassNames = 'J30fs';
                    if (!p.markings[i][j] && !p.isGameOver)
                        cellClassNames += ' vacant';

                    rowContent.push(
                        <Cell className={cellClassNames} key={j}
                            onClick={p.onCellClick
                                ? () => p.onCellClick(i, j)
                                : null
                            }
                        >
                            {cellContent(
                                p.markings[i][j], stMea.cellSideLengthPx
                            )}
                        </Cell>
                    );
                }
                content.push(<Row key={i}>{rowContent}</Row>);
            }
        }
        return React.createElement(
            SquareTable, squareTableProps, content);
    }
}

Board.propTypes = {
    className: PropTypes.string, // for container
    style: PropTypes.object, // for container
    boardSideLength: PropTypes.number.isRequired,
    markings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    isGameOver: PropTypes.bool,
    onCellClick: PropTypes.func // f(i, j)
};

Board.defaultProps = {
    isGameOver: false
};

function cellContent(marking, cellSideLengthPx) {
    if (!marking)
        return null;

    const style = {
        width: `${cellSideLengthPx}px`,
        height: `${cellSideLengthPx}px`
    };

    return marking === playerX
        ? <Cross color={playerXColor} style={style} />
        : <Circle color={playerOColor} style={style} />;
}