import React from 'react';
import PropTypes from 'prop-types';

export default function MaximizeIcon(props) {
   
   return (
      <svg viewBox='0 0 24 24'>
         <g fill={props.color} transform='scale(0.0234375 0.0234375)'>
            <path
               d='M640 170.667c-23.595 0-42.667 19.115-42.667 42.667s19.072 42.667 42.667 42.667h67.669l-140.501 140.501c-16.683 16.683-16.683 43.648 0 60.331 8.32 8.32 19.243 12.501 30.165 12.501s21.845-4.181 30.165-12.501l140.501-140.501v67.669c0 23.552 19.072 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-213.333h-213.333z' />
            <path
               d='M396.501 567.168l-140.501 140.501v-67.669c0-23.552-19.072-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v213.291h42.496c0.341 0 170.837 0.043 170.837 0.043 23.552 0 42.667-19.115 42.667-42.667s-19.072-42.667-42.667-42.667h-67.669l140.501-140.459c16.683-16.683 16.683-43.648 0-60.331s-43.648-16.725-60.331-0.043z' />
            <path
               d='M298.667 512c23.552 0 42.667-19.115 42.667-42.667v-128h128c23.595 0 42.667-19.115 42.667-42.667s-19.072-42.667-42.667-42.667h-213.291l-0.043 213.333c0 23.552 19.072 42.667 42.667 42.667z' />
            <path
               d='M725.333 512c-23.595 0-42.667 19.115-42.667 42.667v128h-128c-23.595 0-42.667 19.115-42.667 42.667s19.072 42.667 42.667 42.667h213.333v-213.333c0-23.552-19.072-42.667-42.667-42.667z' />
         </g>
      </svg>
   );
}

MaximizeIcon.propTypes = {
   color: PropTypes.string
};