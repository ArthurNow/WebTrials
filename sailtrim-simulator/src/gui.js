import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@latest/dist/tweakpane.min.js";

// Controls and parameters https://tweakpane.github.io/docs/input-bindings/
export const PARAMS = {
    bft: 3,
    // bftMax: 15, // Define maximum bft
    // mainsheet: 0,
    // traveller: 0,
    // outhaul: 0,
    // downhaul: 0,
    backstay: 0,
    // vang: 0,
    // halyard: 0,
    // bezierCoefficient1: 0,
    // bezierCoefficient2: 0,
    // bezierConstant: 0,
  };

export function createGUI(updateFunction) {
    const pane = new Pane();
    // eventlistener for on-change-events in tweakpane-gui
    pane.addBinding(PARAMS, "bft", { min: 0, max: 17, step: 1 }).on('change', (ev) => {
        updateFunction(ev.value);
    });
    // pane.addBinding(PARAMS, 'mainsheet', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'traveller', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'outhaul', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'downhaul', { min: 0, max: 1, step: 0.1 });
    pane.addBinding(PARAMS, 'backstay', { min: 0, max: 1, step: 0.1 }).on('change', (ev) => {
        updateFunction(ev.value);
    });
    // pane.addBinding(PARAMS, 'vang', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'halyard', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'bezierCoefficient1', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'bezierCoefficient2', { min: 0, max: 1, step: 0.1 });
    // pane.addBinding(PARAMS, 'bezierConstant', { min: 0, max: 1, step: 0.1 });
return pane;
}