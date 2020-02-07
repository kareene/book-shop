var gTrans = {
    title: {
        en: 'Welcome to My Bookshop',
        he: 'חנות הספרים שלי'
    },
    arrowPrev: {
        en: `Prev Page`,
        he: `העמוד הקודם`,
    },
    arrowNext: {
        en: `Next Page`,
        he: `העמוד הבא`,
    },
    add: {
        en: 'Create New Book',
        he: 'הוספת ספר חדש',
    },
    id: {
        en: 'Id',
        he: 'מזהה',
    },
    name: {
        en: 'Title',
        he: 'שם',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    rating: {
        en: 'Rating',
        he: 'דירוג',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    read: {
        en: 'Read',
        he: 'קרא',
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'הסר',
    },
    sure: {
        en: 'Are you sure?',
        he: 'האם את בטוחה?',
    },
    sort: {
        en: 'Sort',
        he: 'מיין'
    },
    addNameEnLable: {
        en: 'Book Title - English',
        he: 'שם הספר - אנגלית'
    },
    addNameEnPlaceholder: {
        en: 'Enter book Title in English',
        he: 'בבקשה הזיני את שם הספר באנגלית'
    },
    addNameHeLable: {
        en: 'Book Title - Hebrew',
        he: 'שם הספר - עברית'
    },
    addNameHePlaceholder: {
        en: 'Enter book Title in Hebrew',
        he: 'בבקשה הזיני את שם הספר בעברית'
    },
    addPriceLable: {
        en: 'Price in USD',
        he: 'מחיר בדולר ארה״ב'
    },
    addPricePlaceholder: {
        en: 'Enter Book Price in USD',
        he: 'בבקשה הזיני את מחיר הספר בדולר ארה״ב'
    },
    cancel: {
        en: 'Cancel',
        he: 'ביטול'
    },
    save: {
        en: 'Save',
        he: 'שמירה'
    }
}
var gCurrLang = 'en';

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        let txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })

    els = document.querySelectorAll('[data-title]');
    els.forEach(el => {
        let txt = getTrans(el.dataset.title);
        el.setAttribute('title', txt)
    })

    els = document.querySelectorAll('[data-price]');
    els.forEach(el => {
        let txt = formatCurrency(el.dataset.price);
        el.innerText = txt;
    })

    els = document.querySelectorAll('[data-book]');
    for (let i = 0; i < els.length; i++) {
        let book = getBook(els[i].dataset.book);
        if (!book) continue;
        let txt = book.name[gCurrLang];
        els[i].innerText = txt;
    }
}

function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function getLang() {
    return gCurrLang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    var exchangeRate = 3.5;
    if (gCurrLang === 'he') return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num * exchangeRate);
    else return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}