'use strict';

function onInit() {
    onSetLang('en'); // calls onSortChanged('name') => calls renderBooks()
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHTMLs = books.map(book => {
        var btnHTML =  `<td class="action" title="read" data-title="read" onclick="onShowBookDetails('${book.id}')">📖</td>
                        <td class="action" title="update" data-title="update" onclick="onAddUpdateBook('${book.id}')">✏️</td>
                        <td class="action" title="delete" data-title="delete" onclick="onRemoveBook('${book.id}')">❌</td>`;
        return `<tr>
                    <td class="id">${book.id}</td>
                    <td class="name" data-book="${book.id}"></td>
                    <td class="price" data-price="${book.price}"></td>
                    <td class="rate">${book.rating}</td>
                    ${btnHTML}
                </tr>`
    });
    var elBookList = document.querySelector('.books-list');
    elBookList.innerHTML = strHTMLs.join('');
    doTrans();
}

function onRemoveBook(bookId) {
    var isSure = confirm(getTrans('sure'));
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}

function onAddUpdateBook(bookId) {
    onHideBookDetails();
    onCloseInputModal();
    var elInputModal = document.querySelector('.input-modal');
    elInputModal.style.display = 'flex';
    if (bookId) {
        var book = getBook(bookId);
        if (!book) return;
        elInputModal.dataset.id = bookId;
        elInputModal.querySelector('input[name="nameEn"]').value = book.name['en'];
        elInputModal.querySelector('input[name="nameHe"]').value = book.name['he'];
        elInputModal.querySelector('input[name="price"]').value = book.price;
    }
}

function onSaveBookInfo() {
    var elInputModal = document.querySelector('.input-modal');
    var bookId = elInputModal.dataset.id;
    var nameEn = elInputModal.querySelector('input[name="nameEn"]').value;
    var nameHe = elInputModal.querySelector('input[name="nameHe"]').value;
    var price = +elInputModal.querySelector('input[name="price"]').value;
    if (!nameEn || !nameHe || !price) return;
    if (bookId) updateBook(bookId, nameEn, nameHe, price);
    else addBook(nameEn, nameHe, price);
    onCloseInputModal();
    renderBooks();
}

function onCloseInputModal() {
    var elInputModal = document.querySelector('.input-modal');
    elInputModal.style.display = 'none';
    elInputModal.dataset.id = '';
    elInputModal.querySelector('input[name="nameEn"]').value = '';
        elInputModal.querySelector('input[name="nameHe"]').value = '';
    elInputModal.querySelector('input[name="price"]').value = '';
}

function onSortChanged(sortBy, lang) {
    setBooksSort(sortBy, lang);
    renderBooks();
}

function onShowBookDetails(bookId) {
    onCloseInputModal();
    var book = getBook(bookId);
    var elDetailsModal = document.querySelector('.details-modal');
    elDetailsModal.dataset.id = bookId;
    elDetailsModal.style.display = 'flex';
    elDetailsModal.querySelector('img').src = book.imgUrl;
    elDetailsModal.querySelector('input').value = book.rating;
    var lang = getLang();
    var elBookName = elDetailsModal.querySelector('h3');
    elBookName.dataset.book = bookId;
    elBookName.innerText = book.name[lang];
    var elPrice = elDetailsModal.querySelector('[data-price]');
    elPrice.dataset.price = book.price;
    elPrice.innerText = formatCurrency(book.price);
}

function onHideBookDetails() {
    var elDetailsModal = document.querySelector('.details-modal');
    elDetailsModal.dataset.id = '';
    elDetailsModal.querySelector('[data-price]').dataset.price = '';
    elDetailsModal.style.display = 'none';
}

function onRateBook(inc) {
    var elDetailsModal = document.querySelector('.details-modal');
    var bookId = elDetailsModal.dataset.id;
    elDetailsModal.querySelector('input').value = rateBook(bookId, inc);
    renderBooks();
}

function onChangePage(inc) {
    changePage(inc);
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    // if lang is hebrew add RTL class
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    onSortChanged('name', lang); // calls renderBooks() => calls doTrans()
}