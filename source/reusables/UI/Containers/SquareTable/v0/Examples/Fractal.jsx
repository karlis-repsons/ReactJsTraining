import React from 'react';
import PropTypes from 'prop-types';

import { SquareTable, Row, Cell } from 'SquareTable_zW3Ec_v0';

import './Fractal.scss';

const maxRecursionsCount = 3;

export class Fractal extends React.Component {
    resize(cellSideLength) {
        if (typeof cellSideLength !== 'number')
            return;

        this.l = cellSideLength;
        this.forceUpdate();
    }
    getNextElement() {
        if (this.props.index === maxRecursionsCount)
            return null;

        return <Fractal index={this.props.index + 1} />;
    }
    render() {
        const outerColor = 'rgb(192, 74, 35)';
        const innerColor = 'rgb(176, 198, 180)';
        let content = [];
        for (let i = 0; i < 3; i++) {
            let rowContent = [];
            for (let j = 0; j < 3; j++) {
                rowContent.push(
                    <Cell key={j}
                        style={{
                            backgroundColor: this.props.index % 2 === 0
                                ? innerColor : outerColor
                        }}
                    >
                        {this.getNextElement()}
                    </Cell>
                );
            }
            content.push(<Row key={i}>{rowContent}</Row>);
        }
        const innerContainer = (
            <SquareTable className={
                    `x34d5 center element-${this.props.index}`
                }
                cellsAtSideCount={3}
                innerGapToCellSideLengthRatio={0.4}
                outerGapToInnerGapRatio={0}
                onResize={l => this.resize(l)}
                contentStyle={{
                    backgroundColor: this.props.index % 2 === 0
                        ? outerColor : innerColor
                }}
            >
                {content}
            </SquareTable>
        );
        if (this.props.index === 0)
            return (
                <div style={this.props.style}>
                    {innerContainer}
                </div>
            );
        else
            return innerContainer;
    }
}

Fractal.propTypes = {
    style: PropTypes.object,
    index: PropTypes.number // integer
}

Fractal.defaultProps = {
    index: 0
};