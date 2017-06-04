import React from 'react';

const defaultIgcr = 0;
const defaultOir = 1;

import TableCalculator from './TableCalculator';
import TableView from './TableView';
import { propTypes as SquareTablePropTypes } from '../SquareTable';
import validateTableProps from './PropValidation/validateTableProps'

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

        validateTableProps(props);
        this.state = emptyState;

        const calculator = new TableCalculator({
            Nsi, igcr, oir, innerGapReplacer, outerGapReplacer
        });
        let areaFiller = null;

        Object.assign(this, {
            resize() {
                if (!areaFiller || Nsi === 0) {
                    this.setState(emptyState);
                    return;
                }
                this.setState(calculator.getMeasures(areaFiller));
            },
            render() {
                return (
                    <TableView className={this.props.className}
                        style={this.props.style}
                        contentStyle={this.props.contentStyle}
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
    componentDidUpdate(previousProps, previousState) {
        if (typeof this.props.onResize === 'function'
            && areLengthsDifferent(previousState.c, this.state.c)
        )
            this.props.onResize(this.state.c);
    }
}

TableController.propTypes = SquareTablePropTypes;

function areLengthsDifferent(l1, l2) {
    return Math.abs(l1 - l2) >= Number.EPSILON;
}