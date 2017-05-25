import React from 'react';
import ReactDOM from 'react-dom';

const defaultIgcr = 0;
const defaultOir = 1;

import TableModel from './TableModel';
import TableView from './TableView';
import { propTypes as SquareTablePropTypes } from '../SquareTable';

const emptyState = { L: 0, c: 0, ig: 0, og: 0 };

export default class TableController extends React.Component {
    constructor(props) {
        super(props);
        const {
            cellsAtSideCount: Nsi,
            innerGapToCellSideLengthRatio: igcr = defaultIgcr,
            outerGapToInnerGapRatio: oir = defaultOir,
            innerGapReplacer,
            outerGapReplacer,
        } = props;

        this.validateProps();
        this.state = emptyState;

        const model = new TableModel({
            Nsi, igcr, oir, innerGapReplacer, outerGapReplacer
        });

        Object.assign(this, {
            resize() {
                const containerSizedDomNode
                    = ReactDOM.findDOMNode(this.areaFiller); // eslint-disable-line react/no-find-dom-node
                if (typeof containerSizedDomNode !== 'object' || Nsi === 0) {
                    this.setState(emptyState);
                    return;
                }

                const newState = model.calculate(containerSizedDomNode);
                this.setState(newState);

                if (typeof this.props.onResize === 'function')
                    this.props.onResize(newState.c);
            },
            render() {
                return (
                    // this.areaFiller should be private
                    <TableView Nsi={Nsi} L={this.state.L} c={this.state.c}
                        ig={this.state.ig} og={this.state.og}
                        tableDecorator={this.props.tableDecorator}
                        className={this.props.className}
                        areaFillerRefSaver={ref => this.areaFiller = ref}
                    >
                        {this.props.children}
                    </TableView>
                );
            }
        });
    }
    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize.bind(this));
    }
    validateProps() {
        const p = this.props;
        
        if (typeof p.cellsAtSideCount != 'number'
            || p.cellsAtSideCount % 1 >= Number.EPSILON
        )
            throw Error('cellsAtSideCount must be an integer.');

        if (typeof p.innerGapToCellSideLengthRatio != 'number'
            || p.innerGapToCellSideLengthRatio < 0
        )
            throw Error('innerGapToCellSideLengthRatio must be >= 0.');

        if (typeof p.outerGapToInnerGapRatio != 'number'
            || p.outerGapToInnerGapRatio < 0
        )
            throw Error('outerGapToInnerGapRatio must be >= 0.');
    }
}

TableController.propTypes = SquareTablePropTypes;