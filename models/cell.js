import { GetImage } from "../services/resources.js";
class Cell {
    #isAlive = false;
    x = 0;
    y = 0;
    scale = 1;
    width = 0;
    height = 0;
    image = null;
    constructor(x, y, isAlive){
        this.UpdateState(isAlive);
        this.x = x;
        this.y = y;
        //console.log(this.posX * this.width);
    }
    AmIAlive(){ return this.#isAlive; }
    UpdateState(isAlive){
        // this.#isAlive = isAlive;
        this.#isAlive = Math.random() > 0.9;
        this.image = this.#isAlive ? GetImage("whiteShape") : GetImage("blackShape");
        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;
    }


    Update(cellsMatrix){
        let neigthboringCells = this.GetNeigthboringCells(cellsMatrix);
        // console.log(neigthboringCells);
        let aliveNeigthboringCells = this.GetAliveCells(neigthboringCells);
        // console.log(aliveNeigthboringCells);
        if(this.#isAlive){
            if (![2, 3].includes(aliveNeigthboringCells)) this.UpdateState(false);
        } 
        // else if(aliveNeigthboringCells == 3) this.UpdateState(true);
        else if([2].includes(aliveNeigthboringCells)) this.UpdateState(true);
    }
    Draw(ctx){
        // if(!this.#isAlive) return;
        // console.log(this.x * this.width, this.y * this.height);
        // console.log(this.width, this.height);
        // console.log(this.image.currentSrc, this.height);
        ctx.save();
        ctx.setTransform(this.scale, 0, 0, this.scale, this.x * this.width, this.y * this.height); // sets scales and origin
        ctx.drawImage(this.image, -this.width, -this.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
    }
    GetNeigthboringCells(cellsMatrix){
        return [
            cellsMatrix[this.x - 1] ? cellsMatrix[this.x - 1][this.y - 1] : null,
            cellsMatrix[this.x] ? cellsMatrix[this.x][this.y - 1] : null,
            cellsMatrix[this.x + 1] ? cellsMatrix[this.x + 1][this.y - 1] : null,
            cellsMatrix[this.x - 1] ? cellsMatrix[this.x - 1][this.y] : null,
            cellsMatrix[this.x + 1] ? cellsMatrix[this.x + 1][this.y] : null,
            cellsMatrix[this.x - 1] ? cellsMatrix[this.x - 1][this.y + 1] : null,
            cellsMatrix[this.x] ? cellsMatrix[this.x][this.y + 1] : null,
            cellsMatrix[this.x + 1] ? cellsMatrix[this.x + 1][this.y + 1] : null
        ];
    }
    GetAliveCells(cells){
        return cells.filter(cell => cell?.AmIAlive()).length;
    }

}
export { Cell };