import isTypeEqual from './isTypeEqual';

export default function childrenOnlyOfType(validReactComponentType) {
    return (props, propName, componentName) => {
        function isEmptySpace(input) {
            return typeof input === 'string' && /^\s*$/.test(input);
        }

        const value = props[propName];
        if (value === undefined || value === null || isEmptySpace(value)
            || isTypeEqual(value, validReactComponentType) // Q: can this happen?
        )
            return;

        for (const child of value) {
            if (isEmptySpace(child))
                continue;

            if (!isTypeEqual(child, validReactComponentType)) {
                const goodName = validReactComponentType.displayName;
                return new Error(`${componentName} got invalid child. `
                    + `It accepts only ${goodName} elements.`);
            }
        }
    };
}

// improvement suggestions:
//  * indicate wrong values,
//  * take this functionality from a better, common place.