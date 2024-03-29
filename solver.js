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

    for (let i = 0; i < tableArray.length; i++) {
        for (let j = 0; j < tableArray[i].length; j++)
        {
            if (tableArray[i][j] == "")
            {
                // Check row
                const row = tableArray[i];
                possibilities = ["1","2","3","4","5","6","7","8","9"].filter(a => !row.includes(a));
                // Check column
                const column = tableArray.map(row => row[j]);
                possibilities = possibilities.filter(a => !column.includes(a));
                tableElement.rows[i].cells[j].querySelector("input").ariaLabel = possibilities.join(", ");
                console.log(`Cell ${i}, ${j} can be ${possibilities.join(", ")}`);
                if (possibilities.length == 1)
                {
                    tableElement.rows[i].cells[j].querySelector("input").value = possibilities[0];
                    tableElement.rows[i].cells[j].querySelector("input").style.backgroundColor = "lightgreen";
                    tableElement.rows[i].cells[j].querySelector("input").style.color = "darkgrey";
                }
            }
        }
    }
}