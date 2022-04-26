class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            tel: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Разрешены только буквы',
            tel: 'Введите телефон в формате +7(000)000-0000',
            mail: 'E-mail некорректен. my.mail@mail.ru',
            none: 'Поле не должно быть пустым'
        };
        this.form = document.querySelector(`#${form}`);
        this.inputs = this.form.querySelectorAll(".input");
        this.classError = "error";
        this.valid = true;
        this.validate();
    }

    validate() {
        this.removeError();
        for (let input of this.inputs) {
            if (input.value == "") {
                this.renderError(input, "none");
                this.valid = false;
            } else {
                if (this.patterns[input.id]) {
                    if (!this.patterns[input.id].test(input.value)) {
                        this.renderError(input);
                        this.valid = false;
                    }
                }
            }
        }
    }
    renderError(input, key) {
        input.classList.add(this.classError);
        let err = document.createElement("p");
        if (key) {
            err.textContent = this.errors["none"];
        } else {
            err.textContent = this.errors[input.id];
        }
        err.classList.add("errorText");
        input.insertAdjacentElement('afterend', err);
    }
    removeError() {
        for (let input of this.inputs) {
            if (input.classList.contains(this.classError)) {
                input.classList.remove(this.classError);
            }
        }
        let errorText = document.querySelectorAll("p.errorText");
        for (let err of errorText) {
            err.parentNode.removeChild(err);

        }
    }
}