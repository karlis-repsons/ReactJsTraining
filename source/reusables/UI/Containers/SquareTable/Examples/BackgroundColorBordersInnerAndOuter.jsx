import React from 'react';

import { SquareTable, Row, Cell } from 'SquareTable_zW3Ec';

import './BackgroundColorBordersInnerAndOuter.scss';

const tryHidingTable = false;
const tryHidingTimeout = 2000;

export class Example extends React.Component {
    constructor() {
        super();
        this.show = true;

        if (tryHidingTable)
            setTimeout(() => {
                this.show = false;
                this.forceUpdate();
            }, tryHidingTimeout);
    }
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
            >{title}</Cell>
        );
    }
    render() {
        if (!this.show)
            return null;
        
        // TODO: const mountedMessage = 'SquareTable mounted its cells.';
        return (
            <SquareTable className='or4Sy center'
                cellsAtSideCount={3}
                innerGapToCellSideLengthRatio={0.06}
                outerGapToInnerGapRatio={0}
                innerGapReplacer={gap => gap < 3 ? 3 : gap}
                //outerGapReplacer={gap => gap < 1 ? 1 : gap}
                onResize={l => this.resize(l)}
                //onMounted={() => console.log(mountedMessage)} // eslint-disable-line no-console
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