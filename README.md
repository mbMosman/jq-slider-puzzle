# Slider Puzzle

## Intro
In this assignment we will make an image slider puzzle using jQuery. Open the HTML file in a browser and you’ll see the puzzle, but it doesn’t do anything yet. You will need to update the puzzle.js file to make the puzzle playable.

Add an event handler for each of the table cells. This should check to see if the tile is movable.To determine if the image tile can be moved, we need to check each of the neighboring spots (above, below, right and left) to see if one of these spots is empty for us to move the tile into. If the tile can't be moved, pop-up an alert with the reason: 
    - if the user clicked on the “empty” image tile. 
    - if there is no empty cell next to the one clicked on

Note: To help with this, the cell ids are numbered to be coordinates.  The first row is numbered cell11, cell12, etc. The second row is numbered cell21, cell22, etc.  Use this pattern to determine the id of the cell you want to check.

After moving a tile, you should check to see if the puzzle is won. The images in each table cell have a number in the `alt` text. When those are all in order from 1-16, the puzzle is won. Change the background image to have the green border instead of the brown one (apply the win style class) to indicate the puzzle is complete.