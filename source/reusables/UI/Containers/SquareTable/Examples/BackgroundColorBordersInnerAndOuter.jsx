import React from 'react';

import { SquareTable, Row, Cell } from 'SquareTable_zW3Ec';

import './BackgroundColorBordersInnerAndOuter.scss';

export class Example extends React.Component {
    resize(cellSideLength) {
        if (typeof cellSideLength !== 'number')
            return;

        this.l = cellSideLength;
        this.forceUpdate();
    }
    cell(title) {
        return (
            <Cell style={{
                fontSize: `${this.l * 0.30}px`,
                lineHeight: `${this.l * 0.6}px`
            }}
                onClick={() => console.log(`Clicked cell ${title}.`)} // eslint-disable-line no-console
            >{title}</Cell>
        );
    }
    render() {
        return (
            <SquareTable className='or4Sy center'
                cellsAtSideCount={3}
                innerGapToCellSideLengthRatio={0.06}
                outerGapToInnerGapRatio={0.2}
                innerGapReplacer={gap => gap < 3 ? 3 : gap}
                outerGapReplacer={gap => gap < 1 ? 1 : gap}
                onResize={l => this.resize(l)}
            >
                <Row>
                    {this.cell('1-1')} {this.cell('1-2')} {this.cell('1-3')}
                </Row>
                <Row>
                    {this.cell('2-1')} {this.cell('2-2')} {this.cell('2-3')}
                </Row>
                <Row>
                    {this.cell('3-1')} {this.cell('3-2')} {this.cell('3-3')}
                </Row>
            </SquareTable>
        );
    }
}