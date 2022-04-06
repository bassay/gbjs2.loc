// let regExp = new RegExp('выражение', 'флаги');
// let regExp = /expression/flags

// Флаги
// i - поиск без учета регистра
// g - множественный поиск
// m - многострочный поиск

let str = 'Язык JavaScript называется так из-за популярности языка Java';
// let regExp = new RegExp('java', 'i');
// console.log(regExp);

// search
// -1 - вхождений не найдено
// Возвращает индекс первого вхождения
// console.log(str.search(regExp));

// match
// возвращает массив-объект с подробной иформацией (без флага g и m)
// возвращает null если ничего не найдено
// console.log(str.match(/java/ig));

// replace
// console.log('+7 (000)000-00-00'.replace('-', ':'));
// console.log('+7 (000)000-00-00'.replace(/-/g, ':'));

// let name = 'Smith, John';

// console.log(name.replace(/([a-z]+), ([a-z]+)/i, '$2 $1'));
// console.log(name.replace(/([a-z]+), ([a-z]+)/i, 'Было: $&\nСтало: $2 $1'));

// Классы
// \d - [0123456789] - [0-9]
// \D - [^0123456789] - [^0-9]
// \w - [a-z0-9_]
// \W
// \s - space, tab, \n
// \S
// \b - граница слова
// \B

// Квантификаторы
// {m} - строго m раз
// {m,n} - от m до n раз
// {m,} - от m до бесконечности
// {,n} - от 0 до n раз

// сокращения
// + - {1,}
// * - {0,}
// ? - {0,1}

// console.log('+7-(000)_000:00-00veeg'.replace(/\W/g, '')); // 70000000000
// console.log('+7-(000) 000:00-00'.replace(/\D/g, '')); // 70000000000

// console.log('color colour'.match(/colou?r/g));
// console.log('color colour coloutr'.match(/colo[ut]?r/g));

// console.log('JavaScript это не Java'.match(/\bjava\b/i));
// console.log('JavaScript это не Java'.match(/\bjava\B/i));

// console.log('JavaScript это не Java'.match(/^java/i));
// console.log('JavaScript это не Java'.match(/java$/i));

// console.log('Chapter 7.1 8q3'.match(/\d\.\d/g));

// test (true|false)
// console.log(/java/i.test(str));
//
// let result;
// let regExp2 = /java/ig;
//
// console.log(`Начальный индекс lastIndex ${regExp2.lastIndex}`);
// while(result = regExp2.exec(str)) {
//     console.log(result);
//     console.log(`Текущий lastIndex ${regExp2.lastIndex}`);
// }
// console.log(`Конечный lastIndex ${regExp2.lastIndex}`);
