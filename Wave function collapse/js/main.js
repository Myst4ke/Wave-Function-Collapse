let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
let path = ['js/asset/Void.png', 'js/asset/crossUp.png', 'js/asset/crossRight.png', 'js/asset/crossDown.png', 'js/asset/crossLeft.png'];
let cellLeft = [];
let finished = false;
let counter = 0;
let imageVoid = new Image();
imageVoid.src = path[0];
let imageUp = new Image();
imageUp.src = path[1];
let imageRight = new Image();
imageRight.src = path[2];
let imageDown = new Image();
imageDown.src = path[3];
let imageLeft = new Image();
imageLeft.src = path[4];
let images = [imageVoid, imageUp, imageRight, imageDown, imageLeft];

class vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let imageSize = new vec2(25, 25)
let gridX = cnv.width / imageSize.x | 0;
let gridY = cnv.height / imageSize.y | 0;
let gridsize = gridX * gridY;


  
class tile {
    constructor(pathIndex, borders) {
        this.pathIndex = pathIndex;
        this.path = path[pathIndex];
        this.up = borders[0];
        this.right = borders[1];
        this.down = borders[2];
        this.left = borders[3];
    }
    loadImage(){

    }
    drawTile(x, y, w, h) {
        //let img = new Image();
        //img.src = this.path;
        //let img = images[this.pathIndex];
        ctx.drawImage(images[this.pathIndex], x, y, w, h);
    }
}
let tileVoid = new tile(0, [0, 0, 0, 0]);
let tileUp = new tile(1, [1, 1, 0, 1]);
let tileRight = new tile(2, [1, 1, 1, 0]);
let tileDown = new tile(3, [0, 1, 1, 1]);
let tileLeft = new tile(4, [1, 0, 1, 1]);
let tiles = [tileVoid, tileUp, tileRight, tileDown, tileLeft];

class grid {
    constructor() {
        this.grille = new Array(gridsize);
        for (let i = 0; i < gridsize; i++) {
            this.grille[i] = {
                pickedTile: -1,
                options: tiles.slice(),
            }

        }
    }
}
let grille1 = new grid();

//return une option random parmis les options sinon -1
function randomPick(tab) {
    if (tab.length > 0) {
        let random = Math.random() * tab.length | 0;
        return tab[random];
    }
    if(tab.length == 0){
        return tileVoid;
    }
    return -1;
}
function collapse(grille) {
    if (!finished) {
        
        let min = 999;
        for (let i = 0; i < grille.grille.length; i++) {
            if (grille.grille[i].pickedTile == -1) {
                if (grille.grille[i].options.length < min) {
                    min = grille.grille[i].options.length;
                    cellLeft.splice(0);
                    cellLeft.push(i);
                } else if (grille.grille[i].options.length == min) {
                    cellLeft.push(i);
                }
            }
        }
        if (counter == grille.grille.length) {
            console.log("reset time !");
            finished = true;
        } else {
            counter++;

            let rand = Math.random() * cellLeft.length | 0;
            let random = cellLeft[rand];

            cellLeft.splice(0);
            let selectedOption = randomPick(grille.grille[random].options);
            grille.grille[random].pickedTile = selectedOption;
            reduceEntropy(random);
        }
    }
}

function reduceEntropy(index) {
    if (index - gridY >= 0) {
        if (grille1.grille[index - gridY].pickedTile < 0) {
            grille1.grille[index - gridY].options = grille1.grille[index - gridY].options.filter(elem => elem.down == grille1.grille[index].pickedTile.up);
        }

    }
    if (index + gridY < grille1.grille.length) {
        if (grille1.grille[index + gridY].pickedTile < 0) {
            grille1.grille[index + gridY].options = grille1.grille[index + gridY].options.filter(elem => elem.up == grille1.grille[index].pickedTile.down);
        }

    }
    if (index % gridX - 1 >= 0) {
        if (grille1.grille[index - 1].pickedTile < 0) {
            grille1.grille[index - 1].options = grille1.grille[index - 1].options.filter(elem => elem.right == grille1.grille[index].pickedTile.left);
        }

    }
    if (index % gridX + 1 < gridX) {
        if (grille1.grille[index + 1].pickedTile < 0) {
            grille1.grille[index + 1].options = grille1.grille[index + 1].options.filter(elem => elem.left == grille1.grille[index].pickedTile.right);
        }

    }
}

function isCollapsed() {
    for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
            let cell = grille1.grille[i + j * gridY];
            if (cell.pickedTile != -1) {
                cell.pickedTile.drawTile(i * imageSize.x, j * imageSize.y, imageSize.x, imageSize.y);
            } else {
                ctx.fillStyle = '#000000';
                ctx.strokeRect(i * imageSize.x, j * imageSize.y, imageSize.x, imageSize.y);
            }
        }
    }
}

function draw() {
    if (!finished) {
        collapse(grille1);
        isCollapsed();
    }
}
function update() {
    draw();
}

setInterval(update, 10);
