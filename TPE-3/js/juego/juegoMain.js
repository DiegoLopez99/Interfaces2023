"use strict";

function cargar(e){
    e.preventDefault();
    filtro.classList.remove("activar");
    menuIncio.classList.remove("activar");
    let formData= new FormData(form);
    let mode=formData.get("cantFichasGanar");
    let player1=formData.get("nombreJugador1");
    let p1img=formData.get("seleccionJugador1");
    let player2=formData.get("nombreJugador2");
    let p2img=formData.get("seleccionJugador2");
    load(mode,player1,p1img,player2,p2img)
}

function load(mode,player1name,imgP1,player2name,imgP2) {
    //boton reinicio
    let btnReset = document.getElementById('reset');
    btnReset.addEventListener('click', reset);
    //canvas
    let canvas = document.querySelector('#canvas');
    let contenedorCanvas = document.querySelector("#contenedorCanvas"); 
    canvas.classList.add("mostrarCanvas");
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext('2d');
    let canvasHeight = contenedorCanvas.clientHeight;
    let canvasWidth = contenedorCanvas.clientWidth;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    //mostrar Score
    document.querySelector('.score').classList.add('mostrarScore');
    //agregar nombre jugadores a score
    let spanName1 = document.querySelector("#nameJugador1Score"); 
    let spanName2 = document.querySelector("#nameJugador2Score");
    spanName1.textContent = player1name;
    spanName2.textContent = player2name;

    let selectedChip = null;
    let figures = [];
    let board = [];
    let imgBoard = "./img/Fichas/boardCell.png";
    let imgPlayer1 = "./img/Fichas/"+imgP1+".png";
    let imgPlayer2 = "./img/Fichas/"+imgP2+".png";
    let inicioX = 0;
    let inicioY = 0;

    let inLine = mode;
    let columns= Number(inLine)+3;
    console.log(columns);
    let rows = Number(inLine)+2;
    console.log(rows);
    let maxChips = columns * rows;

    const SIZEPOSBOARD = 55;
    const SIZECHIP = 25;

    let widthBoard = columns * SIZEPOSBOARD;
    let heigthBoard = rows * SIZEPOSBOARD;

    let player1 = new Player(player1name, 1);
    let chipsPlayer1 = [];

    let player2 = new Player(player2name, 2);
    let chipsPlayer2 = [];

    let playerTurn = 1;
    let chipsPlayed = 0;

    //ubicacion x y inicial del tablero
    let locationBoardX = (canvasWidth / 2) - (((columns) * SIZEPOSBOARD) / 2);
    let locationBoardY = (canvasHeight / 2) - (((SIZEPOSBOARD) * (rows)) / 2)+42;

    initEvents();
    initBoard();

    //redibuja el canvas
    function redraw() {
        clearCanvas();
        
        drawDropZone();
        drawChips();
        drawBoard();


    }

    //se inicia el tablero creandolas zonas, fichas y dropZones
    function initBoard() {
        let locationBoxX = locationBoardX;
        let locationBoxY = locationBoardY;
        for (let r = 0; r < rows; r++) {
            let aux = [];
            for (let c = 0; c < columns; c++) {
                if (c == 0) {
                    locationBoxX = locationBoardX;
                }
                //addZone dibuja el Box o Zone y lo agrega a board
                let rect = addZone(locationBoxX, locationBoxY);
                locationBoxX += SIZEPOSBOARD;
                aux.push(rect);
            }
            locationBoxX -= SIZEPOSBOARD * columns + SIZEPOSBOARD;
            locationBoxY += SIZEPOSBOARD;
            figures.push(aux);
        }
        drawDropZone();
        console.log("board: ", board);
        initChips();
        console.log("chipsPlayer1: ", chipsPlayer1);
        console.log("chipsPlayer2: ", chipsPlayer2);
        console.log("figures: ", figures);
    }

    //Inicia las fichas de cada jugador
    function initChips() {
        for (let i = 0; i < maxChips / 2; i++) {
            //fichas jugador1
            let posX = locationBoardX - SIZEPOSBOARD - Math.round(Math.random() * SIZEPOSBOARD * 2);
            let posY = Math.round(Math.random() * (heigthBoard - SIZEPOSBOARD)) + locationBoardY + SIZEPOSBOARD / 2;
            let singleChipP1 = new Chip(posX, posY, SIZECHIP, ctx, player1);
            chipsPlayer1.push(singleChipP1);

            //fichas jugador 2
            posX = locationBoardX + widthBoard + SIZEPOSBOARD + Math.round(Math.random() * SIZEPOSBOARD * 2);
            posY = Math.round(Math.random() * (heigthBoard - SIZEPOSBOARD)) + locationBoardY + SIZEPOSBOARD / 2;
            let singleChipP2 = new Chip(posX, posY, SIZECHIP, ctx, player2);
            chipsPlayer2.push(singleChipP2);

        }
        drawChips();
    }

    //crea box para tablero a partir de clase zone y los mete en board=[]
    function addZone(locationChipX, locationChipY) {
        let rectangle = new Zone(locationChipX, locationChipY, SIZEPOSBOARD, ctx);
        board.push(rectangle);
        drawBoard();
        return rectangle;
    }

    //......................................................................................................
    //metodos dibujar
    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawDropZone() {
        for (let c = 0; c < columns; c++) {
            let x = locationBoardX + (c * SIZEPOSBOARD);
            let y = locationBoardY - SIZEPOSBOARD;
            let zone = new Zone(x, y, SIZEPOSBOARD, ctx, c);
            zone.draw();
        }
    }

    function drawChips() {
        for (let i = 0; i < chipsPlayer1.length; i++) {
            chipsPlayer1[i].drawImg(imgPlayer1);
            chipsPlayer2[i].drawImg(imgPlayer2);
        }
    }

    function drawBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i].drawImg(imgBoard);
        }
    }
    //......................................................................................................

    //eventos del juego - mouse
    function initEvents() {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
    }


    function onMouseDown(event) {
        if (playerTurn == 1) {//cambiar
            for (var i = 0; i < chipsPlayer1.length; i++) {
                const rect = canvas.getBoundingClientRect(); // Obtener la posición del canvas
                const mouseX = event.clientX - rect.left; // Coordenada X relativa al canvas
                const mouseY = event.clientY - rect.top;  // Coordenada Y relativa al canvas

                if (chipsPlayer1[i].isCliked(mouseX, mouseY)) {
                    selectedChip = chipsPlayer1[i];
                    inicioY = mouseY - chipsPlayer1[i].y;
                    inicioX = mouseX - chipsPlayer1[i].x;
                }
            }

        }
        else if (playerTurn == 2) {
            for (var i = 0; i < chipsPlayer2.length; i++) {
                const rect = canvas.getBoundingClientRect(); // Obtener la posición del canvas
                const mouseX = event.clientX - rect.left; 
                const mouseY = event.clientY - rect.top;  

                if (chipsPlayer2[i].isCliked(mouseX, mouseY)) {
                    selectedChip = chipsPlayer2[i];
                    inicioY = mouseY - chipsPlayer2[i].y;
                    inicioX = mouseX - chipsPlayer2[i].x;
                }
            }
        }
    }

    function onMouseMove(event) {
        if (selectedChip != null) {
            const rect = canvas.getBoundingClientRect(); // Obtener la posición del canvas
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;  
    
            selectedChip.setX(mouseX - inicioX);
            selectedChip.setY(mouseY - inicioY);
        }
        redraw();
    }

    function onMouseUp(event) {
        if (selectedChip != null) {
            let insert = (selectedChip.getX() > locationBoardX && selectedChip.getX() < locationBoardX + widthBoard)
                && (selectedChip.getY() < locationBoardY && selectedChip.getY() > locationBoardY - SIZEPOSBOARD * 2);
    
            if (insert) {
                insertChip(returnColumnNum(selectedChip.getX()), selectedChip);
                changeTurn();
            } else {
                selectedChip.setX(selectedChip.getInitialX());
                selectedChip.setY(selectedChip.getInitialY());
            }
            selectedChip = null;
        }
    }

    //Cambia el turno de los jugadores
    function changeTurn() {
        if (playerTurn == 1) {
            playerTurn = 2;
        }
        else if (playerTurn == 2) {
            playerTurn = 1;
        }
    }

    //......................................
    //Logica
    function returnColumnNum(chipX) {
        let i = 0;
        let currentCol = locationBoardX + SIZEPOSBOARD;
        if (chipX < currentCol) {
            return i
        } else {
            while (currentCol < chipX) {
                currentCol += SIZEPOSBOARD;
                i++;
            } return i;
        }
    }

    //insertar ficha en el tablero
    function insertChip(numCol, chip) {
        const firstEmptyRow = getFirstEmptyRow(numCol);

        if (firstEmptyRow === -1) {
            chip.setX(chip.getInitialX());
            chip.setY(chip.getInitialY());
            alert('Cannot put here, it is full');
            changeTurn();
            return;
        }
        chipsPlayed++;
        setTimeout(() => {
            if (chipsPlayed == maxChips) {
                alert("empate");
                return;
            };
        }, 500)
        let box = figures[firstEmptyRow][numCol]
        //box va a ser el casillero donde "cae" la ficha
        box.setChip(chip);
        box.setIsChipInside(true);
        console.log(figures)
        chip.setX(box.getMiddleX(SIZEPOSBOARD));
        chip.setY(box.getMiddleY(SIZEPOSBOARD));
        chip.setCanMove(false);
        setTimeout(() => {
            if (checkWinner()) {
                console.log(chip.getPlayer());
                alert("Ganador: " + chip.getPlayer().getName());
                reset();
            };
        }, 300)
    }

    //Devuelve la primera fila libre de la columna
    function getFirstEmptyRow(numCol) {
        let i = 0;
        if (figures[i][numCol].isChipInside) {
            return -1;
        } else {
            while ((i < rows) && (figures[i][numCol].isChipInside) === false) {
                console.log(figures[i][numCol].isChipInside)
                i++
            }
            return i - 1
        }
    }

    //Logica del ganador
    function checkWinner() {
        //Buscamos en horizontal
        for (var f = 0; f < rows; f++) {
            var n1 = 0;
            var n2 = 0;
            for (var c = 0; c < columns; c++) {
                if (figures[f][c].getChip() == null) {
                    n1 = 0;
                    n2 = 0;
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }

        //Buscamos en vertical de abajo a arriba
        for (var c = 0; c < columns; c++) {
            var n1 = 0;
            var n2 = 0;
            for (var f = rows - 1; f >= 0; f--) {	//De abajo a arriba para poder cortar.
                if (figures[f][c].getChip() == null) {
                    break;	//Ya no hay mas en la columna.
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }

        //Buscamos en diagonal de izquierda a derecha
        for (var i = 0; i < columns; i++) {//ver la constante en cod
            var n1 = 0;
            var n2 = 0;
            for (var f = 0; f < rows; f++) {
                var c = i + f;
                if ((c < 0) || (c >= columns))
                    continue;
                if (figures[f][c].getChip() == null) {
                    n1 = 0;
                    n2 = 0;
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }

        //Buscamos en diagonal de derecha a izquierda
        for (var i = 0; i < columns + 4; i++) {
            var n1 = 0;
            var n2 = 0;
            for (var f = 0; f < rows; f++) {
                var c = i - f;
                if ((c < 0) || (c >= columns))
                    continue;
                if (figures[f][c].getChip() == null) {
                    n1 = 0;
                    n2 = 0;
                }
                else if (figures[f][c].getChip().getPlayer().getNumber() == 1) {
                    n1++;
                    n2 = 0;
                    if (n1 == inLine)
                        return 1;
                }
                else {
                    n1 = 0;
                    n2++;
                    if (n2 == inLine)
                        return 2;
                }
            }
        }
    }
    
    //Resetea el juego
    function reset() {
        chipsPlayer1 = [];
        chipsPlayer2 = [];
        figures = [];
        board = [];
        chipsPlayed = 0;
        playerTurn = true
        min = 2;
        sec = 59;
        initBoard();
        redraw();
    }

    //Variables timer
    let minute = document.getElementById('minute');
    let second = document.getElementById('seconds');
    let min = 2;
    let sec = 59;

    setInterval(function restSec() {
        if (sec >= 0) {
            second.innerHTML = sec + "s";
            minute.innerHTML = min + "m";
            sec--;
            checkFinished();
        }
    }, 1000);

    setInterval(function restMin() {
        if (min > 0) {

            min--;
            sec = 59;
        }

    }, 60000);

    function checkFinished(){
        if(min== 0 && sec == -1){
            reset();
        }
    }
}

//Muestra el menu del juego
function mostrarMenuJuego(){
    filtro.classList.add("activar");
    menuIncio.classList.add("activar");
    document.querySelector('.videoJuego').classList.add('inactivo');
    document.querySelector('.instrucciones').classList.add('inactivo');
};

let form=document.querySelector("#formJuego");
let filtro = document.querySelector('#filtro');
let menuIncio = document.querySelector('#MenuInicioJuego');
document.querySelector('#btnPlay').addEventListener("click", mostrarMenuJuego);
form.addEventListener("submit", cargar);