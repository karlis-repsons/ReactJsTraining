import React from 'react';

import SquareContainer from 'SquareContainer_kU7d2';

import './Example.scss';

export class SquareContainerExample extends React.Component {
    constructor() {
        super();
        this.state = { squareSideLength: 0 };
    }
    render() {
        const mountedMessage = 'SquareContainer mounted its content square.';
        const l = this.state.squareSideLength;
        return (
            <SquareContainer className='xJ425 centered'
                onResize={l => this.setState({ squareSideLength: l })}
                onMounted={() => console.log(mountedMessage)} // eslint-disable-line no-console
            >
                <span className='letter' style={{
                    fontSize: `${l / 2}px`,
                    lineHeight: `${l}px`
                }}
                >A</span>
            </SquareContainer>
        );
    }
}