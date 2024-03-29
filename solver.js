console.log("Hello");

let tableElement = document.querySelector("table");
let tableArray = [];

function updateTableData()
{
    tableArray = new Array(tableElement.rows.length);
    for (let i = 0; i < tableElement.rows.length; i++) {
        tableArray[i] = new Array(tableElement.rows[i].cells.length);
        for (let j = 0; j < tableElement.rows[i].cells.length; j++) {
            tableArray[i][j] = tableElement.rows[i].cells[j].querySelector("input").value;
        }
    }
}

function solveSudoku()
{
    updateTableData();
    console.log(`Solving soduku with table: ${tableArray}`);

    for (let y = 0; y < tableArray.length; y++) {
        for (let x = 0; x < tableArray[y].length; x++)
        {
            if (tableArray[y][x] == "")
            {
                // Check row
                const row = tableArray[y];
                possibilities = ["1","2","3","4","5","6","7","8","9"].filter(a => !row.includes(a));
                
                // Check column
                const column = tableArray.map(row => row[x]);
                possibilities = possibilities.filter(a => !column.includes(a));
                tableElement.rows[y].cells[x].querySelector("input").ariaLabel = possibilities.join(", ");
                console.log(`Cell (${x},${y}) can be ${possibilities.join(", ")}`);

                // Check square
                const squareRowStartIndex = Math.floor(x/3)*3;
                const squareColumnStartIndex = Math.floor(y/3)*3;
                let square = tableArray[squareColumnStartIndex].slice(squareRowStartIndex, squareRowStartIndex+3).concat(tableArray[squareColumnStartIndex+1].slice(squareRowStartIndex, squareRowStartIndex+3)).concat(tableArray[squareColumnStartIndex+2].slice(squareRowStartIndex, squareRowStartIndex+3));
                console.log(`Square: ${square}`);
                possibilities = possibilities.filter(a => !square.includes(a));
                if (possibilities.length == 1) addSolvedSquare(y, x, possibilities[0]);
            }
        }
    }
}

function addSolvedSquare(i, j, value)
{
    tableElement.rows[i].cells[j].querySelector("input").value = possibilities[0];
    tableElement.rows[i].cells[j].querySelector("input").style.backgroundColor = "lightgreen";
    tableElement.rows[i].cells[j].querySelector("input").style.color = "darkgrey";
}