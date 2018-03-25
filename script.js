let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resultList = document.querySelector('.results');

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

const addButton = document.getElementById('add');
addButton.addEventListener('click', () => stopwatch.addToList());

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clearList());


class Stopwatch {
    constructor(display) {
        this.running = false; //running - odpawiada za to, czy stoper pracuje
        this.display = display; //element DOM, pod którym znajduje się stoper
        this.reset(); //reset licznika
        this.print(this.times); //drukowanie czasów
    }

	reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

	print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) { //zwraca szablon, który wykorzystuje obiekt times
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`; 
	}

	start() {
    	if (!this.running) { //sprawdza czy stoper już nie chodzi
        	this.running = true; //jeśli stoper był zatrzymany należy go uruchomić
        	this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() { //jeśli stoper jest uruchomiony, to trzeba przeliczyć wynik i go wudrukować
    	if (!this.running) return;
    		this.calculate();
    		this.print();
		}

	calculate() { //zeruje wartości milisekund i sekud po przekroczeniu odpowiedznich liczb, przy równoczesnym zwiększaniu odpowiednio sekund i minut
    	this.times.miliseconds += 1;
    	if (this.times.miliseconds >= 100) {
      		this.times.seconds += 1;
        	this.times.miliseconds = 0;
    	}
    	if (this.times.seconds >= 60) {
        	this.times.minutes += 1;
        	this.times.seconds = 0;
    	}
	}

    stop() {
    	this.running = false;
    	clearInterval(this.watch);
	}

	resetTimer() { //resretuje cały stoper
		this.stop();
		this.reset();
		this.print();
	}

	addToList() { //dodaje element do listy
        let itemList = document.createElement('li'); 
        itemList.innerText = this.format(this.times);
        resultList.appendChild(itemList);
    }

    clearList() { //czyści listę czasów
        resultList.innerText = '';
    }

}

function pad0(value) { //pad0 dodaje 0 do liczb jednocyfrowych
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));
