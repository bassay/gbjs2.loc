"use strict";

// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные
// кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.

let str = "Привет мир, это мои 'маленькие кавычки'";
let regExp1 = /'/gm;
let res = str.replace(regExp1, '"');
// console.log(res);

// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на
// двойную.

let str2 = "Привет мир, это aren't мои 'маленькие кавычки'";
let regExp2 = /\B\'\B/gm;
res = str2.replace(regExp2, '"');
// console.log(res);

// 3. * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
// и сообщить пользователю об ошибке.

/*
Везде специально в форме поставил type="text"
*/

// Массив правил id элемента и регулярка
const arrayRules = [
  ["formName", /[A-zА-я]/gi],
  // ["formPhone", /[^A-zА-я]/gi],
  ["formPhone", /[+][0-9]/gi],
  ["formEmail", /@/gi],
  ["formDesc", /\w/gim],
];

// Простой быстрый цикл
for (let i = 0; i < arrayRules.length; i++) {
  let id = arrayRules[i][0];
  let regEx = arrayRules[i][1];
  formValidate(id, regEx);
}

// функция
function formValidate(id, regEx) {
  let formEl = document.getElementById(id);
  formEl.addEventListener("change", (e) => {
    // if (e.target.value.match(regEx) === null) {
    //   // e.target.insertAdjacentHTML("beforebegin", '<p class="error">Ошибка</p>');
    //   e.target.classList.add("error");
    // } else {
    //   e.target.classList.remove("error");
    // }
    e.target.value.match(regEx) === null
      ? e.target.classList.add("error")
      : e.target.classList.remove("error");
  });
}
