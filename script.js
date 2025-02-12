document.addEventListener('DOMContentLoaded', () => {
    const dayInput = document.getElementById('day-input');
    const monthInput = document.getElementById('month-input');
    const yearInput = document.getElementById('year-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');

    // Set max length for inputs
    dayInput.maxLength = 2;
    monthInput.maxLength = 2;
    yearInput.maxLength = 4;

    // Add input validation
    dayInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        validateDay();
    });
    
    monthInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        validateMonth();
    });
    
    yearInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        validateYear();
    });

    function validateDay() {
        let value = parseInt(dayInput.value);
        const month = parseInt(monthInput.value) || 1;
        const year = parseInt(yearInput.value) || 2000;
        
        const daysInMonth = new Date(year, month, 0).getDate();
        
        if (value > daysInMonth) {
            dayInput.value = daysInMonth;
            value = daysInMonth;
        } else if (value < 1 || isNaN(value)) {
            dayInput.value = '';
            value = '';
        }
        return value >= 1 && value <= daysInMonth;
    }

    function validateMonth() {
        let value = parseInt(monthInput.value);
        if (value > 12) {
            monthInput.value = 12;
            value = 12;
        } else if (value < 1 || isNaN(value)) {
            monthInput.value = '';
            value = '';
        }
        validateDay(); // Revalidate day when month changes
        return value >= 1 && value <= 12;
    }

    function validateYear() {
        let value = parseInt(yearInput.value);
        const currentYear = new Date().getFullYear();
        
        if (isNaN(value)) {
            yearInput.value = '';
            return false;
        }

        // Only validate if we have a full 4-digit year
        if (yearInput.value.length === 4) {
            if (value > currentYear) {
                yearInput.value = currentYear;
                value = currentYear;
            } else if (value < 1900) {
                yearInput.value = 1900;
                value = 1900;
            }
        }
        
        validateDay(); // Revalidate day when year changes
        return value >= 1900 && value <= currentYear;
    }

    calculateBtn.addEventListener('click', () => {
        if (!dayInput.value || !monthInput.value || !yearInput.value) {
            alert('Please fill in all date fields');
            return;
        }

        if (!validateDay() || !validateMonth() || !validateYear()) {
            alert('Please enter a valid date');
            return;
        }

        const birthDate = new Date(
            parseInt(yearInput.value),
            parseInt(monthInput.value) - 1,
            parseInt(dayInput.value)
        );
        
        const today = new Date();

        if (birthDate > today) {
            alert('Please select a date in the past');
            return;
        }

        // Calculate years, months, and days
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            // Get the last day of the previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        // Animate the numbers
        animateNumber(yearsEl, years);
        animateNumber(monthsEl, months);
        animateNumber(daysEl, days);
    });

    function animateNumber(element, final) {
        let current = 0;
        const increment = final > 50 ? Math.ceil(final / 50) : 1;
        const interval = setInterval(() => {
            if (current >= final) {
                element.textContent = final;
                clearInterval(interval);
            } else {
                current += increment;
                element.textContent = current;
            }
        }, 20);
    }
});
