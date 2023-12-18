let DateNow = function() {

    this.dateNow = new Date();

}


let Time = function() {

    Time.prototype = new DateNow();

    this.dateNow = DateNow.bind(this);
    this.dateNow();

    this.zero = function(num) {
        if (num <= 9) {
            return num = '0' + num;
        } else {
            return num;
        }
    };

    this.timeNow =this.zero(this.dateNow.getHours()) + ':' + this.zero(this.dateNow.getMinutes()) + ':' + this.zero(this.dateNow.getSeconds());

    this.dateNow =this.zero(this.dateNow.getDay()) + ':' + this.zero(this.dateNow.getMonth()) + ':' + this.zero(this.dateNow.getFullYear());
}


let Alarm = function(signal, hours, minutes) {

    Time.apply(this, arguments);

    let zero = this.zero.bind(this);

    this.statusAlarm = false;

    let signalAlarm = signal || 'pi-pi-pi';
    let hourSet = hours || null;
    let minSet = minutes || null;

    if (hourSet !== null && minSet !== null) this.statusAlarm = true;


    this.onAlarm = function() {
        let dateNow = new Date();

        if (hourSet == dateNow.getHours() && minSet == dateNow.getMinutes()) {
            alert('Уведомление:' + '\n' + signalAlarm + '\n'+ zero(hourSet) + ':' + zero(minSet))
        };
    };

};


let Timer = function(secTimer) {

    let minTimer = secTimer || null;

    let setMin = minTimer * 1000;  // в секундах

    this.statusTimer = false;

    if (this.minTimer !== null) this.statusTimer = true;

    let timeout = function() {
        alert('Уведомление: ' + minTimer + ' сек.'  + '\n' + '00:00:00' + '\n'+ 'время вышло')
    }
    this.onTimer = function() {
        if (this.statusTimer == true) setTimeout(timeout, setMin);
    };

};


let Clock = function(type, form, color, signal, hours, minutes, secTimer) {

    Time.apply(this);
    let zero = this.zero.bind(this);

    Alarm.call(this, signal, hours, minutes);
    Timer.apply(this, [secTimer]);

    this.type = type || 'pointer';
    this.form = form || 'round';
    this.color = color || 'white';

    this.show = function() {
        console.log(`Текущая дата: ${this.dateNow}.\nТекущее время: ${this.timeNow}.\nБудильник установлен: ${zero(hours)}:${zero(minutes)}.\nТаймер: ${secTimer} секунд.`);
    }

    if (this.statusAlarm == true) this.onAlarm();

    if (this.statusTimer == true) this.onTimer();

};

let clock1 = new Clock('digital', 'square', 'green', 'trrr-trrr-trrr', 9, 52, 5);

console.log(clock1);

window.addEventListener('load', function() {

    clock1.show();

});