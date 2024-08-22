

// ====================================================================================================

// @ Selector

// ====================================================================================================

class Selector {

	// Declaración

	location;

	testing;

	setting;

	steps;

	

	// Constructor

	constructor(location, setting, testing){

		this.location = location;

		this.testing = testing;

		this.setting = setting;

		this.steps = 0;

	}

	

	// Moverse

	move(axe, increment = 1){

		switch(axe){

			case "x":

				this.location.x += increment;

				this.steps++;

				break;

			case "y":

				this.location.y += increment;

				this.steps++;

				break;

			case "z":

				this.location.z += increment;

				this.steps++;

				break;

			default:

				break;

		}

	}

}





// ====================================================================================================

// @ Tail

// ====================================================================================================

class Tail extends Selector {

	constructor(location, setting){

		super(location, setting);

	}

	

	// ====================================================================================================

	// Avanzar

	// ====================================================================================================

	forward(direction){

		// Destruir bloque (verificar error) (pre release)

		this.setting(this.location, "void");

		

		switch(direction){

			case "East":

				this.move("x", 1);

				break;

			case "West":

				this.move("x", -1);

				break;

			case "North":

				this.move("z", 1);

				break;

			case "South":

				this.move("z", -1);

				break;

			default:

				break;

		}

	}

	

	// ====================================================================================================

	// Mover hacia el vértice (verificar error)

	// ====================================================================================================

	moveToVertice(vertices){

		if(vertices[0] === undefined) return;	// (añadir objeto error)

		

		// Avanzar

		this.forward(vertices[0].direction);

		

		// Verificar pasos

		if(vertices[0].steps <= 1){

			vertices.shift();

		}

		else {

			vertices[0].steps--;

		}

	}

}





// ====================================================================================================

// @ Head

// ====================================================================================================

class Head extends Selector {

	blockSnake;

	listVertices;

	direction;

	grow;

	live;

	tail; 

	

	constructor(blockSnake, location, direction, setting, testing){

		super(location, setting, testing);

		this.tail = new Tail(location, setting);

		this.blockSnake = blockSnake;

		this.listVertices = new Array();

		this.direction = direction;

		this.grow = 2;

		this.live = true;

	}

	

	

	// ====================================================================================================

	// Generar vertice

	// ====================================================================================================

	generateVertice(direction = this.direction, steps = this.steps){

		this.listVertices.push({ direction, steps });

		this.steps = 0;

	}

	

	

	// ====================================================================================================

	// Rotar

	// ====================================================================================================

	rotate(){

		// filtro de controles (cambiar a una dirección que no sea actual ni opuesta y vértice)

	}

	

	

	// ====================================================================================================

	// Avanzar

	// ====================================================================================================

	forward(){

		switch(this.direction){

			case "East":

				this.move("x", 1);

				break;

			case "West":

				this.move("x", -1);

				break;

			case "North":

				this.move("z", 1);

				break;

			case "South":

				this.move("z", -1);

				break;

			default:

				break;

		}

		

		// Detectar alimento (verificar error)

		if(this.testing(this.location, this.blockSnake[0])){

			this.grow += 1;

		}

		

		// Colocar bloque (verificar errores) (pre release)

		this.setting(this.location, this.blockSnake[1]);

		

		// Mover cola

		if(this.grow > 0){

			this.grow--;

		}

		else {

			if(this.listVertices.length > 0){

				this.tail.moveToVertice(this.listVertices)

			}

			else {

				this.tail.forward(this.direction);

			}

		}

		

	}

}



// ====================================================================================================

// @ Exportaciones

// ====================================================================================================

export { Tail, Head };
