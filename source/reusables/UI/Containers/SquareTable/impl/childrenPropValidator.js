export default function onlyOfType(validType) {
    return (props, propName, componentName) => {
        function isEmptySpace(input) {
            return typeof input === 'string' && /^\s*$/.test(input)
        }

        const value = props[propName];
        if (typeof value === 'undefined'
            || isEmptySpace(value) || value.type === validType
        )
            return;

        for (const child of value) {
            if (isEmptySpace(child))
                continue;

            if (child.type !== validType)
                return new Error(`${componentName} got invalid child. `
                    + `It accepts only ${validType.name} elements.`);
        }
    };
}

// improvement suggestions:
//  * indicate wrong values,
//  * take this functionality from a better, common place.