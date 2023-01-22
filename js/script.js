let breadcrumbSubPage = document.querySelector(".breadcrumb-current-section");
let typeFilterAll = document.querySelector('.type-filter-all');
let typeFilterLaptop = document.querySelector('.type-filter-laptop');
let typeFilterPhone = document.querySelector('.type-filter-phone');
// set breadcrumb current page filter
setBreadcrumbPage(typeFilterAll);
setBreadcrumbPage(typeFilterLaptop);
setBreadcrumbPage(typeFilterPhone);
// Add the subpage name to breadcrumb when the filter is set
function setBreadcrumbPage(target) {
    target.onclick = function() {
        if(target.innerHTML === "Все") {
            breadcrumbSubPage.innerHTML = "";
        }
        else {
            breadcrumbSubPage.innerHTML = target.innerHTML;
        }
    }
}
let userId = document.querySelector(".user_cart").dataset.userid;
$.ajax({
    method: "GET",
    url: "php/cart_fill.php",
    data: {user: userId},
    success: (e) => {
        const cart = document.querySelector(".cart__items-container");
        cart.innerHTML = e;
        if(cart.childElementCount != "0") {
            let cartItemCount = $(".cart__item__count");
            let cartItemMinus = document.querySelector(".cart__item__count-minus");
            let cartItemPlus = document.querySelector(".cart__item__count-plus");
            let totalItemsCost = $(".cart__item-cost").html;
            let cartSumm = $('.cart__summ-field');
            const itemControlContainer = document.body.querySelectorAll(".cart__item");
            const itemContainer = document.body.querySelectorAll(".cart__item");
            // change the total summ
            itemControlContainer.forEach((row) => {
                row.addEventListener("click", (e) => {
                    let btn = e.target;
                    let count = row.querySelector(".cart__item__count");
                    switch(btn.dataset.apperand) {
                        case "-":
                            if(count.value == "1") {
                                cartItemMinus.setAttribute("disabled", "");
                            }
                            else {
                                count.value--;
                                cartSumm.html(summAllItemsCostCart());
                            }
                            break;
                        case "+":
                            count.value++;
                            cartItemMinus.removeAttribute("disabled");
                            cartSumm.html(summAllItemsCostCart());
                            break;
                    }
                    if(btn.dataset.action === "delete") {
                        let cartItemId = row.dataset.cartitemid;
                        $.ajax({
                            method: "POST",
                            url: "php/cart_delete.php",
                            data: {itemId: cartItemId},
                            success: row.remove()
                        });
                        //row.remove();
                        cartSumm.html(summAllItemsCostCart());
                    }
                });
                row.addEventListener("change", (e) => {
                    let count = e.target;
                    cartSumm.html(summAllItemsCostCart());
                })
            });
            let totalSumm = totalItemsCost.toString().replace("₽", "").replace(" ", "") * cartItemCount.value;
            cartSumm.html(summAllItemsCostCart());
        }
        // func of summ all costs
        function summAllItemsCostCart() {
            const itemContainer = document.querySelectorAll(".cart__item-chars");
            let total = 0;
            let execute = 0;
            for(let i = 0; i < itemContainer.length; i++) {
                let cost = itemContainer[i].querySelector(".cart__item-cost");
                let count = itemContainer[i].querySelector(".cart__item__count");
                total += cost.innerHTML.replace("₽", "").replace(" ", "") * (count.value);
            }
            if(itemContainer.length == 0) {
                document.querySelector(".cart__summ").innerHTML = "";
                document.querySelector(".cart__summ").setAttribute("hidden", "");
            }
            else {
                document.querySelector(".cart__summ").removeAttribute("hidden");
                document.querySelector(".cart__summ").innerHTML = total + " рублей";
            }
            return(total);
            // return(total.toString());//.slice(0, -3) + " " + total.toString().slice(-4, -1) + ' ₽');
        }
    }
});
// add item to cart
const catalogContainer = document.querySelector(".catalog-container");
const catalogItem = catalogContainer.querySelectorAll(".main__item");
catalogItem.forEach((row) => {
    row.addEventListener('click', (e) => {
        let cartBtn = e.target;
        switch(cartBtn.dataset.addcart) {
            case "add":
                // alert(row.querySelector(".item-cost").innerHTML);
                let itemId = row.dataset.itemid;
                let userId = document.querySelector(".user_cart").dataset.userid;
                // refresh ajax
                $.ajax({
                    method: "GET",
                    url: "php/cart_fill.php",
                    data: {user: userId},
                    success: (e) => {
                        $(".cart__items-container").html(e);
                        const cart = document.querySelector(".cart__items-container");
                        cart.innerHTML = e;
                        if(cart.childElementCount != "0") {
                            let cartItemCount = $(".cart__item__count");
                            let cartItemMinus = document.querySelector(".cart__item__count-minus");
                            let cartItemPlus = document.querySelector(".cart__item__count-plus");
                            let totalItemsCost = $(".cart__item-cost").html;
                            let cartSumm = $('.cart__summ-field');
                            const itemControlContainer = document.body.querySelectorAll(".cart__item");
                            const itemContainer = document.body.querySelectorAll(".cart__item");
                            // change the total summ
                            itemControlContainer.forEach((row) => {
                                row.addEventListener("click", (e) => {
                                    let btn = e.target;
                                    let count = row.querySelector(".cart__item__count");
                                    switch(btn.dataset.apperand) {
                                        case "-":
                                            if(count.value == "1") {
                                                cartItemMinus.setAttribute("disabled", "");
                                            }
                                            else {
                                                count.value--;
                                                cartSumm.html(summAllItemsCostCart());
                                            }
                                            break;
                                        case "+":
                                            count.value++;
                                            cartItemMinus.removeAttribute("disabled");
                                            cartSumm.html(summAllItemsCostCart());
                                            break;
                                    }
                                    if(btn.dataset.action === "delete") {
                                        let cartItemId = row.dataset.cartitemid;
                                        $.ajax({
                                            method: "POST",
                                            url: "php/cart_delete.php",
                                            data: {itemId: cartItemId},
                                            success: row.remove()
                                        });
                                        cartSumm.html(summAllItemsCostCart());
                                    }
                                });
                                row.addEventListener("change", (e) => {
                                    let count = e.target;
                                    cartSumm.html(summAllItemsCostCart());
                                })
                            });
                            let totalSumm = totalItemsCost.toString().replace("₽", "").replace(" ", "") * cartItemCount.value;
                            cartSumm.html(summAllItemsCostCart());
                        }
                        // func of summ all costs
                        function summAllItemsCostCart() {
                            const itemContainer = document.querySelectorAll(".cart__item-chars");
                            let total = 0;
                            let execute = 0;
                            for(let i = 0; i < itemContainer.length; i++) {
                                let cost = itemContainer[i].querySelector(".cart__item-cost");
                                let count = itemContainer[i].querySelector(".cart__item__count");
                                total += cost.innerHTML.replace("₽", "").replace(" ", "") * (count.value);
                            }
                            if(itemContainer.length == 0) {
                                document.querySelector(".cart__summ").innerHTML = "";
                                document.querySelector(".cart__summ").setAttribute("hidden", "");
                            }
                            else {
                                document.querySelector(".cart__summ").removeAttribute("hidden");
                                document.querySelector(".cart__summ").innerHTML = total + " рублей";
                            }
                            return(total);
                            // return(total.toString());//.slice(0, -3) + " " + total.toString().slice(-4, -1) + ' ₽');
                        }
                    }
                });
                $.ajax({
                    method: "POST",
                    url: "php/add_to_cart.php",
                    data: {user: userId, item: itemId}
                });
                // refresh ajaxq
                $.ajax({
                    method: "GET",
                    url: "php/cart_fill.php",
                    data: {user: userId},
                    success: (e) => {
                        $(".cart__items-container").html(e);
                        const cart = document.querySelector(".cart__items-container");
                        cart.innerHTML = e;
                        if(cart.childElementCount != "0") {
                            let cartItemCount = $(".cart__item__count");
                            let cartItemMinus = document.querySelector(".cart__item__count-minus");
                            let cartItemPlus = document.querySelector(".cart__item__count-plus");
                            let totalItemsCost = $(".cart__item-cost").html;
                            let cartSumm = $('.cart__summ-field');
                            const itemControlContainer = document.body.querySelectorAll(".cart__item");
                            const itemContainer = document.body.querySelectorAll(".cart__item");
                            // change the total summ
                            itemControlContainer.forEach((row) => {
                                row.addEventListener("click", (e) => {
                                    let btn = e.target;
                                    let count = row.querySelector(".cart__item__count");
                                    switch(btn.dataset.apperand) {
                                        case "-":
                                            if(count.value == "1") {
                                                cartItemMinus.setAttribute("disabled", "");
                                            }
                                            else {
                                                count.value--;
                                                cartSumm.html(summAllItemsCostCart());
                                            }
                                            break;
                                        case "+":
                                            count.value++;
                                            cartItemMinus.removeAttribute("disabled");
                                            cartSumm.html(summAllItemsCostCart());
                                            break;
                                    }
                                    if(btn.dataset.action === "delete") {
                                        let cartItemId = row.dataset.cartitemid;
                                        $.ajax({
                                            method: "POST",
                                            url: "php/cart_delete.php",
                                            data: {itemId: cartItemId},
                                            success: row.remove()
                                        });
                                        cartSumm.html(summAllItemsCostCart());
                                    }
                                });
                                row.addEventListener("change", (e) => {
                                    let count = e.target;
                                    cartSumm.html(summAllItemsCostCart());
                                })
                            });
                            let totalSumm = totalItemsCost.toString().replace("₽", "").replace(" ", "") * cartItemCount.value;
                            cartSumm.html(summAllItemsCostCart());
                        }
                        // func of summ all costs
                        function summAllItemsCostCart() {
                            const itemContainer = document.querySelectorAll(".cart__item-chars");
                            let total = 0;
                            let execute = 0;
                            for(let i = 0; i < itemContainer.length; i++) {
                                let cost = itemContainer[i].querySelector(".cart__item-cost");
                                let count = itemContainer[i].querySelector(".cart__item__count");
                                total += cost.innerHTML.replace("₽", "").replace(" ", "") * (count.value);
                            }
                            if(itemContainer.length == 0) {
                                document.querySelector(".cart__summ").innerHTML = "";
                                document.querySelector(".cart__summ").setAttribute("hidden", "");
                            }
                            else {
                                document.querySelector(".cart__summ").removeAttribute("hidden");
                                document.querySelector(".cart__summ").innerHTML = total + " рублей";
                            }
                            return(total);
                            // return(total.toString());//.slice(0, -3) + " " + total.toString().slice(-4, -1) + ' ₽');
                        }
                    }
                });
                break;
            case "not_add":
                // alert("not_add");
                alert("Для добавления товара в корзину, сначала авторизуйтесь на сайте!");
                break;
        }
    })
})
// show catogItem info before clicking on item card
const itemCatalog = document.querySelectorAll(".main__item");
itemCatalog.forEach((row)=> {
    row.addEventListener("click", (e) => {
        let itemId = row.dataset.itemid;
    })
})