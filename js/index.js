"use strict";

const inputs = document.querySelectorAll(".inputs input");
const dayInput = inputs[0];
const monthInput = inputs[1];
const yearInput = inputs[2];
const btn = document.querySelector(".button");
const resultYearsDiv = document.querySelectorAll(".result-div")[0];
const resultMonthsDiv = document.querySelectorAll(".result-div")[1];
const resultDaysDiv = document.querySelectorAll(".result-div")[2];

function action() {
    document.querySelectorAll(".inputs-div").forEach(el => {
        el.classList.remove("empty");
        el.classList.remove("invalid-day");
        el.classList.remove("invalid-month");
        el.classList.remove("invalid-year");
        el.classList.remove("future");
        el.classList.remove("invalid-date");
        el.classList.remove("error");
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate(); 

    // Si el mes trae menos días de los leídos en el input

    if ((monthInput.value == "04" || monthInput.value == "06" || monthInput.value == "09" || monthInput.value == "11") && dayInput.value == "31") {
        dayInput.parentNode.classList.add("invalid-date");
        dayInput.parentNode.classList.add("error");
    }

    if (monthInput.value == "02" && Number(dayInput.value) > 29) {
        dayInput.parentNode.classList.add("invalid-date");
        dayInput.parentNode.classList.add("error");
    }

    if (monthInput.value == "02" && Number(dayInput.value) == 29 && Number(yearInput.value) % 4 != 0) {
        dayInput.parentNode.classList.add("invalid-date");
        dayInput.parentNode.classList.add("error");
    }

    // Si se ingresan valores no numéricos
    
    if (isNaN(Number(dayInput.value))) {
        dayInput.parentNode.classList.add("invalid-day");
        dayInput.parentNode.classList.add("error");
    }

    if (isNaN(Number(monthInput.value))) {
        monthInput.parentNode.classList.add("invalid-month");
        monthInput.parentNode.classList.add("error");
    }

    if (isNaN(Number(yearInput.value))) {
        yearInput.parentNode.classList.add("invalid-year");
        yearInput.parentNode.classList.add("error");
    }

    // Si algún campo está vacío

    if (!dayInput.value) {
        dayInput.parentNode.classList.add("empty");
        dayInput.parentNode.classList.add("error");
    }

    if (!monthInput.value) {
        monthInput.parentNode.classList.add("empty");
        monthInput.parentNode.classList.add("error");
    }

    if (!yearInput.value) {
        yearInput.parentNode.classList.add("empty");
        yearInput.parentNode.classList.add("error");
    }

    // Si el día es superior a 31 o inferior a 1

    if (Number(dayInput.value) > 31 || Number(dayInput.value) < 1 && dayInput.value) {
        dayInput.parentNode.classList.add("invalid-day");
        dayInput.parentNode.classList.add("error");
    }

    // Si el mes es superior a 12 o inferior a 1

    if (Number(monthInput.value) > 12 || Number(monthInput.value) < 1 && monthInput.value) {
        monthInput.parentNode.classList.add("invalid-month");
        monthInput.parentNode.classList.add("error");
    }

    // Si la fecha está en el futuro

    if (Number(yearInput.value) > year) {
        yearInput.parentNode.classList.add("future");
        yearInput.parentNode.classList.add("error");
    } else

    if (Number(yearInput.value) >= year && Number(monthInput.value) > month) {
        monthInput.parentNode.classList.add("future");
        monthInput.parentNode.classList.add("error");
    } else

    if (Number(yearInput.value) >= year && Number(monthInput.value) >= month && Number(dayInput.value) > day) {
        dayInput.parentNode.classList.add("future");
        dayInput.parentNode.classList.add("error");
    }

    // Comprobando si hubo algún error

    let flag = true;

    document.querySelectorAll(".inputs-div").forEach(el => {
        if (el.classList.length > 1) flag = false;
    });

    // Calcular el resultado si todo estuvo bien

    if (flag) {
        let ageYears = year - yearInput.value;
        let ageMonths = month - monthInput.value;
        let ageDays = day - dayInput.value;

        if (ageDays < 0) {
            ageMonths--;
            ageDays = day;
            
            if (month - 1 == 2) {
                ageDays += 28 - day;
            }

            else if (month - 1 == 4 || month - 1 == 6 || month - 1 == 9 || month - 1 == 11) {
                ageDays += 30 - day;
            }

            else {
                ageDays += 31 - dayInput.value;
            }
        }

        if (month < monthInput.value) {
            ageYears--;
            ageMonths = month + 12 - monthInput.value;
        }

        let n1 = Math.floor(ageYears / 10),
        n2 = ageYears % 10;

        resultYearsDiv.children[0].textContent = `${n1}`;
        resultYearsDiv.children[0].style.width = "auto";
        resultYearsDiv.children[0].style.height = "auto";
        resultYearsDiv.children[0].style.backgroundColor = "transparent";
        resultYearsDiv.children[0].style.marginRight = 0;
        resultYearsDiv.children[1].textContent = `${n2}`;
        resultYearsDiv.children[1].style.width = "auto";
        resultYearsDiv.children[1].style.height = "auto";
        resultYearsDiv.children[1].style.backgroundColor = "transparent";

        n1 = Math.floor(ageMonths / 10);
        n2 = ageMonths % 10;

        resultMonthsDiv.children[0].textContent = `${n1}`;
        resultMonthsDiv.children[0].style.width = "auto";
        resultMonthsDiv.children[0].style.height = "auto";
        resultMonthsDiv.children[0].style.backgroundColor = "transparent";
        resultMonthsDiv.children[0].style.marginRight = 0;
        resultMonthsDiv.children[1].textContent = `${n2}`;
        resultMonthsDiv.children[1].style.width = "auto";
        resultMonthsDiv.children[1].style.height = "auto";
        resultMonthsDiv.children[1].style.backgroundColor = "transparent";

        n1 = Math.floor(ageDays / 10);
        n2 = ageDays % 10;

        resultDaysDiv.children[0].textContent = `${n1}`;
        resultDaysDiv.children[0].style.width = "auto";
        resultDaysDiv.children[0].style.height = "auto";
        resultDaysDiv.children[0].style.backgroundColor = "transparent";
        resultDaysDiv.children[0].style.marginRight = 0;
        resultDaysDiv.children[1].textContent = `${n2}`;
        resultDaysDiv.children[1].style.width = "auto";
        resultDaysDiv.children[1].style.height = "auto";
        resultDaysDiv.children[1].style.backgroundColor = "transparent";
    }
}

btn.addEventListener("click", action);

window.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        action();
    }
});

inputs.forEach((input, index) => {
    input.addEventListener("keydown", e => {
        if (e.key == " " && index + 1 < 3) {
            e.preventDefault();
            inputs[index + 1].focus();
        }
    });
});
