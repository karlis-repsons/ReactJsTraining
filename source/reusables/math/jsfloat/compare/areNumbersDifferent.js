export default function areNumbersDifferent(n1, n2) {
    return Math.abs(n1 - n2) >= Number.EPSILON;
}