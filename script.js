const time = document.getElementById('pomodoro-time');
const timeArray = time.textContent.split(':');
const btnStart = document.getElementById('start');
const breakBtn = document.getElementById('break');
const pomodoroBtn = document.getElementById('pomodoro');
const resetBtn = document.getElementById('reset');

let minutes = +timeArray[0];
let seconds = +timeArray[1];
let timerId;

let isRunning = false;

breakBtn.addEventListener('click', function() {
    time.textContent = '05:00';
    breakBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    minutes = "5";
});

pomodoroBtn.addEventListener('click', function() {
    pomodoroBtn.classList.add('active');
    breakBtn.classList.remove('active');
    time.textContent = '25:00';
    minutes = +timeArray[0];
    seconds = +timeArray[1];
});

function format(val) {
    if (val < 10) {
        return (`0${val}`)
    }
    return val;
}

function startTimer() {
    if (isRunning) {
        stopTimer();
        return;
    }
    timerId = setInterval(() => {

        if (seconds > 0) {
            seconds -= 1;
        } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
        }

        if (seconds >= 0 && minutes >= 0) {
            time.textContent = `${format(minutes)}:${format(seconds)}`
        }

        if (seconds === 0 && minutes === 0) {
            clearInterval(timerId)
            if (pomodoroBtn.classList.contains('active')) {
                time.textContent = `25:00`;
            } else {
                time.textContent = `05:00`;
                minutes = "5";
            }
            btnStart.innerHTML = 'start';
        }
    }, 1)

    this.innerHTML = 'stop';
    isRunning = true;
}

function stopTimer() {
    isRunning = false;
    btnStart.innerHTML = 'start';
    clearInterval(timerId);
}

btnStart.addEventListener('click', startTimer)

resetBtn.addEventListener('click', function() {
    stopTimer()
    if (pomodoroBtn.classList.contains('active')) {
        time.textContent = `25:00`;
        minutes = +timeArray[0];
    } else {
        time.textContent = `05:00`;
        minutes = "5";
    }
    seconds = +timeArray[1];
})