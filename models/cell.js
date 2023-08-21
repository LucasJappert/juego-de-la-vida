import { GetImage } from "../services/resources.js";
const cantidadCeldasEnX = 30;
const cantidadCeldasEnY = 30;
// const [cantidadCeldasEnX, cantidadCeldasEnY] = [30, 30];
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
        this.#isAlive = Math.random() > 0.7;
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
            return;
        } 


        // else if(aliveNeigthboringCells == 3) this.UpdateState(true);
        if([3].includes(aliveNeigthboringCells)) this.UpdateState(true);
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
            this.#ObtenerCelulaVecinaArribaALaIzquierda(cellsMatrix),
            this.#ObtenerCelulaVecinaArribaALaDerecha(cellsMatrix),
            this.#ObtenerCelulaVecinaAbajoALaIzquierda(cellsMatrix),
            this.#ObtenerCelulaVecinaAbajoALaDerecha(cellsMatrix),
            this.#ObtenerCelulaVecinaDeArriba(cellsMatrix),
            this.#ObtenerCelulaVecinaDeAbajo(cellsMatrix),
            this.#ObtenerCelulaVecinaDeIzquierda(cellsMatrix),
            this.#ObtenerCelulaVecinaDeDerecha(cellsMatrix),
        ];
    }
    #ObtenerCelulaVecinaArribaALaIzquierda(cellsMatrix) {
        const filaIzquierda = cellsMatrix[this.x - 1];
        if (filaIzquierda == null) {
            const filaUltima = cellsMatrix[cantidadCeldasEnX-1];
            if (filaUltima[this.y - 1] == null) return filaUltima[cantidadCeldasEnY - 1];
            return filaUltima[this.y - 1];
        }

        const cajonArribaDerecha = filaIzquierda[this.y - 1];
        if (cajonArribaDerecha == null) return filaIzquierda[cantidadCeldasEnY - 1];

        return cajonArribaDerecha;
    }
    #ObtenerCelulaVecinaArribaALaDerecha(cellsMatrix) {
        const filaDerecha = cellsMatrix[this.x + 1];
        if (filaDerecha == null) {
            const primerFila = cellsMatrix[1];
            if (primerFila[this.y - 1] == null) return primerFila[cantidadCeldasEnY - 1];
            return primerFila[this.y - 1];
        }

        const cajonArribaDerecha = filaDerecha[this.y - 1];
        if (cajonArribaDerecha == null) return filaDerecha[cantidadCeldasEnY - 1];

        return cajonArribaDerecha;
    }
    #ObtenerCelulaVecinaAbajoALaIzquierda(cellsMatrix) {
        const filaIzquierda = cellsMatrix[this.x - 1];
        if (filaIzquierda == null) {
            const filaUltima = cellsMatrix[cantidadCeldasEnX-1];
            if (filaUltima[this.y + 1] == null) return filaUltima[1];
            return filaUltima[this.y + 1];
        }

        const cajonAbajoIzquierda = filaIzquierda[this.y + 1];
        if (cajonAbajoIzquierda == null) return filaIzquierda[1];

        return cajonAbajoIzquierda;
    }
    #ObtenerCelulaVecinaAbajoALaDerecha(cellsMatrix) {
        const filaDerecha = cellsMatrix[this.x + 1];
        if (filaDerecha == null) {
            const primerFila = cellsMatrix[1];
            if (primerFila[this.y + 1] == null) return primerFila[1];
            return primerFila[this.y + 1];
        }

        const cajonAbajoDerecha = filaDerecha[this.y + 1];
        if (cajonAbajoDerecha == null) return filaDerecha[1];

        return cajonAbajoDerecha;
    }
    #ObtenerCelulaVecinaDeArriba(cellsMatrix) {
        const filaArriba = cellsMatrix[this.y - 1];
        if (filaArriba == null) return cellsMatrix[cantidadCeldasEnY - 1][this.x];

        return filaArriba[this.x];
    }
    #ObtenerCelulaVecinaDeAbajo(cellsMatrix) {
        const filaAbajo = cellsMatrix[this.y + 1];
        if (filaAbajo == null) return cellsMatrix[1][this.x];

        return filaAbajo[this.x];
    }
    #ObtenerCelulaVecinaDeIzquierda(cellsMatrix) {
        const filaIzquierda = cellsMatrix[this.x - 1];
        if (filaIzquierda == null) return cellsMatrix[cantidadCeldasEnX - 1][this.y];

        return filaIzquierda[this.y];
    }
    #ObtenerCelulaVecinaDeDerecha(cellsMatrix) {
        const filaDerecha = cellsMatrix[this.x + 1];
        if (filaDerecha == null) return cellsMatrix[1][this.y];

        return filaDerecha[this.y];
    }
    GetAliveCells(cells){
        return cells.filter(cell => cell?.AmIAlive()).length;
    }

}
export { Cell };