const displayName = 'SVGMapViewer_g73Kd';

import React from 'react';
import PropTypes from 'prop-types';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

import DemoBase from 'demos/share/DemoBase/DemoBase';

import Styler from './SVGMapViewerStyler';

const settings = {
   presentation: {
      ui: {
         allDemoFitsInsideAnyContainer: true,
         maxContainerButtonsOverlapRemAt: {allSides: Number.MAX_VALUE},
         demoPreferences: {
            wantsBorder: true
         }
      },
      ux: {
         animation: {
            mayAnimateContentSize: false
         }
      }
   }
};

const demoOwnProps = {
   svgElement: PropTypes.element.isRequired,
   initialSVGMarginPercent: PropTypes.number
};

const demoDefaultPropValues = {
   initialSVGMarginPercent: 10
}

export default class SVGMapViewer extends DemoBase {
   render() {
      const p = this.props;
      
      const styler = new Styler({props: p});
      const transparentColor = 'hsla(0, 0%, 0%, 0)';
      
      return (
         <div
            className='SVG map viewer g73Kd'
            style={styler.container.css}
         >
            <ReactSVGPanZoom
               width={p.widthPx}
               height={p.heightPx}
               style={styler.content.css}
               tool='pan'
               toolbarPosition='none'
               miniaturePosition='none'
               scaleFactor={1}
               SVGBackground={transparentColor}
               background={transparentColor}
               ref={r => this.viewer = r}
            >
               {p.svgElement}
            </ReactSVGPanZoom>
         </div>
      );
   }
   
   componentDidMount() {
      if (this.viewer) {
         const p = this.props;
         const vp = this.viewer.getValue();
         
         const centerSVG = ({zoomLevel}) => {
            const svgPointX = vp.SVGWidth / 2;
            const svgPointY = vp.SVGHeight / 2;
            this.viewer.setPointOnViewerCenter(
               svgPointX, svgPointY, zoomLevel);
         };
         
         const svgLengthFactor = 1 + p.initialSVGMarginPercent / 100;
         const zoomLevel = Math.min(
            vp.viewerWidth / (vp.SVGWidth * svgLengthFactor),
            vp.viewerHeight / (vp.SVGHeight * svgLengthFactor)
         );
         centerSVG({zoomLevel: Math.min(zoomLevel, 1)});
      }
   }
}

SVGMapViewer.settings = settings;
SVGMapViewer.displayName = displayName;
SVGMapViewer.propTypes = Object.assign(
   {}, DemoBase.propTypes, demoOwnProps
);
SVGMapViewer.defaultProps = Object.assign(
   {}, DemoBase.defaultProps, demoDefaultPropValues
);