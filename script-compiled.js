'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var resultList = document.querySelector('.results');

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.resetTimer();
});

var addButton = document.getElementById('add');
addButton.addEventListener('click', function () {
    return stopwatch.addToList();
});

var clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function () {
    return stopwatch.clearList();
});

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        this.running = false; //running - odpawiada za to, czy stoper pracuje
        this.display = display; //element DOM, pod którym znajduje się stoper
        this.reset(); //reset licznika
        this.print(this.times); //drukowanie czasów
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
        }
    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times);
        }
    }, {
        key: 'format',
        value: function format(times) {
            //zwraca szablon, który wykorzystuje obiekt times
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                //sprawdza czy stoper już nie chodzi
                this.running = true; //jeśli stoper był zatrzymany należy go uruchomić
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            //jeśli stoper jest uruchomiony, to trzeba przeliczyć wynik i go wudrukować
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            //zeruje wartości milisekund i sekud po przekroczeniu odpowiedznich liczb, przy równoczesnym zwiększaniu odpowiednio sekund i minut
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
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'resetTimer',
        value: function resetTimer() {
            //resretuje cały stoper
            this.stop();
            this.reset();
            this.print();
        }
    }, {
        key: 'addToList',
        value: function addToList() {
            //dodaje element do listy
            var itemList = document.createElement('li');
            itemList.innerText = this.format(this.times);
            resultList.appendChild(itemList);
        }
    }, {
        key: 'clearList',
        value: function clearList() {
            //czyści listę czasów
            resultList.innerText = '';
        }
    }]);

    return Stopwatch;
}();

function pad0(value) {
    //pad0 dodaje 0 do liczb jednocyfrowych
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
