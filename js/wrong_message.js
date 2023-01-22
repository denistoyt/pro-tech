/*
let pageMainBlock = document.querySelector(".autorization__body");
const wrongPopup = '<div class="wrong__data__message-container"><h2>Ошибка!</h2><span class="wrong__data__text"><img src="../icn/wrong.png" alt="Wrong Data">Введены неверные данные для входа!</span></div>';
*/
function checkEnterApply(accessCode) { 
    if(accessCode === "wrong_data") {
        /*
        pageMainBlock.insertAdjacentHTML("afterend", wrongPopup);
        let popupElem = document.querySelector(".wrong__data__message-container");
        setTimeout(() => (popupElem.style.transform = "translateX(500px)", setTimeout(() => popupElem.remove(), 1000)), 5000);
        */
       alert("Wrong");
    }
    else if(accessCode === "success"){
        /*
        location.href = "../index.php";
        */
       alert("Allow");
    }
};
function test() {
    alert("fefe");
}

/*
    СДЕЛАТЬ ВЫВОД СООБЩЕНИЯ ПРИ ОШИБКЕ ВВОДА ДАННЫХ
*/