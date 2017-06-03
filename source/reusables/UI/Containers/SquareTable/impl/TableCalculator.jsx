export default class TableModel {
    constructor(parameters
        /*{Nsi, igcr, oir,
        innerGapReplacer,
        outerGapReplacer }*/
    ) {
        Object.assign(this, parameters);
    }
    getMeasures(containerSizedDomNode) {
        if (!containerSizedDomNode || this.Nsi === 0)
            throw Error('Cannot calculate measures '
                + `(Nsi = ${this.Nsi}, `
                + `tableContainerDomNode = ${containerSizedDomNode}).`);

        // find info in: math variables explained.txt
        const rect = containerSizedDomNode.getBoundingClientRect(); // would include margin etc.
        const L = Math.min(rect.width, rect.height);
        let c = L / (this.Nsi + this.igcr * (this.Nsi - 1 + 2 * this.oir));
        const ig = c * this.igcr;
        const og = ig * this.oir;
        const nig = typeof this.innerGapReplacer !== 'function'
            ? ig : this.innerGapReplacer(ig);
        const nog = typeof this.outerGapReplacer !== 'function'
            ? og : this.outerGapReplacer(og);
        if (typeof this.innerGapReplacer === 'function'
            || typeof this.outerGapReplacer === 'function'
        )
            c = (L + nig - 2 * nog - nig * this.Nsi) / this.Nsi;

        return { L, c, ig: nig, og: nog };
    }
}