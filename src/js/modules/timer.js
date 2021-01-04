const timer = (id, deadline) => {
    const addZero = (num) => num <= 9 ? '0' + num : num.toString();

    const getTimeRemaining = endTime => {
        const total = Date.parse(endTime) - Date.parse(new Date());
        const seconds = addZero(Math.floor((total / 1000) % 60));
        const minutes = addZero(Math.floor((total / 1000 / 60) % 60));
        const hours = addZero(Math.floor((total / 1000 / 60 / 60) % 24));
        const days = addZero(Math.floor(total / 1000 / 60 / 60 / 24));

        return {
            total, days, hours, minutes, seconds
        }
    };

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        updateClock();

        const timeInterval = setInterval(updateClock, 1000);
        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0 ) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval)
            }
        }
    };

    setClock(id, deadline);
};

export default timer;
