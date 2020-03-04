import { getState, setState } from './state'

import * as fs from "fs";

const jsonFileName = "drink-mgr.json"

export function addActiveDrink() {
    let s = getState();
    s.activeDrink = {
        ml: 330,
        abv: 3.9,
        started: new Date(),
        ended: null
    }
    persist(s)
    setState(s)
}

export function finishActiveDrink() {
    let s = getState();
    let d = s.activeDrink;
    d.ended = new Date();
    s.activeDrink = null;
    s.drinkHistory.push(d);
    persist(s)
    setState(s)
}

export function deleteDrinkFromHistory(index) {
    let s = getState();
    s.drinkHistory.splice(index, 1);
    persist(s);
    setState(s);
}

export function reload() {
    try {
        let json = fs.readFileSync(jsonFileName, "json");
        setState(json);
    } catch (e) {
        setState({
            activeDrink: null,
            drinkHistory: []
        });
    }
}

export function persist(json) {
    fs.writeFileSync(jsonFileName, json, "json");
}