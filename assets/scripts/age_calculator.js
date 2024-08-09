const isLeapYear = (year) => {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}

const daysInMonth = (month, year) => {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

const calculate_age = (day, month, year) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += daysInMonth(today.getMonth(), today.getFullYear());
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById("calculated-year").innerText = ageYears;
    document.getElementById("calculated-month").innerText = ageMonths;
    document.getElementById("calculated-day").innerText = ageDays;
}

export { calculate_age };
