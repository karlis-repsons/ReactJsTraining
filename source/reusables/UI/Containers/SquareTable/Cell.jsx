/*
    Use this to group content, which should appear in Cell-s.

Notes:
    * the props not mentioned in propTypes
      will be forwared to div.cell container.
    * DO NOT use REF on cell - it will not work.
*/

import PropTypes from 'prop-types';
const propTypes = {
    className: PropTypes.string, // add class name(s) to cell container div
    children: PropTypes.any,
    style: PropTypes.object // SquareTable will add cell positioning styles to this
}

// ==========================

import React from 'react';

export class Cell extends React.Component {
    getCellContainerProps() {
        let classNames = 'cell';
        if (typeof this.props.className === 'string')
            classNames += ` ${this.props.className}`;
        const filterOffPropNames = [ 'className', 'children' ];        

        let resultingProps = {};
        resultingProps.className = classNames;
        for (const propName in this.props)
            if (filterOffPropNames.includes(propName) === false)
                resultingProps[propName] = this.props[propName];
        
        return resultingProps;
    }
    render() {
        return React.createElement('div', this.getCellContainerProps(),
            <div className='content'>
                {this.props.children}
            </div>
        );
    }
}

Cell.propTypes = propTypes;
Cell.displayName = 'Cell';