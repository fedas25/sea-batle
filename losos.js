// var viev = {
// 	disMessage : function (message) {
// 	 	var divMes = document.getElementById("message");
// 	 	divMes.innerHTML = message;
// 	},
// 	disHit : function (location) {
// 		var divLoc = document.getElementById(location);
// 		divLoc.setAttribute("class","hit");
// 	},
// 	disMiss : function (location) {
// 		var divLoc = document.getElementById(location);
// 		divLoc.setAttribute("class","miss");
// 	},
// 	disMissUser : function (location) {
// 		var divLoc = document.getElementById(location);
// 		divLoc.setAttribute("class","miss_use");
// 	},
// 	disInitially : function (location) {
// 		var divLoc = document.getElementById(location);
// 		divLoc.setAttribute("class","");
// 	}
// };

// var model = {
// 	bordSize : 9,
// 	numShip : 10, 
// 	shipLength : 4,
// 	shipDeath : 0,
// 	shipDeathPs : 0,
// 	ships : [
// 		{loc : [0,0,0,0], hit :  ["","","",""]},
// 		{loc : [0,0,0], hit :  ["","",""]},
// 		{loc : [0,0,0], hit :  ["","",""]},
// 		{loc : [0,0], hit :  ["",""]},
// 		{loc : [0,0], hit :  ["",""]},
// 		{loc : [0,0], hit :  ["",""]},
// 		{loc : [0], hit :  [""]}, 
// 		{loc : [0], hit :  [""]}, 
// 		{loc : [0], hit :  [""]}, 
// 		{loc : [0], hit :  [""]}],

// 	MyShips : [
// 		{loc : [0,0,0,0], hit :  ["","","",""]},
// 		{loc : [0,0,0], hit :  ["","",""]},
// 		{loc : [0,0,0], hit :  ["","",""]},
// 		{loc : [0,0], hit :  ["",""]},
// 		{loc : [0,0], hit :  ["",""]},
// 		{loc : [0,0], hit :  ["",""]},
// 		{loc : [0], hit :  [""]}, 
// 		{loc : [0], hit :  [""]}, 
// 		{loc : [0], hit :  [""]}, 
// 		{loc : [0], hit :  [""]}],

// 	fire : function (gues) {
// 		var index;
// 		var ship;
// 		for (var i = 0; i < this.numShip; i++) {
// 			ship = this.ships[i]; 
// 			index = ship.loc.indexOf(gues);
// 			if (index > -1) {
// 				ship.hit[index] = "hit";
// 				viev.disHit(gues);
// 				viev.disMessage("Корабль подбит");
// 				// debugger
// 				if (this.isSun(ship)) {
// 					this.shipDeath++;
// 					viev.disMessage("Корабль потоплен");
// 					return true;
// 				}
// 				return true;
// 			}
// 		}
// 		viev.disMiss(gues);
// 		viev.disMessage("корабля тут нет");
// 		return false;
// 	},

// 	isSun : function (ship) {
// 		for (var i = 0; i < ship.loc.length; i++) {
// 			if (ship.hit[i] == !"hit") {
// 				return false;
// 			}
// 		}
// 		return true;
// 	},

// 	genShipLoc : function () {
// 		var location;
// 		for (var i = 0; i < this.numShip; i++) {
// 			this.shipLength = this.ships[i].loc.length;
// 			do  {
// 				location = this.genShip();
// 			} while (this.testLoc(location));

// 		this.ships[i].loc = location;

// 		}

// 	},

// 	genShip : function () {
// 		var smot = Math.floor(Math.random() * 2); // куды смотрит корабль
// 		var row, col;
// 		var newLocShip = [];
// 		if (smot === 1) { // по горизонтали
// 			row = 1 + Math.floor((Math.random() * (this.bordSize - (this.shipLength - 1)))); // шоб в за границу не уплыл
// 			col = 1 + Math.floor(Math.random() * this.bordSize);
// 		} else { // по вертикали
// 			row = 1 + Math.floor(Math.random() * this.bordSize);
// 			col = 1 + Math.floor((Math.random() * (this.bordSize - (this.shipLength - 1)))); // шоб в за границу не уплыл
// 		}

