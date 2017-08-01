/*
Usage:
    0. import SquareContainer from SquareContainer_kU7d2_v0.
    1. <SquareContainer ...> ... </SquareContainer>
    2. you control size of square container (or you will not see it),
       container fits div.content to the given size.
    3. add your own styling.

Pre-defined container class names:
    centered - to center content square both vertically and horizontally.

SquareContainer
    .resize() - you might need to call this if you do not
                provide widthPx and heightPx prop values.

Notes:
    * When you did not provide widthPx and heightPx prop values:
      this component first mounts its container, measures it and
      only then it mounts contents and attempts to call onMounted.
    * SquareContainerExample component is also exported.
*/

import PropTypes from 'prop-types';

const propTypes = {
   className: PropTypes.string, // add class names to container div
   style: PropTypes.object,
   widthPx: PropTypes.number,
   heightPx: PropTypes.number,
   children: PropTypes.node,
   onMounted: PropTypes.func, // called when content square is mounted
   onResizeCompleted: PropTypes.func // f(newContentSideLengthPx: number)
};

// ==========================

import React from 'react';

import lengthsDiffer from 'areNumbersDifferent_tSbVE_v0';
import './SquareContainer.scss';

export default class SquareContainer extends React.Component {
   constructor(props) {
      super(props);
      const getPropsMeasureParameters = (props) => {
         let shouldMeasureSelf = (
            typeof props.widthPx !== 'number'
            || typeof props.heightPx !== 'number');
         
         return {
            shouldMeasureSelf,
            propsSideLengthPx: shouldMeasureSelf ?
               undefined : Math.min(props.widthPx, props.heightPx)
         };
      };
      let shouldMeasureSelf = true;
      {
         const pmp = getPropsMeasureParameters(props);
         shouldMeasureSelf = pmp.shouldMeasureSelf;
         this.state = {sideLengthPx: pmp.propsSideLengthPx || 0};
      }
      let isMounted = false;
      let areaFiller = null;
      const setAreaFillerRef = r => { areaFiller = r; };
      const onContentRefChange = ref => {
         if (!isMounted && ref && this.props.onMounted)
            this.props.onMounted();
         isMounted = ref !== null;
      };
      
      Object.assign(this, {
         resize() {
            if (areaFiller) {
               const rect = areaFiller.getBoundingClientRect();
               const newSideLengthPx = Math.min(rect.width, rect.height);
               if (lengthsDiffer(
                     newSideLengthPx, this.state.sideLengthPx)
               )
                  this.setState({sideLengthPx: newSideLengthPx});
            }
         }
      });
      this.resize = this.resize.bind(this);
      
      Object.assign(this, {
         componentDidMount() {
            if (!shouldMeasureSelf)
               return;
            this.resize();
            window.addEventListener('resize', this.resize);
         },
         componentWillUnmount() {
            if (!shouldMeasureSelf)
               return;
            window.removeEventListener('resize', this.resize);
         },
         componentWillReceiveProps(nextProps) {
            const pmp = getPropsMeasureParameters(nextProps);
            if (shouldMeasureSelf !== pmp.shouldMeasureSelf) {
               if (!pmp.shouldMeasureSelf)
                  window.removeEventListener('resize', this.resize);
               else
                  window.addEventListener('resize', this.resize);
               shouldMeasureSelf = pmp.shouldMeasureSelf;
            }
            if (pmp.shouldMeasureSelf === false && lengthsDiffer(
                  pmp.propsSideLengthPx, this.state.sideLengthPx)
            )
               this.setState({sideLengthPx: pmp.propsSideLengthPx});
         },
         componentDidUpdate(previousProps, previousState) {
            if (this.props.onResizeCompleted
                && lengthsDiffer(
                  this.state.sideLengthPx, previousState.sideLengthPx)
            )
               this.props.onResizeCompleted(this.state.sideLengthPx);
         },
         render() {
            const classNames = 'square container kU7d2 '
                               + `${this.props.className}`;
            const L = this.state.sideLengthPx;
            let content = null;
            if (L >= Number.EPSILON)
               content =
                  <div className='content'
                       ref={onContentRefChange}
                       style={{width: `${L}px`, height: `${L}px`}}
                  >
                     {this.props.children}
                  </div>;
            
            return (
               // div.fill-all-area is needed to avoid overcomplicated
               // process to get precise element's content dimensions.
               <div className={classNames} style={this.props.style}>
                  <div className='fill-all-area' ref={setAreaFillerRef}>
                     {content}
                  </div>
               </div>
            );
         }
      });
   }
}

export {SquareContainer};
export {SquareContainerExample} from './Example';

SquareContainer.propTypes = propTypes;

// improve:
//    * get precise container DOM element's content size -
//      without margin, padding etc. WITHOUT using div.fill-all-area
//      inside of container.
//    ? pass extra props to container div.