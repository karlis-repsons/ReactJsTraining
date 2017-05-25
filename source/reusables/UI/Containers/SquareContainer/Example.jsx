import React from 'react';

import SquareContainer from 'SquareContainer_kU7d2';

import './Example.scss';

export class SquareContainerExample extends React.Component {
    changeLetterSize(squareSideLength) {
        if (typeof squareSideLength !== 'number')
            return;
            
        this.l = squareSideLength;
        this.forceUpdate();
    }
    render() {
        return (
            <SquareContainer className='xJ425 centered'
                onResize={l => this.changeLetterSize(l)}
            >
                <span className='letter' style={{
                    fontSize: `${this.l / 2}px`,
                    lineHeight: `${this.l}px`
                }}
                >A</span>
            </SquareContainer>
        );
    }
}