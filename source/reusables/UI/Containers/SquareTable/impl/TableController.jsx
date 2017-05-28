import React from 'react';

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

        validateProps(props);
        this.state = emptyState;

        const model = new TableModel({
            Nsi, igcr, oir, innerGapReplacer, outerGapReplacer
        });
        let areaFiller = null;

        Object.assign(this, {
            resize() {
                if (!areaFiller || Nsi === 0) {
                    this.setState(emptyState);
                    return;
                }
                const newState = model.calculate(areaFiller);
                this.setState(newState);

                if (typeof this.props.onResize === 'function')
                    this.props.onResize(newState.c);
            },
            render() {
                return (
                    <TableView className={this.props.className}
                        style={this.props.style}    
                        Nsi={Nsi} L={this.state.L} c={this.state.c}
                        ig={this.state.ig} og={this.state.og}
                        tableDecorator={this.props.tableDecorator}    
                        areaFillerRefSaver={r => areaFiller = r}
                        onMounted={this.props.onMounted}
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
}

TableController.propTypes = SquareTablePropTypes;

function validateProps(p) {
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