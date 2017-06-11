import React from 'react';
import PropTypes from 'prop-types';

import './DemoContainer.scss';

export default function DemoContainer(props) {
    return (
        <div className='demo container hy3h4'>
            <div className='fill-all-area'>
                {props.children}
            </div>
        </div>
    );
}

DemoContainer.propTypes = {
    children: PropTypes.node
};