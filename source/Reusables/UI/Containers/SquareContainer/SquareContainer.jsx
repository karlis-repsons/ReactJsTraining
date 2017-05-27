/*
Usage:
    0. import SquareContainer from SquareContainer_kU7d2.
    1. <SquareContainer ...> ... </SquareContainer>
    2. you control size of square container (or you will not see it),
       container fits div.content inside the given size.
    3. add your own styling.

Pre-defined container class names:
    centered - to center content square both vertically and horizontally.

SquareContainer
    .resize()

Notes:
    * This component first mounts its container, measures it and
      only then it mounts contents and attempts to call onMounted.
    * SquareContainerExample component is also exported.
*/

import PropTypes from 'prop-types';
const propTypes = {
    className: PropTypes.string, // add class names to container div as 'name1 name2'
    children: PropTypes.node,
    onMounted: PropTypes.func, // called when content square is mounted in the DOM
    onResize: PropTypes.func // f(newContentSideLength)
};

// ==========================

import React from 'react';

import './SquareContainer.scss';

export default class SquareContainer extends React.Component {
    constructor() {
        super();
        this.state = { sideLength: 0 };

        let isMounted = false;
        let areaFiller = null;
        Object.assign(this, {
            resize() {
                if (areaFiller) {
                    const rect = areaFiller.getBoundingClientRect();
                    const newSideLength = Math.min(rect.width, rect.height);
                    this.setState({ sideLength: newSideLength });
                    if (typeof this.props.onResize === 'function')
                        this.props.onResize(newSideLength);
                }
            },
            componentDidMount() {
                this.resize();
                window.addEventListener('resize', this.resize.bind(this));
            },
            componentWillUnmount() {
                isMounted = false
                // now, can another div.content ref call follow before re-mount?
                ; 
                window.removeEventListener('resize', this.resize.bind(this));
            },
            render() {
                const L = this.state.sideLength;
                let content = null;
                if (L >= Number.EPSILON)
                    content =
                        <div className='content'
                            ref={() => {
                                if (!isMounted && this.props.onMounted)
                                    this.props.onMounted();
                                isMounted = true;
                            }}
                            style={{ width: `${L}px`, height: `${L}px` }}
                        >
                            {this.props.children}
                        </div>;

                return (
                    // div.fill-all-area is needed to avoid overcomplicated 
                    // process to get precise element's content dimensions.
                    <div className={'square container kU7d2 '
                        + `${this.props.className}`}
                    >
                        <div className='fill-all-area'
                            ref={r => areaFiller = r}
                        >
                            {content}
                        </div>
                    </div>
                );
            }
        });
    }
}

export { SquareContainer };
export { SquareContainerExample } from './Example';

SquareContainer.propTypes = propTypes;

// improve:
//          * get precise container DOM element's content size -
//            without margin, padding etc. WITHOUT using div.fill-all-area
//            inside of container.