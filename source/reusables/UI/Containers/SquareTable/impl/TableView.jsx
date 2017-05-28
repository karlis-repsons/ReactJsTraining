import React from 'react';
import PropTypes from 'prop-types';

import { Row } from '../Row';
import { Cell } from '../Cell';
import './TableView.scss';

const e = Number.EPSILON;

export default class TableView extends React.Component {
    constructor() {
        super();
        this.isCellMounted = false;
        this.onCellRefChange = function (ref) {
            if (!this.isCellMounted && this.props.onMounted && ref)
                this.props.onMounted();
            this.isCellMounted = true;
        }.bind(this);
    }
    componentWillUnmount() {
        this.isCellMounted = false
        // TODO:    
        // another div.cell ref call can follow before re-mount.
        // this.onCellRefChange is always called with null refs.    
        ;
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

        const content = [];
        let i = 0, j = 0;
        React.Children.forEach(p.children, row => {
            if (row.type !== Row)
                return;

            j = 0;
            React.Children.forEach(row.props.children, cell => {
                if (cell.type !== Cell)
                    return;

                let resultingCellProps = { // eslint-disable-line prefer-const
                    key: `${i}-${j}`,
                    style: {
                        width: p.c, height: p.c,
                        left: p.og + j * (p.c + p.ig),
                        top: p.og + i * (p.c + p.ig)
                    }
                };
                if (typeof cell.props.className === 'string')
                    resultingCellProps.className = cell.props.className;
                if (typeof cell.props.style === 'object')
                    Object.assign(resultingCellProps.style, cell.props.style);
                if (this.props.onMounted && i === 0 && j === 0)
                    resultingCellProps.ref = this.onCellRefChange;

                content.push(React.createElement(
                    Cell, resultingCellProps, cell.props.children));
                j++;
            });
            i++;
        });
        if (p.tableDecorator) {
            content.push(p.tableDecorator({
                cellsAtSideCount: p.Nsi, tableSideLength: p.L,
                cellSideLength: p.c, innerGap: p.ig, outerGap: p.og
            }));
        }
        return (
            <TableContainer className={containerClassNames}>
                <div className='content' style={{
                    width: this.props.L, height: this.props.L
                }}>
                    {content}
                </div>
            </TableContainer>
        );
    }
}

TableView.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    Nsi: PropTypes.number.isRequired,
    L: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    ig: PropTypes.number.isRequired,
    og: PropTypes.number.isRequired,
    tableDecorator: PropTypes.func,
    areaFillerRefSaver: PropTypes.func,
    onMounted: PropTypes.func
};