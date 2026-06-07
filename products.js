document.addEventListener("DOMContentLoaded", function() {
    let currentLang = localStorage.getItem("badr_lang") || "ar"; 
    
    if(window.location.search.includes("lang=en")) {
        currentLang = "en";
    }

    applyLanguage(currentLang);
});

let selectedCodes = [];

const dictionary = {
    ar: {
        dir: "rtl",
        brandSub: "LUXURY MARBLE & GRANITE",
        home: "الرئيسية",
        products: "المنتجات",
        badge: "المختارات:",
        subTitle: "المعرض الحصري",
        mainTitle: "تشكيلة الرخام والجرانيت",
        barText: "تم تحديد منتجات للاستفسار عنها.",
        barBtn: "تأكيد ونقل إلى طلب التسعيرة ←",
        selectBtn: "اختيار المنتج",
        selectedBtn: "تم الاختيار ✓"
    },
    en: {
        dir: "ltr",
        brandSub: "LUXURY MARBLE & GRANITE",
        home: "Home",
        products: "Products",
        badge: "Selected:",
        subTitle: "ROYAL PORTFOLIO",
        mainTitle: "Marble & Granite Collection",
        barText: "Products have been selected for inquiry.",
        barBtn: "Confirm & Go To Request Form →",
        selectBtn: "Select Product",
        selectedBtn: "Selected ✓"
    }
};

function applyLanguage(lang) {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute("lang", lang);
    htmlTag.setAttribute("dir", dictionary[lang].dir);
    
    document.getElementById("brand-sub").innerText = dictionary[lang].brandSub;
    document.getElementById("nav-home").innerText = dictionary[lang].home;
    document.getElementById("nav-products").innerText = dictionary[lang].products;
    document.getElementById("badge-text").innerText = dictionary[lang].badge;
    document.getElementById("page-sub-title").innerText = dictionary[lang].subTitle;
    document.getElementById("page-main-title").innerText = dictionary[lang].mainTitle;
    document.getElementById("bar-text").innerText = dictionary[lang].barText;
    document.getElementById("bar-btn").innerText = dictionary[lang].barBtn;
    
    const cards = document.querySelectorAll(".luxury-product-card");
    cards.forEach(card => {
        const nameField = card.querySelector(".p-name");
        const btnField = card.querySelector(".action-select-btn");
        
        nameField.innerText = lang === "en" ? card.getAttribute("data-name-en") : card.getAttribute("data-name-ar");
        if(!btnField.classList.contains("selected")) {
            btnField.innerText = dictionary[lang].selectBtn;
        } else {
            btnField.innerText = dictionary[lang].selectedBtn;
        }
    });
}

function toggleProductSelection(code, btn) {
    const index = selectedCodes.indexOf(code);
    const lang = document.documentElement.getAttribute("lang") || "ar";

    if (index === -1) {
        selectedCodes.push(code);
        btn.classList.add("selected");
        btn.innerText = dictionary[lang].selectedBtn;
    } else {
        selectedCodes.splice(index, 1);
        btn.classList.remove("selected");
        btn.innerText = dictionary[lang].selectBtn;
    }
    
    updateUiComponents();
}

function updateUiComponents() {
    document.getElementById("count-badge").innerText = selectedCodes.length;
    const stickyBar = document.getElementById("stickyBar");
    
    if(selectedCodes.length > 0) {
        stickyBar.classList.add("active");
    } else {
        stickyBar.classList.remove("active");
    }
}

function sendDataToMainPage() {
    if(selectedCodes.length === 0) return;
    
    const codesString = selectedCodes.join(", ");
    const lang = document.documentElement.getAttribute("lang") || "ar";
    
    window.location.href = `index.html?codes=${encodeURIComponent(codesString)}&lang=${lang}#order`;
}
