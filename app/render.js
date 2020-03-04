import document from "document";
import { getState } from './state';

function ele(id) { return document.getElementById(id) }

export let emptyView = ele('home-view-empty-text');
export let drinkView = ele('home-view-active-drink');
export let addButton = ele("add-active-drink-button");
export let configButton = ele('configure-active-drink-button');
export let endButton = ele('finish-active-drink-button');
export let drinkHistory = ele('history-list');

export let noDrinkView = ele('home-view-no-active-drink-text');

function display(E, d) { if (!Array.isArray(E)) E = [E]; E.forEach(e => e.style.display = d) }
function hide(E) { display(E, 'none') }
function show(E) { display(E, 'inline') }
function mixedText(e, h, c) {
    e.getElementById('header').text = h;
    e.getElementById('copy').text = c;
}

/* ===================================================================================== */

export let historyList = document.getElementById("my-list");
export let historyListEvents = { onclick: (index) => console.log(`touched: ${index}`) }

function getTime(d) {
    if (typeof d == "object") d = JSON.stringify(d);
    let s = "" + d;
    return s.substr(s.indexOf("T") + 1, 5)
}

historyList.delegate = {
    getTileInfo: function (index) {
        return {
            type: "my-pool",
            value: "Menu_item",
            index: index
        };
    },
    configureTile: function (tile, info) {

        if (info.type == "my-pool") {

            // let state = '5:45 p.m. - 6:27 p.m.';
            let index = info.index;

            let item = getState().drinkHistory[index]

            let descr = ordinal_suffix_of(index + 1) + ' - ' + item.ml + 'ml / ' + item.abv + '% avb';
            let range = getTime(item.started) + " - " + getTime(item.ended);

            tile.getElementById("text").text = descr;
            tile.getElementById("subtext").text = range;
            let touch = tile.getElementById("touch-me");
            touch.onclick = evt => historyListEvents.onclick(index);
        }
    }
};
// VTList.length must be set AFTER VTList.delegate
historyList.length = 0;

/* ===================================================================================== */

export function render(state) {

    hide([
        emptyView,
        noDrinkView,
        drinkView,
        addButton,
        configButton,
        endButton,
    ])

    if (state.activeDrink) {
        show([
            drinkView,
            // configButton,
            endButton,
        ])
        drinkView.animate('enable');
        let minutes = Math.round((new Date() - new Date(state.activeDrink.started)) / 60000)
        ele('active-drink-minutes').text = minutes + " min."
    } else {
        let n = state.drinkHistory.length;
        show([addButton, n == 0 ? emptyView : noDrinkView])
        if (n == 1) mixedText(noDrinkView, 'One is nothing', 'You have entered 1 drink')
        else if (n == 2) mixedText(noDrinkView, '2 are like 1', 'You have entered 2 drinks')
        else mixedText(noDrinkView, ordinal_suffix_of(n + 1) + ' drink', 'You have entered ' + n + ' drinks')
    }

    historyList.length = state.drinkHistory.length;
}

function ordinal_suffix_of(i) {
    var j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
}