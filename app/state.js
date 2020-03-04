import { render } from "./render"

let S = null;

export function getState() {
    return S
}

export function setState(state) {
    S = state;
    render(S);
}