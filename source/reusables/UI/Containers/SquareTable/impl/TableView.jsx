import React from 'react';
import PropTypes from 'prop-types';

import { Cell } from '../Cell';
import { getCellsWithSuggestedPositions } from './PropValidation/getCellsFromChildren';
import './TableView.scss';

const e = Number.EPSILON;

export default class TableView extends React.Component {
    getReplacementCells() {
        const p = this.props;
        let result = []; // eslint-disable-line prefer-const

        for (const { i, j, cell }
            of getCellsWithSuggestedPositions(p.children)
        ) {
            let resultingCellProps = { // eslint-disable-line prefer-const
                key: `${i}-${j}`,
                style: {
                    width: p.c, height: p.c,
                    left: p.og + j * (p.c + p.ig),
                    top: p.og + i * (p.c + p.ig)
                }
            };
            if (cell.props.style)
                Object.assign(resultingCellProps.style, cell.props.style);
            const filterOffPropNames = ['children', 'style'];
            const filter = `^${filterOffPropNames.join('|')}$`;
            for (const propName in cell.props)
                if (!new RegExp(filter).test(propName))
                    resultingCellProps[propName] = cell.props[propName];

            result.push(React.createElement(
                Cell, resultingCellProps, cell.props.children));
        }
        return result;
    }
    render() {
        const TableContainer = (props) => (
            // div.fill-all-area is needed to avoid overcomplicated 
            // process of getting precise element's content width and height.
            <div className={props.className} style={this.props.style}>
                <div className='fill-all-area'
                    ref={this.props.areaFillerRefSaver}
                >
                    {props.children}
                </div>
            </div>
        );

        const component_id = 'dK36L';
        const p = this.props;
        let containerClassNames = `square table container ${component_id}`;
        if (typeof p.className === 'string')
            containerClassNames += ` ${p.className}`;

        if (p.Nsi === 0 || p.L < e || p.c < e)
            return <TableContainer className={containerClassNames} />;

        let content = this.getReplacementCells(); // eslint-disable-line prefer-const
        if (p.tableDecorator) {
            content.push(p.tableDecorator({
                cellsAtSideCount: p.Nsi, tableSideLength: p.L,
                cellSideLength: p.c, innerGap: p.ig, outerGap: p.og
            }));
        }
        return (
            <TableContainer className={containerClassNames}>
                <div className='content' style={
                    Object.assign(
                        { width: this.props.L, height: this.props.L },
                        this.props.contentStyle)
                }>
                    {content}
                </div>
            </TableContainer>
        );
    }
}

TableView.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    contentStyle: PropTypes.object,
    Nsi: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    ig: PropTypes.number.isRequired,
    og: PropTypes.number.isRequired,
    tableDecorator: PropTypes.func,
    areaFillerRefSaver: PropTypes.func,
    onMounted: PropTypes.func
};