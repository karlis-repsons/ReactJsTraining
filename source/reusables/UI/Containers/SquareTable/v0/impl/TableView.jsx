import React from 'react';
import PropTypes from 'prop-types';

import { Cell } from '../Cell';
import { getCellsWithSuggestedPositions } from './PropValidation/getCellsFromChildren';
import './TableView.scss';

export default class TableView extends React.Component {
    getReplacementCells() {
        const p = this.props;
        let result = [];

        for (const { i, j, cell }
            of getCellsWithSuggestedPositions(p.children)
        ) {
            let resultingCellProps = {
                key: `${i}-${j}`,
                style: {
                    width: `${p.c}px`,
                    height: `${p.c}px`,
                    left: `${p.og + j * (p.c + p.ig)}px`,
                    top: `${p.og + i * (p.c + p.ig)}px`
                }
            };
            if (cell.props.style)
                Object.assign(resultingCellProps.style, cell.props.style);
            const filterOffPropNames = ['children', 'style'];
            for (const propName in cell.props)
                if (filterOffPropNames.includes(propName) === false)
                    resultingCellProps[propName] = cell.props[propName];

            result.push(React.createElement(
                Cell, resultingCellProps, cell.props.children));
        }
        return result;
    }
    render() {
        const component_id = 'dK36L';
        const p = this.props;
        
        let containerClassNames = `square table container ${component_id}`;
        if (typeof p.className === 'string')
            containerClassNames += ` ${p.className}`;

        const containerStyle = Object.assign({}, p.style, {
            width: `${p.widthPx}px`,
            height: `${p.heightPx}px`
        });
        
        let content = this.getReplacementCells();
        if (p.tableDecorator) {
            content.push(p.tableDecorator({
                cellsAtSideCount: p.Nsi, tableSideLength: p.L,
                cellSideLength: p.c, innerGap: p.ig, outerGap: p.og
            }));
        }
        return (
            <div className={containerClassNames} style={containerStyle}>
                <div className='content'
                    style={Object.assign(
                        { width: this.props.L, height: this.props.L },
                        this.props.contentStyle)}
                >
                    {content}
                </div>
            </div>
        );
    }
}

TableView.propTypes = {
    widthPx: PropTypes.number.isRequired,
    heightPx: PropTypes.number.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    contentStyle: PropTypes.object,
    Nsi: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    ig: PropTypes.number.isRequired,
    og: PropTypes.number.isRequired,
    tableDecorator: PropTypes.func
   // children: childrenOnlyOfType(Row) - checked before
};