// 		for (var i = 0; i < this.shipLength; i++) {
// 			if (smot === 1) { 	// по горизонтали
// 				newLocShip.push(Number(col + "" + (row + i))); 
// 			} else {  				// по вертикали
// 				newLocShip.push(Number((col + i) + "" + row));
// 			}
// 		}
// 		return newLocShip;
// 	},

// 	testLoc : function (location) {
// 		for (var i = 0; i < this.numShip; i++)	{
// 			for(var j = 0; j < location.length; j++) {
// 				if (model.ships[i].loc.indexOf(location[j]) >= 0) { // проверка на наличие
// 					return true;
// 				}
// 			}
// 		}
// 		return false;
// 	},

// 	fireAtTheUser : function () {
// 		let cor
// 		let cell
// 		cor = "u11";
// 		cell = document.getElementById("u11");
// 		while (cell.className == "hit" || cell.className == "miss_use") {
// 			cor = String(Math.floor(Math.random() * model.bordSize) + 1);
// 			cor = "u" + cor + (Math.floor(Math.random() * model.bordSize) + 1);
// 			cell = document.getElementById(cor);
// 		}

// 		if (cell.className == "miss") {
// 			viev.disHit(cor);
// 			for (let i = 0; i < model.numShip; i++) {
// 				if (model.MyShips[i].loc.indexOf(cor) !== -1) {
// 					model.MyShips[i].hit[model.MyShips[i].loc.indexOf(cor)] = "hit";
// 				} 
// 				if (model.MyShips[i].hit.indexOf("") == -1) {
// 					viev.disMessage("Ваш кораблик утопился");
// 					model.MyShips[i].hit[0] = "";
// 					console.log(model.MyShips[i].hit);
// 					model.shipDeathPs++;
// 					if (model.shipDeathPs == 10) {
// 						alert("Вы проиграли компьютеру");
// 					}
// 				}
// 			}
// 		} else {
// 			viev.disMissUser(cor);
// 		}	
// 	}
// };

// var controler = {
// 	gues : 0,
// 	procesGues : function (gues) { //координаты типа А2 или 12 и их проверка
// 		if (isNaN(gues)) {
// 			var location = controler.testGeus(gues);
// 			if (location) {
// 				this.GuesTrue (location);
// 			}
// 		} else {
// 			this.GuesTrue (gues);
// 		} 
// 	},

// 	GuesTrue : function (gues) {
// 		var hit;
// 		// debugger
// 		if ((gues.substring(0,1) !== "") && (gues.substring(1) !== "")) { //проврка на клик вне поля
// 			gues = Number(gues);
// 			hit = model.fire(gues);
// 			this.gues++;
// 			if (hit) {
// 				if (hit && model.numShip === model.shipDeath) {
// 					alert("победа за " + this.gues + " выстрелов")
// 				}
// 			}
// 		}
// 		model.fireAtTheUser();
// 	},

// 	testGeus : function (geus) { //перевод ввовда координаты типа А2 превращаются в 12
// 		var alphavete = ["A","B","C","D","E"];
// 		var startShar;
// 		var row;
// 		var goriz;
// 		if (geus.length !== 2 || geus == null) {
// 			return null;

// 		} else {
// 			startShar = geus.charAt(0);
// 			row = alphavete.indexOf(startShar) + 1;
// 			goriz = geus.charAt(1);
// 			if (isNaN(goriz) || isNaN(row)) {
// 			} else 
// 				if (model.bordSize < goriz || model.bordSize < row || goriz < 1 || row < 1) {

// 				} else {
// 					return row + goriz;
// 				}
// 		}
// 		return null;
// 	},
// };

// var placement = { 
// 	orientation : "hor", //or ver
// 	coordinateSeeCursor : ["0","0","0","0"], //видимый кораблик
// 	numberShipInstallation : 0,
// 	placemenTOfShips : true,

// 	pointingOnBlock : function (coordinate) {

