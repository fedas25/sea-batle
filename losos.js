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
		gues = Number(gues);
		var hit;
		hit = model.fire(gues);
		if (hit) {
			this.gues++;
			console.log('');
			if (hit && model.numShip === model.shipDeath) {
				alert("победа за " + this.gues + " выстрелов")
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
};