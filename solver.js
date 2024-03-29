console.log("Hello");

let tableElement = document.querySelector("table");
let tableArray = [];
const things = ["1","2","3","4","5","6","7","8","9"];

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

function checkSinglePossibilityInArray(array)
{
    for (let i of things)
        {
            occurences = []
            for (let j=0; j<array.length;j++)
            {
                if (Array.isArray(array[j]) && array[j].includes(i))
                {
                    occurences.push(j);
                }
                else if (typeof array[j] === 'string' && array[j].includes(i))
                {
                    continue;
                }
            }
            console.log(`Occurences of ${i} in array: ${occurences}`);
            if (occurences.length==1)
            {
                console.log(`Found 1 occurence in possibilities: ${i} at ${occurences[0]}`);
                return {index:occurences[0],thing:i};
            }
        }
}

function solveSudoku()
{
    updateTableData();
    console.log(`Solving soduku with table: ${tableArray}`);

    // Possibilities for each cell
    for (let y = 0; y < tableArray.length; y++) {
        for (let x = 0; x < tableArray[y].length; x++)
        {
            if (tableArray[y][x] == "")
            {
                // Check row
                const row = tableArray[y];
                possibilities = things.filter(a => !row.includes(a));
                
                // Check column
                const column = tableArray.map(row => row[x]);
                possibilities = possibilities.filter(a => !column.includes(a));
                tableElement.rows[y].cells[x].querySelector("input").ariaLabel = possibilities.join(", ");
                console.log(`Cell (${x},${y}) can be ${possibilities.join(", ")}`);

                // Check box
                const boxRowStartIndex = Math.floor(x/3)*3;
                const boxColumnStartIndex = Math.floor(y/3)*3;
                let box = tableArray[boxColumnStartIndex].slice(boxRowStartIndex, boxRowStartIndex+3).concat(tableArray[boxColumnStartIndex+1].slice(boxRowStartIndex, boxRowStartIndex+3)).concat(tableArray[boxColumnStartIndex+2].slice(boxRowStartIndex, boxRowStartIndex+3));
                console.log(`Square: ${box}`);
                possibilities = possibilities.filter(a => !box.includes(a));
                if (possibilities.length == 1) addSolvedSquare(y, x, possibilities[0]);
                else
                {
                    tableArray[y][x] = possibilities;

                    // tableElement.rows[y].cells[x].querySelector("input").parentElement.textContent = possibilities.join(", ");
                    // tableElement.rows[y].cells[x].style.backgroundColor = "lightyellow";
                    // tableElement.rows[y].cells[x].style.color = "black";
                }
            }
        }
    }

    // Check occurences to see if there is only a single possibility per row, column or box
    // Row
    for (let y = 0; y < tableArray.length; y++)
    {
        row = tableArray[y];
        const result = checkSinglePossibilityInArray(row);
        if (result)
        {
            addSolvedSquare(y, result.index, result.thing);
        }
    }

    // Column
    for (let x = 0; x < tableArray[0].length; x++)
    {
        column = tableArray.map(row => row[x]);
        const result = checkSinglePossibilityInArray(column);
        if (result)
        {
            addSolvedSquare(result.index, x, result.thing);
        }
    }

    // Box
    for (let y = 0; y < tableArray.length; y+=3)
    {
        for (let x = 0; x < tableArray[y].length; x+=3)
        {
            box = tableArray[y].slice(x, x+3).concat(tableArray[y+1].slice(x, x+3)).concat(tableArray[y+2].slice(x, x+3));
            const result = checkSinglePossibilityInArray(box);
            if (result)
            {
                addSolvedSquare(y+Math.floor(result.index/3), x+result.index%3, result.thing);
            }
        }
    }
}

function addSolvedSquare(y, x, value)
{
    tableElement.rows[y].cells[x].querySelector("input").value = value;
    tableElement.rows[y].cells[x].querySelector("input").style.backgroundColor = "lightgreen";
    tableElement.rows[y].cells[x].querySelector("input").style.color = "darkgrey";
}