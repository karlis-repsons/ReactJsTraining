import React from 'react';
import PropTypes from 'prop-types';

export default function Cross(props) {
    return (
        <svg viewBox='0 0 200 200' style={props.style}>
            <path
                style={{
                    fill: props.color, fillOpacity: 1, fillRule: 'evenodd',
                    strokeWidth: '0', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeOpacity: 1
                }}
                d='M 50.634766,14.865234 12.251953,26.378906 76.458984,97.091797 21.462891,149.58789 30.291016,184.13281 98.064453,120.88867 156.1875,184.90039 177.29688,154.19531 124.55078,96.173828 179.59961,44.802734 159.89179,20.321438 102.6543,72.087891 Z'
            />
        </svg>
    );
}

Cross.propTypes = {
    style: PropTypes.object,
    color: PropTypes.string
};