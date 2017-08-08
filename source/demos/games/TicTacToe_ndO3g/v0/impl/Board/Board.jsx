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
    componentDidUpdate() {
        if (this.table)
            this.table.resize();    
    }
    render() {
        const p = this.props;
        let classNames = 'dY43c center';
        if (typeof p.className === 'string' && p.className.length > 0)
            classNames += ` ${p.className}`;

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
                            {cellContent(p.markings[i][j])}
                        </Cell>
                    );
                }
                content.push(<Row key={i}>{rowContent}</Row>);
            }
        }
        return (
            <SquareTable ref={r => this.table = r}
                className={classNames} style={p.style}
                cellsAtSideCount={cellsAtSideCount}
                innerGapToCellSideLengthRatio={0.04}
                outerGapToInnerGapRatio={0.333}
                innerGapReplacer={gap => gap < 3 ? 3 : gap}
                outerGapReplacer={gap => gap < 1 ? 1 : gap}
            >
                {content}
            </SquareTable>
        );
    }
}

Board.propTypes = {
    className: PropTypes.string, // for container
    style: PropTypes.object, // for container
    markings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    isGameOver: PropTypes.bool,
    onCellClick: PropTypes.func // f(i, j)
};

Board.defaultProps = {
    isGameOver: false
};

function cellContent(marking) {
    if (!marking)
        return null;

    return marking === playerX
        ? <Cross color={playerXColor} />
        : <Circle color={playerOColor} />;
}