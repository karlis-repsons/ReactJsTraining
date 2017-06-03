export default function isTypeEqual(x, validReactComponent) {
    return (x && x.type
        && (x.type === validReactComponent
            || x.type.displayName === validReactComponent.displayName) // TODO jsh3f: is this check correct? How to improve it?
    );
}