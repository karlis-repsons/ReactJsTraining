const defaultIgcr = 0;
const defaultOir = 1;

export default function getTableMeasures(props) {
   const {
      cellsAtSideCount: Nsi,
      innerGapToCellSideLengthRatio: igcr = defaultIgcr,
      outerGapToInnerGapRatio: oir = defaultOir,
      innerGapReplacer,
      outerGapReplacer,
   } = props;
   
   if (Nsi === 0)
      throw Error('Cannot calculate measures if cellsAtSideCount = 0.');
   
   // find info in: math variables explained.txt
   const L = Math.min(props.widthPx, props.heightPx);
   let c = L / (Nsi + igcr * (Nsi - 1 + 2 * oir));
   const ig = c * igcr;
   const og = ig * oir;
   const nig = typeof innerGapReplacer !== 'function'
      ? ig : innerGapReplacer(ig);
   const nog = typeof outerGapReplacer !== 'function'
      ? og : outerGapReplacer(og);
   if (typeof innerGapReplacer === 'function'
       || typeof outerGapReplacer === 'function'
   )
      c = (L + nig - 2 * nog - nig * Nsi) / Nsi;
   
   return {L, c, ig: nig, og: nog};
}