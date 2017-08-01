export default function isTypeEqual(x, validReactComponent) {
    return (x && x.type
        && (x.type === validReactComponent
            || x.type.displayName === validReactComponent.displayName)
    );
}

// Q: Why does it seem that Facebook not mention how to
//    check child element types in their documentation?
//    How likely is this check to become obsolete?