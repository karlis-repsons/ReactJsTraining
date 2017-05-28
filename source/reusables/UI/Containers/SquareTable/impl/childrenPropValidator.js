export default function onlyOfType(validType) {
    return (props, propName, componentName) => {
        function isEmptySpace(input) {
            return typeof input === 'string' && /^\s*$/.test(input)
        }

        const value = props[propName];
        if (typeof value === 'undefined'
            || isEmptySpace(value) ||
                (value.type && value.type.name === validType.name)
        )
            return;

        for (const child of value) {
            if (isEmptySpace(child))
                continue;

            if (!child.type || child.type.name !== validType.name)
                return new Error(`${componentName} got invalid child. `
                    + `It accepts only ${validType.name} elements.`);
        }
    };
}

// improvement suggestions:
//  * indicate wrong values,
//  * take this functionality from a better, common place.