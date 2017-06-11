import React from 'react';
import PropTypes from 'prop-types';

import './MovesList.scss';

export default function MovesList(props) {
    if (props.isVisible === false)
        return null;
    
    const columnCount = Math.ceil(props.previousMoves.length / 5);
    return (
        <ol className={`${props.className} cU43g`}
            style={{
                columnCount: columnCount,
                WebkitColumnCount: columnCount,
                MozColumnCount: columnCount
            }}
        >{
            props.previousMoves.map((move, index) => {
                const title = `by ${move.player}: `
                    + `(${move.position[0]+1}, ${move.position[1]+1})`;
                
                let liContent;    
                if (props.currentMoveIndex === index)
                    liContent = <span>{title}</span>;
                else
                    liContent = (
                        <a href='#' onClick={() => props.onClickAtMove(index)}>
                            {title}
                        </a>
                    );
                return <li key={index}>{liContent}</li>;
            })
        }</ol>
    );

}

MovesList.propTypes = {
    className: PropTypes.string, // for container
    isVisible: PropTypes.bool,
    previousMoves: PropTypes.arrayOf(PropTypes.any), // [{player, position[2]}]
    currentMoveIndex: PropTypes.number,
    onClickAtMove: PropTypes.func // f(index)
};