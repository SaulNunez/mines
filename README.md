# Mines

A Minesweeper clone made in React Native, with Expo. Mainly as a tool to learn how Redux works. Works at the moment in Web and Android.

## Redux store
The following actions are implemented in the main reducer:
* CLICK: When square is clicked state is changed to OPENED for that square. Checks if a bomb is in that square, if yes, sets game state to LOST. There's also a calculation done if the board has been cleaned to set game state as WON.
* FLAG/UNFLAG: Sets the board square as flagged or unflagged. When flagged, there's also a calculation done if the board has been cleaned to set game state as WON.
* NEW_GAME: Dispatched on load and everytime the new game button is pressed. It creates a new board configuration, that means resets board and randomly places bombs.
