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
// change cost sorting type
let sortingBtn = document.getElementById("costSortingBtn");
let sortingBtnIcon = sortingBtn.querySelector(".sorting-btn__icon");
function changeCostSortType(btn, icn) {
    btn.onclick = function() {
        btn.classList.remove("uk-active");
        if(btn.dataset.sorttype === "asc") {
            icn.setAttribute("src", "icn/down.png");
            btn.classList.remove("uk-active");
            btn.dataset.sorttype = "desc";
            btn.removeAttribute("uk-filter-control");
            btn.setAttribute("uk-filter-control", "sort: data-cost; order: desc");
        }
        else if(btn.dataset.sorttype === 'desc') {
            icn.setAttribute("src", "icn/up.png");
            btn.dataset.sorttype = 'asc';
            btn.classList.remove("uk-active");
            btn.removeAttribute("uk-filter-control");
            btn.setAttribute("uk-filter-control", "sort: data-cost; order: asc");
        }
    }
}
changeCostSortType(sortingBtn, sortingBtnIcon);
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
                        // refresh count items badge
                        $.ajax({
                            method: "GET",
                            url: "php/cart_counts.php",
                            data: {user_id: userId},
                            success: (e) => {
                                let cartBadge = document.querySelector(".cart__items_count__badge");
                                if(e != 0) {
                                    cartBadge.removeAttribute("hidden");
                                    cartBadge.innerHTML = e;
                                }
                                else {
                                    cartBadge.setAttribute("hidden", "");
                                }
                            }
                        })
                        //row.remove();
                        cartSumm.html(summAllItemsCostCart());
                    }
                });
                row.addEventListener("change", (e) => {
                    let count = row.querySelector(".cart__item__count");
                    if(count.value < 1) {
                        count.value = 1;
                        cartSumm.html(summAllItemsCostCart());
                    }
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
                                        // refresh count items badge
                                        $.ajax({
                                            method: "GET",
                                            url: "php/cart_counts.php",
                                            data: {user_id: userId},
                                            success: (e) => {
                                                let cartBadge = document.querySelector(".cart__items_count__badge");
                                                if(e != 0) {
                                                    cartBadge.removeAttribute("hidden");
                                                    cartBadge.innerHTML = e;
                                                }
                                                else {
                                                    cartBadge.setAttribute("hidden", "");
                                                }
                                            }
                                        })
                                        cartSumm.html(summAllItemsCostCart());
                                    }
                                });
                                row.addEventListener("change", (e) => {
                                    let count = row.querySelector(".cart__item__count");
                                    if(count.value < 1) {
                                        count.value = 1;
                                        cartSumm.html(summAllItemsCostCart());
                                    }
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
                                        // refresh count items badge
                                        $.ajax({
                                            method: "GET",
                                            url: "php/cart_counts.php",
                                            data: {user_id: userId},
                                            success: (e) => {
                                                let cartBadge = document.querySelector(".cart__items_count__badge");
                                                if(e != 0) {
                                                    cartBadge.removeAttribute("hidden");
                                                    cartBadge.innerHTML = e;
                                                }
                                                else {
                                                    cartBadge.setAttribute("hidden", "");
                                                }
                                            }
                                        });
                                        cartSumm.html(summAllItemsCostCart());
                                    }
                                });
                                row.addEventListener("change", (e) => {
                                    let count = row.querySelector(".cart__item__count");
                                    if(count.value < 1) {
                                        count.value = 1;
                                        cartSumm.html(summAllItemsCostCart());
                                    }
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
                // refresh count items badge
                $.ajax({
                    method: "GET",
                    url: "php/cart_counts.php",
                    data: {user_id: userId},
                    success: (e) => {
                        let cartBadge = document.querySelector(".cart__items_count__badge");
                        if(e != 0) {
                            cartBadge.removeAttribute("hidden");
                            cartBadge.innerHTML = e;
                        }
                        else {
                            cartBadge.setAttribute("hidden", "");
                        }
                    }
                })
                break;
            case "not_add":
                // alert("not_add");
                alert("Для добавления товара в корзину, сначала авторизуйтесь на сайте!");
                break;
        }
    })
})
// seach item between selected cost
let costBetweenStart = document.getElementById("costStart");
let costBetweenEnd = document.getElementById("costEnd");
let costBetweenSearchBtn = document.querySelector(".cost-between-search-btn");
costBetweenSearchBtn.onclick = function() {
    $.ajax ({
       method: "GET",
       url: "php/between-search.php",
       data: {startCost: costBetweenStart.value, endCost: costBetweenEnd.value},
       success: (items) => {
            const catalogBody = document.querySelector(".catalog-container");
            catalogBody.innerHTML = "";
            catalogBody.innerHTML = items;
            // 
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
                                                    // refresh count items badge
                                                    $.ajax({
                                                        method: "GET",
                                                        url: "php/cart_counts.php",
                                                        data: {user_id: userId},
                                                        success: (e) => {
                                                            let cartBadge = document.querySelector(".cart__items_count__badge");
                                                            if(e != 0) {
                                                                cartBadge.removeAttribute("hidden");
                                                                cartBadge.innerHTML = e;
                                                            }
                                                            else {
                                                                cartBadge.setAttribute("hidden", "");
                                                            }
                                                        }
                                                    })
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
                                                    // refresh count items badge
                                                    $.ajax({
                                                        method: "GET",
                                                        url: "php/cart_counts.php",
                                                        data: {user_id: userId},
                                                        success: (e) => {
                                                            let cartBadge = document.querySelector(".cart__items_count__badge");
                                                            if(e != 0) {
                                                                cartBadge.removeAttribute("hidden");
                                                                cartBadge.innerHTML = e;
                                                            }
                                                            else {
                                                                cartBadge.setAttribute("hidden", "");
                                                            }
                                                        }
                                                    })
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
            });
       }
    });
}
// search items after click search btn
let searchModelBtn = document.querySelector(".search-btn");
let searchModelInput = document.getElementById("searchField");
searchModelBtn.onclick = function() {
    $.ajax ({
        method: "GET",
        url: "php/search.php",
        data: {item_model: searchModelInput.value},
        success: (items) => {
             const catalogBody = document.querySelector(".catalog-container");
             catalogBody.innerHTML = "";
             catalogBody.innerHTML = items;
             // 
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
                                                     // refresh count items badge
                                                     $.ajax({
                                                         method: "GET",
                                                         url: "php/cart_counts.php",
                                                         data: {user_id: userId},
                                                         success: (e) => {
                                                             let cartBadge = document.querySelector(".cart__items_count__badge");
                                                             if(e != 0) {
                                                                 cartBadge.removeAttribute("hidden");
                                                                 cartBadge.innerHTML = e;
                                                             }
                                                             else {
                                                                 cartBadge.setAttribute("hidden", "");
                                                             }
                                                         }
                                                     })
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
                                                     // refresh count items badge
                                                     $.ajax({
                                                         method: "GET",
                                                         url: "php/cart_counts.php",
                                                         data: {user_id: userId},
                                                         success: (e) => {
                                                             let cartBadge = document.querySelector(".cart__items_count__badge");
                                                             if(e != 0) {
                                                                 cartBadge.removeAttribute("hidden");
                                                                 cartBadge.innerHTML = e;
                                                             }
                                                             else {
                                                                 cartBadge.setAttribute("hidden", "");
                                                             }
                                                         }
                                                     })
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
             });
        }
     });
}
// add items from cart to order
let body = document.body;
const cart = document.querySelector(".cart__modal");
const cartModal = document.getElementById("cartModal");
let confirmOrderBtn = cart.querySelector(".cart__to_order-btn");
// show spinner
function orderSpinner() {
    // show spinner block
    cartModal.setAttribute("uk-offcanvas", "flip: true; overlay: false;");
    let fade = document.querySelector(".cart_order_confirm-fade");
    fade.removeAttribute("hidden");
    body.style.overflowX = "hidden";
    body.style.overflowY = "hidden";
    setTimeout(()=> {
        fade.remove();
    }, 3000);
}
// confirm order
confirmOrderBtn.onclick = function() {
    const cartContainer = cart.querySelector(".cart__items-container");
    let cartCard = cartContainer.querySelectorAll(".cart__item");
    let itId = "";
    let itCou = "";
    let userId = document.querySelector(".user_cart").dataset.userid;
    // check that the order table have an items
    let array = "";
    $.ajax({
        method: "GET",
        url: "php/order_check.php",
        data: {},
        success: (count) => {
            array = count.toString().split(" ");
            orderItemsCount = array[0]; // count of items in array
            maxOrdNumber = array[1]; // max order number
            if(orderItemsCount == 0) {
                maxId = "1";
                // query
                for(let i = 0; i < cartContainer.childElementCount; i++) {
                    itId = cartCard[i].dataset.itemid;
                    itCou = cartCard[i].querySelector(".cart__item__count").value;
                    $.ajax({
                        method: "POST",
                        url: "php/order.php",
                        data: {max_id: maxId, user_id: userId, item_id: itId, item_count: itCou}
                    });
                }
                // clean cart
                $.ajax({
                    method: "GET",
                    url: "php/cart_clean.php",
                    data: {user_id: userId},
                    success: function() {orderSpinner();}
                });
            }
            else {
                maxOrdNumber++;
                let cart = document.querySelector(".cart__modal");
                cart.dataset.neworder = maxOrdNumber;
                // query
                for(let i = 0; i < cartContainer.childElementCount; i++) {
                    itId = cartCard[i].dataset.itemid;
                    itCou = cartCard[i].querySelector(".cart__item__count").value;
                    $.ajax({
                        method: "POST",
                        url: "php/order.php",
                        data: {max_id: cart.dataset.neworder, user_id: userId, item_id: itId, item_count: itCou}
                    });
                }
                // clean cart
                $.ajax({
                    method: "GET",
                    url: "php/cart_clean.php",
                    data: {user_id: userId},
                    success: function() {orderSpinner();}
                });
            }
        }
    });
    setTimeout(() => {alert("Заказ успешно оформлен");location.reload()}, 3000);
}
// search items for the selected device vendor
const vendorSearchInputsContainer = document.querySelector(".device_vendor-filter__item");
const vendorSearchInputsItem = vendorSearchInputsContainer.querySelectorAll(".vendor-select");
let allRadio = document.getElementById("radio-All");
allRadio.addEventListener("click", () => {location.reload();});
vendorSearchInputsItem.forEach((e) => {
    e.addEventListener("click", () => {
        let selectedVendor = e.innerHTML;
        $.ajax({
            method: "GET",
            url: "php/search_vendor.php",
            data: { item_vendor: selectedVendor},
            success: (items) => {
                const catalogBody = document.querySelector(".catalog-container");
                catalogBody.innerHTML = "";
                catalogBody.innerHTML = items;
                // 
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
                                                        // refresh count items badge
                                                        $.ajax({
                                                            method: "GET",
                                                            url: "php/cart_counts.php",
                                                            data: {user_id: userId},
                                                            success: (e) => {
                                                                let cartBadge = document.querySelector(".cart__items_count__badge");
                                                                if(e != "0") {
                                                                    cartBadge.removeAttribute("hidden");
                                                                    cartBadge.innerHTML = e;
                                                                }
                                                                else {
                                                                    cartBadge.setAttribute("hidden", "");
                                                                }
                                                            }
                                                        })
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
                                                        // refresh count items badge
                                                        $.ajax({
                                                            method: "GET",
                                                            url: "php/cart_counts.php",
                                                            data: {user_id: userId},
                                                            success: (e) => {
                                                                let cartBadge = document.querySelector(".cart__items_count__badge");
                                                                if(e != "0") {
                                                                    cartBadge.removeAttribute("hidden");
                                                                    cartBadge.innerHTML = e;
                                                                }
                                                                else {
                                                                    cartBadge.setAttribute("hidden", "");
                                                                }
                                                            }
                                                        })
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
                });
            }
        })
    })
})
// show badge of cart items count where cart is not null
$.ajax({
    method: "GET",
    url: "php/cart_counts.php",
    data: {user_id: userId},
    success: (e) => {
        let cartBadge = document.querySelector(".cart__items_count__badge");
        if(e != 0) {
            cartBadge.removeAttribute("hidden");
            cartBadge.innerHTML = e;
        }
        else {
            cartBadge.setAttribute("hidden", "");
        }
    }
})