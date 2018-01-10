$(document).ready( function () {
    $('td').on('click', tileClick);
});
    
function tileClick() {
    // $ at the start of name indicates it is a jQuery object
    const $tdClicked = $(this);
    
    // See if we clicked on the empty spot to give message
    if ( isEmptyCell($tdClicked) ) {
        alert('Click on an image next to this square to move it.');
    } else {
    
        // Check for an empty neighbor square
        $emptyCell = findEmptyNeighbor($tdClicked);
        //console.log($emptyCell);
        
        if ($emptyCell == null) {
            // Can't do swap if no empty square
            alert('Click on an image next to the empty square to move it.');
        } 
        else {
            // Swap images and check for win
            swapImages($tdClicked, $emptyCell)
            if ( checkForWin() ) {
                $('#puzzleGrid').addClass('win');   
            }
        }
    }
}

function getImageFromCell($td) {
    return $td.children('img');
}

function isEmptyCell($td) {
    const $image = getImageFromCell($td);
    if ($image.attr('alt') === 'empty') {
        return true;
    } else {
        return false;
    }
}

function swapImages($td1, $td2) {
    $td1Img = getImageFromCell($td1);
    $td1Img.detach();

    $td2Img = getImageFromCell($td2);
    $td2Img.detach();

    $td1.append($td2Img);
    $td2.append($td1Img);
}
    
function findEmptyNeighbor($td) {
    
    const clickedId = $td.attr('id');
    const clickedRow = clickedId.substring(4, 5);
    const clickedColumn = clickedId.substring(5, 6);
    
    console.log(`Clicked row ${clickedRow} column ${clickedColumn}`);
    
    // Check above
    if (clickedRow > 1) {
        const rowToCheck = parseInt(clickedRow) - 1;
        const colToCheck = clickedColumn;
        
        const $tdAbove = getCell(rowToCheck, colToCheck);
        if (isEmptyCell($tdAbove)) {
            return $tdAbove; // Found it!  Return it to stop checking.
        }
    }
    // Check below
    if (clickedRow < 4) {
        const rowToCheck = parseInt(clickedRow) + 1;
        const colToCheck = clickedColumn;
        
        const $tdBelow = getCell(rowToCheck, colToCheck);
        if (isEmptyCell($tdBelow)) {
            return $tdBelow; // Found it!  Return it to stop checking.
        }
    }
    
    // Check left
    if (clickedColumn > 1) {
        const rowToCheck = clickedRow;
        const colToCheck = parseInt(clickedColumn) - 1;
        
        const $tdLeft = getCell(rowToCheck, colToCheck);
        if (isEmptyCell($tdLeft)) {
            return $tdLeft; // Found it!  Return it to stop checking.
        }
    }
    
    // Check right
    if (clickedColumn < 4) {
        const rowToCheck = clickedRow;
        const colToCheck = parseInt(clickedColumn) + 1;
        
        const $tdRight = getCell(rowToCheck, colToCheck);
        if (isEmptyCell($tdRight)) {
            return $tdRight; // Found it!  Return it.
        }
    }
    
    // There may not be an empty neighbor cell
    return null;
}

function getCell(row, col) {
    idToCheck = '#cell' + row + col;        
    return $(idToCheck);
}
    
function checkForWin() {
    
    let counter = 1; // For image numbers, from 1 - 16

    $allImages = $('img');
    for (let i=0; i<$allImages.size(); i++) {
        const $image = $allImages.get(i);
        const altText = $image.alt;
        if (counter === 16) {
            // last one should be empty
            if (altText != 'empty') {
                return false;
            }
        } 
        else {
            if (altText != counter) {
                return false;
            }
        }
        counter = counter + 1;
    }
    
    // Didn't find anything out of order, so winner!!!
    return true;
    
}