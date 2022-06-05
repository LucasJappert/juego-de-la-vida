import { PreloadImages } from "../services/resources.js";
import { Cell } from "../models/cell.js";

await PreloadImages();
//ReiniciarJuego();
const updatesPerSecond = 1;
const StartProcess = () => {
    setInterval(() => {
        Update();
        Draw();
    }, 1000/updatesPerSecond);
};
setTimeout(StartProcess(), 1000);
//requestAnimationFrame(Draw);

var canvas = document.getElementById("micanvas");
const [cellsNumberX, cellsNumberY] = [30, 30]; //[100, 100];
canvas.width = cellsNumberX * 20;
canvas.height = cellsNumberY * 20;
var ctx = canvas.getContext("2d");

let cellsMatrix = {};
for (let row = 1; row < cellsNumberX; row++) {
    let columnInfo = {};
    for (let column = 1; column < cellsNumberY; column++) {
        //console.log(x, y);
        columnInfo[column] = new Cell(row, column, false);
        //CellsArray.push(new Cell(x, y, false))
    }
    cellsMatrix[row] = columnInfo;
}
console.log(cellsMatrix);

//Test1
// cellsMatrix[10][10].UpdateState(true);
// cellsMatrix[10][11].UpdateState(true);
// cellsMatrix[10][12].UpdateState(true);
// cellsMatrix[10][13].UpdateState(true);
// cellsMatrix[10][14].UpdateState(true);
// cellsMatrix[10][15].UpdateState(true);
// cellsMatrix[10][16].UpdateState(true);
// cellsMatrix[13][10].UpdateState(true);
// cellsMatrix[13][11].UpdateState(true);
// cellsMatrix[13][12].UpdateState(true);
// cellsMatrix[13][13].UpdateState(true);
// cellsMatrix[13][14].UpdateState(true);
// cellsMatrix[13][15].UpdateState(true);
// cellsMatrix[13][16].UpdateState(true);


function Update() {
    let prevMatrix = {...cellsMatrix};
    Object.values(cellsMatrix).forEach(column => {
        Object.values(column).forEach(cell => {
            cell.Update(prevMatrix);
        });
    });
}
// console.log(cellsMatrix[23][22]);
function Draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Object.values(cellsMatrix).forEach(column => {
        Object.values(column).forEach(cell => {
            cell.Draw(ctx);
        });
    });
    
}