// 		let shipLength;
// 		let dontHorLoc;
// 		let ThereAreShips = false;
// 		coordinate = coordinate.target;		

// 		for (let i = 0; i < model.MyShips.length; i++) { // определение длины видимого корабля
// 			if (model.MyShips[i].loc[0] == 0) {
// 				shipLength = model.MyShips[i].loc.length;
// 				i = 10;
// 			}
// 		}

// 		if (coordinate.id !== "" && placement.placemenTOfShips ) { 		 //проверка на неигровые ячейки поля (таблицы)
// 			for (let i = 0; i < 10; i++) { // кол-во кораблей // проверка на наличие установленного корабля для обеления поля
// 				for (let j = 0; j < shipLength; j++) { // длина корабля видимого
// 					if (model.MyShips[i].loc.includes(placement.coordinateSeeCursor[j])) { // установленный кораблик
// 						ThereAreShips = true;
// 					}
// 				}
// 			}

// 			for (let i = 0; i < shipLength; i++) {		 // размер корабля видимого // удаление предыдущего поля
// 				if ((placement.coordinateSeeCursor[i] !== "0") && !ThereAreShips) { // проверка на первый кораблик
// 					viev.disInitially(placement.coordinateSeeCursor[i]);
// 				}
// 			}

// 			ThereAreShips = false; // обнуление переменной

// 			if (placement.orientation == "hor" && ((Number(coordinate.id.substring(2)) + (shipLength - 2)) < model.bordSize)) {// коэфициент   // проверка ореинтации и на выход за поле для переварота проверяется на правую
// 				dontHorLoc = coordinate.id.substring(0,2); // первые два символа
// 				 // строчка для горизонтал   
// 				for (let i = 0; i < 10; i++) {// кол во кораблей // проверка на наличие установленного корабля для нерисования клеток
// 					// коэфициенты
// 					if (model.MyShips[i].loc.includes(dontHorLoc + (Number(coordinate.id.substring(2)) + (shipLength - 1))) ||// коэфициент  // от и до смотрит
// 						model.MyShips[i].loc.includes(dontHorLoc + (Number(coordinate.id.substring(2)) + 0))) {
// 						ThereAreShips = true;
// 					}
// 				}

// 				for (let i = 0; i < shipLength; i++) { // размер корабля
// 					placement.coordinateSeeCursor[i] = dontHorLoc + (Number(coordinate.id.substring(2)) + i); //пропихиапние кординаты корабля локальные
// 					if (!ThereAreShips) {
// 						viev.disMiss(dontHorLoc + (Number(coordinate.id.substring(2)) + i));  // рисуем кораблик
// 					}
// 				}

// 				// пока до сюда
// 				// дошёл, молодец
// 				// да молодец

// 			}  else if ((Number(coordinate.id.substring(1,2)) + (2 - shipLength )) > 1) { // проверка на заступ сверху
// 				dontHorLoc = coordinate.id.substring(0,1); // строчка для вертикали
// 				for (let i = 0; i < 10; i++) { // проверка на наличие установленного корабля для нерисования клеток
// 					if (model.MyShips[i].loc.includes(dontHorLoc + (Number(coordinate.id.substring(1,2)) + (1 - shipLength )) + coordinate.id.substring(2)) ||
// 						model.MyShips[i].loc.includes(dontHorLoc + (Number(coordinate.id.substring(1,2)) - 0) + coordinate.id.substring(2))) {
// 						ThereAreShips = true;
// 					} 
// 				}
// 				for (let i = 0; i < shipLength; i++) { // рисует кораблики 
// 					placement.coordinateSeeCursor[i] = dontHorLoc + (Number(coordinate.id.substring(1,2)) - i) + coordinate.id.substring(2);
// 					if (!ThereAreShips) {
// 						viev.disMiss(dontHorLoc + (Number(coordinate.id.substring(1,2)) - i) + coordinate.id.substring(2));
// 					}
// 				}

