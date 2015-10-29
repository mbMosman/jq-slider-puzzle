(function () {
    
$("td").click(tileClick);

console.log(checkForWin());
    

function isEmptySquare($image) {
    var altText = $image.attr("alt");
    if (altText === "empty") {
        return true;
    }
    else {
        return false;
    }
}
    
function tileClick() {
    var $td, $clickedImg, $emptyImg, temp;
    
    $td = $(this)
    
    // See if we clicked on the empty spot to give message.
    $clickedImg = $td.children().first();
    if ( isEmptySquare($clickedImg) ) {
        alert("Click on an image next to this square to move it.");
    }
    else {
    
        // Look for an empty square
        $emptyImg = checkForEmpty($td);
        console.log($emptyImg);
        
        if ($emptyImg === null) {
            alert("Click on an image next to the empty square to move it.");
        } 
        else {
            //Swap images
            temp = $clickedImg.attr("src");
            $clickedImg.attr("src", $emptyImg.attr("src"));
            $emptyImg.attr("src", temp);

            temp = $clickedImg.attr("alt");
            $clickedImg.attr("alt", $emptyImg.attr("alt"));
            $emptyImg.attr("alt", temp);
            
            // Check for win
            if ( checkForWin() ) {
                $("#puzzleGrid").addClass("win");   
            }
        }
    }
}
    
function checkForEmpty($td) {
    var newRow, newCol, idToCheck, $img;
    
    var id = $td.attr("id");
    var row = id.substring(4,5);
    var col = id.substring(5,6);
    
    console.log("Row " + row);
    console.log("Col " + col); 
    
    // Check top
    if (row > 1) {
        newRow = parseInt(row) - 1;
        newCol = col;
        
        $img = getImageFromCell(newRow, newCol);
        if (isEmptySquare($img)) {
            return $img;
        }
    }
    // Check bottom
    if (row < 4) {
        newRow = parseInt(row) + 1;
        newCol = col;
        $img = getImageFromCell(newRow, newCol);
        if (isEmptySquare($img)) {
            return $img;
        }
    }
    
    // Check left
    if (col > 1) {
        newRow = row;
        newCol = parseInt(col) - 1;
        $img = getImageFromCell(newRow, newCol);
        if (isEmptySquare($img)) {
            return $img;
        }
    }
    
    // Check right
    if (col < 4) {
        newRow = row;
        newCol = parseInt(col) + 1;
        $img = getImageFromCell(newRow, newCol);
        if (isEmptySquare($img)) {
            return $img;
        }
    }
    
    return null;
        
}

function getImageFromCell(row, col) {
    idToCheck = "#cell" + row + col;
    console.log("Id below: " + idToCheck);        
    return $(idToCheck).children().first();
}
    
function checkForWin() {
    var counter, $allImages, isWin;
    
    isWin = true;
    counter = 1;
    $allImages = $("img").each( function(index, element) {
        var altText = $(this).attr("alt");
        if (counter === 16) {
            //should be empty
            if (altText != "empty") {
                isWin = false;
                return false;
            }
        } 
        else {
            if (altText != counter) {
                isWin = false;
                return false;
            }
        }
        counter = counter + 1;
    });
    
    return isWin;
    
}
    
}());