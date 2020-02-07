'use strict';

const BOOKS_IN_PAGE = 5;
const STORAGE_KEY = 'books';
var gSortBy;
var gCurrPage = 1;
var gBooks = createBooks();

function getBooksForDisplay() {
    var from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    var to = from + BOOKS_IN_PAGE;
    return gBooks.slice(from, to);
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId);
    if (idx === -1) return;
    gBooks.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gBooks);
}

function addBook(nameEn, nameHe, price) {
    var book = createBook(nameEn, nameHe, price);
    gBooks.push(book);
    sortBooks(gSortBy, gBooks);
    saveToStorage(STORAGE_KEY, gBooks);
}

function updateBook(id, nameEn, nameHe, price) {
    var book = getBook(id);
    book.name['en'] = nameEn;
    book.name['he'] = nameHe;
    book.price = price;
    saveToStorage(STORAGE_KEY, gBooks);
}

function rateBook(bookId, inc) {
    var book = getBook(bookId);
    if (book.rating + inc <= 10 && book.rating + inc >= 0) {
        book.rating += inc;
        saveToStorage(STORAGE_KEY, gBooks);
    }
    return book.rating;
}

function changePage(inc) {
    var lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);
    if (gCurrPage + inc <= lastPage && gCurrPage + inc >= 1) {
        gCurrPage += inc;
    }
}

function setBooksSort(sortBy, lang) {
    if (lang || gSortBy !== sortBy) {
        // sent here by onSortChange() from onSetLang() or
        // sent here by onSortChange() from user click - new sort
        gSortBy = sortBy;
        sortBooks(gSortBy, gBooks);
    } else { // sent here by onSortChange() from user click - same sort but reversed
        gBooks.reverse();
    }
    saveToStorage(STORAGE_KEY, gBooks);
}

function sortBooks(sortBy, books) {
    if (sortBy === 'name') {
        let lang = getLang();
        books.sort((a, b) => {
            return (a.name[lang].toUpperCase() > b.name[lang].toUpperCase()) ? 1 : (a.name[lang].toUpperCase() < b.name[lang].toUpperCase()) ? -1 : 0;
        });
    } else if (sortBy === 'price') books.sort((a, b) => a.price - b.price);
}

function createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books) books = [createBook('The HitchHiker`s Guide to the Galaxy', 'המדריך לטרמפיסט בגלקסיה', 42, 'img/hitchhikersGuide.jpeg'),
                    createBook('Harry Potter and the Philosopher`s Stone', 'הארי פוטר ואבן החכמים', 70, 'img/HarryPotterPhilosophersStone.jpg'),
                    createBook('Harry Potter and the Chamber of Secrets', 'הארי פוטר וחדר הסודות', 70, 'img/HarryPotterChamberofSecrets.jpg'),
                    createBook('Harry Potter and the Prisoner of Azkaban', 'הארי פוטר והאסיר מאזקבאן', 70, 'img/HarryPotterPrisonerofAzkaban.jpg'),
                    createBook('Harry Potter and the Goblet of Fire', 'הארי פוטר וגביע האש', 70, 'img/HarryPotterGobletofFire.jpg'),
                    createBook('The Catcher in the Rye', 'התפסן בשדה השיפון', 50, 'img/CatcherintheRye.jpg'),
                    createBook('Catch-22', 'מילכוד 22', 30, 'img/Catch22.jpg'),
                    createBook('The Hobbit', 'ההוביט', 75, 'img/TheHobbit.jpeg'),
                    createBook('Oh, the Places You`ll Go!', 'אם יוצאים מגיעים למקומות נפלאים!', 20, 'img/OhthePlacesYoullGo.jpg')];
    sortBooks(gSortBy, books);
    saveToStorage(STORAGE_KEY, books);
    return books;
}

function createBook(nameEn, nameHe, price, img = 'img/bookNotPictured.jpg') {
    return {
        id: makeId(),
        name: {en: nameEn, he: nameHe},
        price: price,
        imgUrl: img,
        rating: 0
    };
}