// 				// сделал ?
// 				// работает
// 				// работает 
// 			} else {
// 				if ((Number(coordinate.id.substring(2)) + (shipLength - 2)) < model.bordSize) { // проверка на заступ с боку
// 					dontHorLoc = coordinate.id.substring(0,2); // строчка для горизонтали
// 					for (let i = 0; i < shipLength; i++) { 
// 						viev.disMiss(dontHorLoc + (Number(coordinate.id.substring(2)) + i));
// 						placement.coordinateSeeCursor[i] = dontHorLoc + (Number(coordinate.id.substring(2)) + i);
// 					} 
// 				}
// 			}
// 		}
// 	},


// 	installingShip : function () { // надо добить до 10 как то 
// 		if (placement.numberShipInstallation < 10) {

// 			for (let i = 0; i < model.MyShips[placement.numberShipInstallation].loc.length; i++ ) {
// 				model.MyShips[placement.numberShipInstallation].loc[i] = placement.coordinateSeeCursor[i];
// 			}
// 			// debugger
// 			placement.numberShipInstallation++;


// 		}
// 		if (placement.numberShipInstallation == 10) { //остановка режима заполнения поля
// 			placement.placemenTOfShips = false;
// 		}
// 	},

// 	chooseOrientation : function (event) {
// 		if (event.code == "Space") {
// 			if (placement.orientation == "hor") {
// 				placement.orientation = "ver";

// 			} else {
// 				placement.orientation = "hor";
// 			}
// 		}
// 		let elements = document.querySelectorAll("div#board2 > table.one > tbody > tr > td"); //что это за tbody? Откуда он появился ?
// 		for (let i = elements.length - 1; i >= 0; i--) {
// 			elements[i].onmouseover = placement.pointingOnBlock; // зачем приставка on ?
// 		}
// 	}

// };

// function enter (e) {
// 	var n = document.getElementById("fierButton");
// 	if (e.keyCode === 13) {
// 		n.click();
// 		return false;
// 	}
// }

// function faa() {  // кордината от формы
// 	var doc = document.getElementById("guessInput");
// 	var gues = doc.value;
// 	controler.procesGues(gues);
// 	doc.value = "";
// 	event.preventDefault()
// }

// function klic () {  // обработчик событий на нажатие
// 	var coub = document.getElementsByTagName("td");
// 	for (var i = 0; i < coub.length; i++) {
// 		coub[i].onclick = klikBoard;
// 	}
// }
// function klikBoard (coub) {  // обработка сообщения от нажатия
// 	var koob = coub.target.id;
// 	controler.procesGues(koob);
// }

// window.onload = function () {
// 	klic(); // обработчик событий на нажатие
// 	let bon = document.getElementById("fierButton");   //кнопка
// 	bon.onclick = faa;	//кнопка
// 	let ban = document.getElementById("guessInput"); //ентер
// 	ban.onkeypress = enter; //ентер
// 	model.genShipLoc(); //ГЕНЕРАЦИЯ КОРАБЛИКОВ
// 	let elements = document.querySelectorAll("div#board2 > table.one > tbody > tr > td"); //что это за tbody? Откуда он появился ?
// 		for (let i = elements.length - 1; i >= 0; i--) {
// 			elements[i].onmouseover = placement.pointingOnBlock; // зачем приставка on ?
// 			elements[i].onmousedown = placement.installingShip;
// 		}
// 	document.addEventListener('keydown', placement.chooseOrientation);
// };



// let presenceAnimation = false; window.innerWidth

let WidthWindow = 1920 + 310;
const clouds = document.querySelectorAll(".cloud");
let cloudLeft = null;
let newCloudLeft = null;
let presenceAnimation = false;

function flyingСlouds() {
	if (presenceAnimation = !presenceAnimation) {
		for (let cloud of clouds) {
			cloudLeft = Math.round(cloud.getBoundingClientRect().left);
			if (WidthWindow > cloudLeft) {
				newCloudLeft = cloudLeft + 1;
				cloud.style.transform = `translate(${newCloudLeft}px)`;
			} else {
				cloud.style.transform = `translate(-340px)`; 
			}
		}
	}
}
requestAnimationFrame(flyingСlouds);

flyingСlouds()