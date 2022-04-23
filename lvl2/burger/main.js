"use strict";

window.addEventListener('load', () => {
    class Hamburger {
        constructor(size = "small", fillings = []) {
            this.size = size;
            this.fillings = fillings;
        }

        // Добавить добавку 
        addTopping(topping) {}
            // Убрать добавку 
        removeTopping(topping) {}
            // Получить список добавок 
        getToppings(topping) {}
            // Узнать размер гамбургера 
        getSize() {
                return this.size;
            }
            // Узнать начинку гамбургера 
        getFillings() {
            return this.fillings;
        }
        setSize(size) {
            this.size = size;
        }
        setFillings(fillings) {
                this.fillings = fillings;
            }
            // Узнать цену
        calculatePrice() {
                let price = 0;
                if (this.size == "small") {
                    price = 50;
                } else {
                    price = 100;
                }
                this.fillings.forEach(el => {
                    price += el.price;
                });
                return price;
            }
            // Узнать калорийность 
        calculateCalories() {
            let ccal = 0;
            if (this.size == "small") {
                ccal = 20;
            } else {
                ccal = 40;
            }
            this.fillings.forEach(el => {

                ccal += el.ccal;
            });
            return ccal;
        }
    }

    let hamburgerProperties = [{
            name: "cheese",
            price: 10,
            ccal: 20
        },
        {
            name: "salat",
            price: 20,
            ccal: 5
        },
        {
            name: "potato",
            price: 15,
            ccal: 10
        },
        {
            name: "seasoning",
            price: 15,
            ccal: 0
        },
        {
            name: "mayonnaise",
            price: 20,
            ccal: 5
        },
    ];



    let stuffingList = document.querySelector(`.stuffing`);
    let size, fillingEL;
    let fillings = [];






    let isCheckedStuff = () => {
        let inputsStuff = stuffingList.querySelectorAll(`input[type="checkbox"]`);
        for (let i = 0; i < inputsStuff.length; i++) {
            if (inputsStuff[i].checked) {
                // console.log(inputsStuff[i]);
                return true;
            }
        }
        return false;
    }

    let addError = () => {
            let errorEl = document.createElement("p");
            errorEl.textContent = "Выберите хотя бы одну начинку";
            errorEl.className = "error";
            stuffingList.appendChild(errorEl);
        }
        // fillingEL - коллекция input.
        // hamburgerProperties - массив объектов со свойствами

    let filterByName = (item, fillingEL) => {
        let names = [];
        fillingEL.forEach(el => {
            names.push(el.name);
        });
        return names.includes(item.name);
    }

    let getFillings = (fillingEL) => {
        return hamburgerProperties.filter(item => {
            return filterByName(item, fillingEL);
        });
    }

    let renderResult = (price, ccal) => {
        document.querySelector(".result-price span").textContent = price;
        document.querySelector(".result-ccal span").textContent = ccal;

    }
    let onBtnClick = () => {
        if (stuffingList.querySelector(".error")) {
            stuffingList.querySelector(".error").remove();
        }
        if (!isCheckedStuff()) {
            addError();
            return;
        }
        size = document.querySelector(`.size input[type="radio"]:checked`).value;
        fillingEL = document.querySelectorAll(`input[type="checkbox"]:checked`);
        fillings = getFillings(fillingEL);
        bur1.setFillings(fillings);
        bur1.setSize(size);
        renderResult(bur1.calculatePrice(), bur1.calculateCalories());
    };

    document.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
    });
    document.querySelector("button").addEventListener("click", onBtnClick);
    let bur1 = new Hamburger(size, fillings);


});