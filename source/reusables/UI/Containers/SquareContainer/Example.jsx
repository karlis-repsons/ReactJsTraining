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
        const mountedMessage = 'SquareContainer mounted its content square.';
        return (
            <SquareContainer className='xJ425 centered'
                onResize={l => this.changeLetterSize(l)}
                onMounted={() => console.log(mountedMessage)} // eslint-disable-line no-console
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