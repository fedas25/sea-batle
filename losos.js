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
	bordSize : 4,
	numShip : 3,
	shipLength : 2,
	shipDeath : 0,
	ships : [
	{loc : [11,21], hit :  ["","hit"]},
	{loc : [41,42], hit :  ["","hit"]}, 
	{loc : [32,33], hit :  ["","hit"]} ],

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
	}
};

var controler = {
	gues : 0,
	procesGues : function (gues) { //координаты типа А2
		var location = controler.testGeus(gues);
		var hit;
		if (location) {	
			location = Number(location);
			hit = model.fire(location);
			if (hit) {
				this.gues++;
				console.log('');
				if (hit && model.numShip === model.shipDeath) {
					alert("победа за " + this.gues + " выстрелов")
				}
			}
		} 

	},

	testGeus : function (geus) {
		var alphavete = ["A","B","C","D"];
		var startShar;
		var row;
		var goriz;
		if (geus.length !== 2 || geus == null) {
			return null;
			//alert("не те значения");
		} else {
			startShar = geus.charAt(0);
			row = alphavete.indexOf(startShar) + 1;

			goriz = geus.charAt(1);
			if (isNaN(goriz) || isNaN(row)) {
			//	alert("не те значения");
			} else 
				if (model.bordSize < goriz || model.bordSize < row || goriz < 1 || row < 1) {
					//alert("не те значения");
				} else {
					return row + goriz;
				}
		}
		return null;
	}
}

controler.procesGues("A1");
controler.procesGues("D1");
controler.procesGues("C2");