// 
document.addEventListener("DOMContentLoaded", () => {
    // оголошення змінних, зв'язок з HTML 
    const startButton = document.querySelector("[data-start]");
    const daysElement = document.querySelector("[data-days]");
    const hoursElement = document.querySelector("[data-hours]");
    const minutesElement = document.querySelector("[data-minutes]");
    const secondsElement = document.querySelector("[data-seconds]");
    const dateInput = document.querySelector("#datetime-picker");
    let countdownInterval;
    let selectedDate;
    
    // ініціалізація випадаючого календарика
    flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            selectedDate = selectedDates[0];
            if (selectedDate > new Date()) {
                startButton.disabled = false;
            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                    position: 'topRight'
                });
                startButton.disabled = true;
            }
        }
    });
    // перевірка ініціалізації
    console.log("Flatpickr initialized"); 
    
    // активація кнопки
    startButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
    
        // Блокуємо можливість вибору дати
        dateInput.disabled = true; // Блокує input
        picker.destroy(); // Повністю відключає Flatpickr
    });
    
    
    // відлік таймера
    function updateTimer() {
        const now = new Date();
        const timeRemaining = selectedDate - now;
        
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            iziToast.success({
                title: 'Done',
                message: 'Countdown finished!',
                position: 'topRight'
            });
             // Розблоковуємо input після завершення таймера
             dateInput.disabled = false;
            return;
        }
        
        // конвертація в зручний для читання формат
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        
        // привласнення вихідних значень таймера
        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
    }
    
    // Конвертуємо UNIX формат часу в прийнятний для сприймання
    function convertMs(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        return { days, hours, minutes, seconds };
    }
    console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
    console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
    console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
    
    // Додаємо "0" для прийнятного формату часу
    function formatTime(value) {
        return String(value).padStart(2, "0");
    }
});
