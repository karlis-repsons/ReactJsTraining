/*
    Use this to group content, which should appear in Cell-s.
*/

import PropTypes from 'prop-types';
const propTypes = {
    className: PropTypes.string, // add class name(s) to cell container div
    children: PropTypes.any,
    style: PropTypes.object
}

// ==========================

import React from 'react';

export function Cell(props) {
    let classNames = 'cell';
    if (typeof props.className === 'string')
        classNames += ` ${props.className}`;
    
    return (
        <div className={classNames} style={props.style}>
            <div className='content'>
                {props.children}
            </div>
        </div>
    );
}

Cell.propTypes = propTypes;