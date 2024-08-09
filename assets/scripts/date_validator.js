import { calculate_age } from './age_calculator.js';

const date_input_box = document.querySelector("#day-input");
const month_input_box = document.querySelector("#month-input");
const year_input_box = document.querySelector("#year-input");

const arrow_icon = document.querySelector("#arrow-icon");

const remove_warn_msg = () => {
    const warn_msg = document.querySelectorAll(".empty-field-warn");
    const warn_msg2 = document.querySelectorAll(".error-field-warn");
    const warn_msg_array = Array.from(warn_msg);
    const warn_msg2_array = Array.from(warn_msg2);
    const empty_warn_fields = warn_msg2_array.concat(warn_msg_array);

    if (empty_warn_fields.length > 0) {
        empty_warn_fields.forEach((warning) => {
            let siblingsOfWarnMsg = warning.parentElement.childNodes;
            siblingsOfWarnMsg[1].style.color = "black";
            siblingsOfWarnMsg[3].style.borderColor = "black";
            warning.remove();
        })
    }
}

const isLeapYear = (year) => {
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
}

const daysInMonth = (month, year) => {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

const validate_input = () => {
    //before validating input first remove all the already displaying warning messages
    remove_warn_msg()

    const final_input = {
        date_input: date_input_box.value,
        month_input: month_input_box.value,
        year_input: year_input_box.value
    }

    let hasError = false;

    for (let input in final_input) { // Corrected line
        let user_input;

        //first checking for blank fields
        if (final_input[input] === "") {
            if (input === "date_input") { user_input = date_input_box; }
            else if (input === "month_input") { user_input = month_input_box; }
            else if (input === "year_input") { user_input = year_input_box; }

            if (user_input) {
                const warningMessage = document.createElement("p");
                warningMessage.innerText = "This field is required";
                warningMessage.style.color = "red";
                warningMessage.style.fontSize = "0.6rem";
                warningMessage.style.letterSpacing = "0px";
                warningMessage.setAttribute("class", "empty-field-warn");

                user_input.style.borderColor = "red";
                user_input.previousElementSibling.style.color = "red";
                user_input.after(warningMessage);
                hasError = true;
            }
        }

        //now check the range of value accepted 
        //if not blank
        else {
            let isValid;
            let str;
            if (input === "date_input") {
                user_input = date_input_box;
                str = "Must be a valid day";
                const day = parseInt(final_input.date_input, 10);
                const month = parseInt(final_input.month_input, 10);
                const year = parseInt(final_input.year_input, 10);
                isValid = (day >= 1 && day <= daysInMonth(month, year)) && Number.isInteger(Number(final_input[input]));
            }
            else if (input === "month_input") {
                user_input = month_input_box;
                str = "Must be a valid month";
                isValid = (final_input[input] >= 1 && final_input[input] <= 12) && Number.isInteger(Number(final_input[input]));
            }
            else if (input === "year_input") {
                user_input = year_input_box;
                str = "Must be in the past";
                const currentYear = new Date().getFullYear();
                isValid = (final_input[input] >= 1 && final_input[input] <= currentYear) && Number.isInteger(Number(final_input[input]));
            }
            if (!isValid) {
                const warningMessage = document.createElement("p");
                warningMessage.innerText = `${str}`;
                warningMessage.style.color = "red";
                warningMessage.style.fontSize = "0.6rem";
                warningMessage.style.letterSpacing = "0px";
                warningMessage.setAttribute("class", "error-field-warn");

                user_input.style.borderColor = "red";
                user_input.previousElementSibling.style.color = "red";
                user_input.after(warningMessage);
                hasError = true;
            }
        }
    }

    // Check for future date
    if (!hasError) {
        const day = parseInt(final_input.date_input, 10);
        const month = parseInt(final_input.month_input, 10);
        const year = parseInt(final_input.year_input, 10);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();

        if (inputDate > today) {
            const warningMessage = document.createElement("p");
            warningMessage.innerText = "Date cannot be in the future";
            warningMessage.style.color = "red";
            warningMessage.style.fontSize = "0.6rem";
            warningMessage.style.letterSpacing = "0px";
            warningMessage.setAttribute("class", "error-field-warn");

            date_input_box.style.borderColor = "red";
            date_input_box.previousElementSibling.style.color = "red";
            date_input_box.after(warningMessage);
        } else {
            calculate_age(day, month, year); // Call the age calculator function
        }
    }
}

arrow_icon.addEventListener("click", validate_input)
