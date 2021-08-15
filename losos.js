var viev = {
	disMessage : function (message) {
	 	var divMes = document.getElementById("message");
	 	divMes.innerHTML = message;
	},
	disHit : function (location) {
		var divLoc = document.getElementById(location);
		divLoc.setAttribute("class","hit");
	},
	disMiss : function (location) {
		var divLoc = document.getElementById(location);
		divLoc.setAttribute("class","miss");
	},
	disInitially : function (location) {
		var divLoc = document.getElementById(location);
		divLoc.setAttribute("class","");
	}
};

var model = {
	bordSize : 5,
	numShip : 3,
	shipLength : 2,
	shipDeath : 0,
	ships : [
	{loc : [0,0], hit :  ["",""]},
	{loc : [0,0], hit :  ["",""]}, 
	{loc : [0,0], hit :  ["",""]} ],

	MyShips : [
	{loc : [0,0], hit :  ["",""]},
	{loc : [0,0], hit :  ["",""]}, 
	{loc : [0,0], hit :  ["",""]} ],

	fire : function (gues) {
		var index;
		var ship;
		for (var i = 0; i < this.numShip; i++) {
			ship = this.ships[i]; 
			index = ship.loc.indexOf(gues);
			if (index > -1) {
				ship.hit[index] = "hit";
				viev.disHit(gues);
				viev.disMessage("Корабль подбит");
				if (this.isSun(ship)) {
					this.shipDeath++;
					viev.disMessage("Корабль потоплен");
					return true;
				}
				return true;
			}
		}
		viev.disMiss(gues);
		viev.disMessage("корабля тут нет");
		return false;
	},

	isSun : function (ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hit[i] == !"hit") {
				return false;
			}
		}
		return true;
	},


	genShipLoc : function () {
		var location;
		for (var i = 0; i < this.numShip; i++) {
			do  {
				location = this.genShip();
			} while (this.testLoc(location));
		this.ships[i].loc = location;
		}
	},

	genShip : function () {
		var smot = Math.floor(Math.random() * 2);
		var row,col;
		var newLocShip = [];
		if (smot === 1) { // по горизонтали
			row = 1 + Math.floor((Math.random() * (this.bordSize - (this.shipLength - 1))));
			col = 1 + Math.floor(Math.random() * this.bordSize);
		} else { // по вертикали
			row = 1 + Math.floor(Math.random() * this.bordSize);
			col = 1 + Math.floor((Math.random() * (this.bordSize - (this.shipLength - 1))));
		}

		for (var i = 0; i < this.shipLength; i++) {
			if (smot === 1) { 	// по горизонтали
				newLocShip.push(Number(col + "" + (row + i))); 
			} else {  				// по вертикали
				newLocShip.push(Number((col + i) + "" + row));
			}
		}
		return newLocShip;
	},

	testLoc : function (location) {
		for (var i = 0; i < this.numShip; i++)	{
			var ship = model.ships[i];
			for(var j = 0; j < location.length; j++) {
				if (ship.loc.indexOf(location[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};

var controler = {
	gues : 0,
	procesGues : function (gues) { //координаты типа А2 или 12 и их проверка
		if (isNaN(gues)) {
			var location = controler.testGeus(gues);
			if (location) {
				this.GuesTrue (location);
			}
		} else {
			this.GuesTrue (gues);
		} 
	},

	GuesTrue : function (gues) {
		var hit;
		if ((gues.substring(0,1) !== "") && (gues.substring(1) !== "")) { //проврка на клик вне поля
			gues = Number(gues);
			hit = model.fire(gues);
			this.gues++;
			if (hit) {
				if (hit && model.numShip === model.shipDeath) {
					alert("победа за " + this.gues + " выстрелов")
				}
			}
		}
	},

	testGeus : function (geus) { //перевод ввовда координаты типа А2 превращаются в 12
		var alphavete = ["A","B","C","D","E"];
		var startShar;
		var row;
		var goriz;
		if (geus.length !== 2 || geus == null) {
			return null;

		} else {
			startShar = geus.charAt(0);
			row = alphavete.indexOf(startShar) + 1;
			goriz = geus.charAt(1);
			if (isNaN(goriz) || isNaN(row)) {
			} else 
				if (model.bordSize < goriz || model.bordSize < row || goriz < 1 || row < 1) {

				} else {
					return row + goriz;
				}
		}
		return null;
	},
};

var placement = { 
	orientation : "hor", //or ver
	coordinateSeeCursor : ["0","0"], //видимый кораблик
	numberShipInstallation : 0,
	pointingOnBlock : function (coordinate) {
		let dontHorLoc;
		coordinate = coordinate.target;
		if (coordinate.id !== "") { 			 //проверка на неигровые ячейки поля (таблицы)
			for (let i = 0; i < 2; i++) {		 //удаление предыдущего поля
				if ((placement.coordinateSeeCursor[i] !== "0")) { // проверка на первый кораблик
					viev.disInitially(placement.coordinateSeeCursor[i]);
				}
			}   // прикольчик получился при наведении на правый край
			if (placement.orientation == "hor" && (coordinate.id.substring(2) < model.bordSize)) {   // проверка ореинтации и на выход за поле 
				dontHorLoc = coordinate.id.substring(0,2); // строчка для горизонтали
				for (let i = 0; i < 2; i++) { 
					viev.disMiss(dontHorLoc + (Number(coordinate.id.substring(2)) + i));
					placement.coordinateSeeCursor[i] = dontHorLoc + (Number(coordinate.id.substring(2)) + i); // this тут не работает undefined
				} 
			} else if (coordinate.id.substring(1,2) > 1) { 
				if (coordinate.id.substring(1,2) > 1) { // проверка на заступ сверху
					dontHorLoc = coordinate.id.substring(0,1); // строчка для вертикали
					for (let i = 0; i < 2; i++) {
						viev.disMiss(dontHorLoc + (Number(coordinate.id.substring(1,2)) - i) + coordinate.id.substring(2));
						placement.coordinateSeeCursor[i] = dontHorLoc + (Number(coordinate.id.substring(1,2)) - i) + coordinate.id.substring(2);
					}
				}
			} else {
				if (coordinate.id.substring(2) < model.bordSize) {
					dontHorLoc = coordinate.id.substring(0,2); // строчка для горизонтали
					for (let i = 0; i < 2; i++) { 
						viev.disMiss(dontHorLoc + (Number(coordinate.id.substring(2)) + i));
						placement.coordinateSeeCursor[i] = dontHorLoc + (Number(coordinate.id.substring(2)) + i); // this тут не работает undefined 
					} 
				}
			}
		}
	},

	chooseOrientation : function (event) {
		if (event.code == "Space") {
			if (placement.orientation == "hor") {
				placement.orientation = "ver";

			} else {
				placement.orientation = "hor";
			}
		}
		let elements = document.querySelectorAll("div#board2 > table.one > tbody > tr > td"); //что это за tbody? Откуда он появился ?
		for (let i = elements.length - 1; i >= 0; i--) {
			elements[i].onmouseover = placement.pointingOnBlock; // зачем приставка on ?
		}
	},

	installingShip : function () {
		if (placement.numberShipInstallation < 3) {
			model.MyShips[placement.numberShipInstallation].loc[0] = placement.coordinateSeeCursor[0];
			model.MyShips[placement.numberShipInstallation].loc[1] = placement.coordinateSeeCursor[1];
			placement.numberShipInstallation++;
		} 
	}
};


function enter (e) {
	var n = document.getElementById("fierButton");
	if (e.keyCode === 13) {
		n.click();
		return false;
	}
}

function faa() {  // кордината от формы
	var doc = document.getElementById("guessInput");
	var gues = doc.value;
	controler.procesGues(gues);
	doc.value = "";
	event.preventDefault()
}

function klic () {  // обработчик событий на нажатие
	var coub = document.getElementsByTagName("td");
	for (var i = 0; i < coub.length; i++) {
		coub[i].onclick = klikBoard;
	}
}
function klikBoard (coub) {  // обработка сообщения от нажатия
	var koob = coub.target.id;
	controler.procesGues(koob);
}

window.onload = function () {
	klic(); // обработчик событий на нажатие
	var bon = document.getElementById("fierButton");   //кнопка
	bon.onclick = faa;	//кнопка
	var ban = document.getElementById("guessInput"); //ентер
	ban.onkeypress = enter; //ентер
	model.genShipLoc(); //ГЕНЕРАЦИЯ КОРАБЛИКОВ
	let elements = document.querySelectorAll("div#board2 > table.one > tbody > tr > td"); //что это за tbody? Откуда он появился ?
		for (let i = elements.length - 1; i >= 0; i--) {
			elements[i].onmouseover = placement.pointingOnBlock; // зачем приставка on ?
			elements[i].onmousedown = placement.installingShip;
		}
	document.addEventListener('keydown', placement.chooseOrientation);
};