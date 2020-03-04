import { addButton, endButton, configButton, drinkView, historyListEvents } from "./render"
import { addActiveDrink, finishActiveDrink, reload as reloadOrSetup, deleteDrinkFromHistory } from "./actions"

// WIRING
addButton.onactivate = addActiveDrink;
endButton.onactivate = finishActiveDrink;
historyListEvents.onclick = deleteDrinkFromHistory;
configButton.onactivate = () => drinkView.animate('enable')

// SETUP
reloadOrSetup()