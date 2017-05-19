/*
Usage:
    (A) to have always centered square:
        <SquareContainer className='centered'>
            <YourChildNodesHere />
        </SquareContainer> 

    (B) to have square with custom alignment:
        1. add something like this:
            <SquareContainer>
                <YourChildNodesHere />
            </SquareContainer>
        2. add your styles to container and content div-s to align square.

Props:
    className (optional) - add your class names to container div as 'name1 name2'.
*/

import React from 'react';
import PropTypes from 'prop-types';

import './SquareContainer.scss';

const epsilon = typeof Number.EPSILON === 'number' ? Number.EPSILON : 1e-12;

export default class SquareContainer extends React.Component {
    constructor() {
        super();
        this.state = { sideLength: 0 };
    }
    resize() {
        if (this.domNode) {
            const rect = this.domNode.getBoundingClientRect();
            this.setState({ sideLength: Math.min(rect.width, rect.height) });
        }
    }
    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize.bind(this));
    }
    render() {
        const L = this.state.sideLength;
        let content = null;
        if (L >= epsilon)
            content =
                <div className='content'
                    style={{ width: `${L}px`, height: `${L}px` }}
                >
                    {this.props.children}
                </div>;
        
        return (
            <div className={`square container kU7d2 ${this.props.className}`}
                ref={ref => this.domNode = ref}    
            >
                {content}
            </div>);
    }
}

SquareContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};