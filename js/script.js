const ecommerce = document.querySelector('.ecommerce-wrapper');
const primary_nav = document.querySelector('.primary-navigation');
const navbar = document.querySelector('.menu-ctl');

const img_carousel = document.querySelectorAll('.product-carousel-image');
const img_carousel_thumb = document.querySelectorAll('.thumb');

const product_carousel = document.querySelector('.carousel-images');
const float_carousel = document.querySelector('.floating-carousel');

const forward = document.querySelector('.btn-right');
const backward = document.querySelector('.btn-left');

// --------------

const img_carousel2 = document.querySelectorAll('.product-carousel-image-2');
const img_carousel_thumb2 = document.querySelectorAll('.thumb-2');

const forward2 = document.querySelector('.btn-right-2');
const backward2 = document.querySelector('.btn-left-2');

// --------------

const close_carousel = document.querySelector('.close-carousel');

const decrease_qty = document.querySelector('.dec-qty');
const increase_qty = document.querySelector('.inc-qty');
const qty_error = document.querySelector(".product-quantity");
const total_qty = document.querySelector('.product-qty');

const cart_wrapper = document.querySelector('.mycart-wrapper');
const my_basket = document.querySelector('.shopping-cart');
const my_cart = document.querySelector('.mycart-contents');

const add2basket = document.querySelector('.add-2-cart');

let qty = total_qty.innerHTML;
let floatactive = 'false';

let current_index = -1;
let new_index = -1;

navbar.addEventListener('click', (e) => {
    let nav_state = primary_nav.getAttribute('aria-expanded');
    if(nav_state == 'false') {
        primary_nav.setAttribute('aria-expanded','true');  
    }else{
        primary_nav.setAttribute('aria-expanded','false');
    }
});

product_carousel.addEventListener('click', (e) => {
    if (e.target.classList.contains("product-carousel-image")) {
        let floatactive = 'false';
        floatactive = float_carousel.getAttribute('data-visible');
        if (floatactive == 'false') {
            float_carousel.setAttribute('data-visible', 'true');
        } else {
            float_carousel.setAttribute('data-visible', 'false');
        }
    }
});

close_carousel.addEventListener('click', (e) => {
        float_carousel.setAttribute('data-visible', 'false');
});


function find_current() {
    img_carousel.forEach(function (c_image, index, arr) {
        let img_select = c_image.getAttribute('data-current');

        if (img_select === "true") {
            current_index = index;
        }
    });
    return current_index;
}

function find_currentThumb() {
    img_carousel_thumb.forEach(function (c_image, index, arr) {
        let img_select = c_image.getAttribute('data-current');

        if (img_select === "true") {
            current_index = index;
        }
    });
    return current_index;
}

function thumbclick() {
    img_carousel_thumb.forEach(function (c_image, index, arr) {
        let img_select = c_image.addEventListener('click', (e) => {
            console.log(index);
            setimage(index)
        });
    });
}

function setimage(sel_index) {
    img_carousel.forEach(function (sel_image, img_index, arr) {
        let img_select = sel_image;
        if (img_index != sel_index) {
            sel_image.setAttribute('data-current', 'false');
        } else {
            sel_image.setAttribute('data-current', 'true');
        }
    });
    img_carousel_thumb.forEach(function (sel_image, tmb_index, arr) {
        let tmbimg_select = sel_image;

        if (tmb_index != sel_index) {
            tmbimg_select.setAttribute('data-current', 'false');
        } else {
            tmbimg_select.setAttribute('data-current', 'true');
        }
    });
}

function find_current2() {
    img_carousel2.forEach(function (c_image, index, arr) {
        let img_select = c_image.getAttribute('data-current');

        if (img_select === "true") {
            current_index = index;
        }
    });
    return current_index;
}

function find_currentThumb2() {
    img_carousel_thumb2.forEach(function (c_image, index, arr) {
        let img_select = c_image.getAttribute('data-current');

        if (img_select === "true") {
            current_index = index;
        }
    });
    return current_index;
}

function thumbclick2() {
    img_carousel_thumb2.forEach(function (c_image, index, arr) {
        let img_select = c_image.addEventListener('click', (e) => {
            setimage(index)
            setimage2(index)
        });
    });
}

function setimage2(sel_index) {
    img_carousel2.forEach(function (sel_image, img_index, arr) {
        let img_select = sel_image;

        if (img_index != sel_index) {
            sel_image.setAttribute('data-current', 'false');
        } else {
            sel_image.setAttribute('data-current', 'true');
        }
    });
    img_carousel_thumb2.forEach(function (sel_image, tmb_index, arr) {
        let tmbimg_select = sel_image;

        if (tmb_index != sel_index) {
            tmbimg_select.setAttribute('data-current', 'false');
        } else {
            tmbimg_select.setAttribute('data-current', 'true');
        }
    });
}



function change_qty(qtyaction, event = "") {

    if (qtyaction === "plus") {
        qty = total_qty.innerHTML;
        eval(qty++);
        total_qty.innerHTML = qty;
    } else {
        qty = total_qty.innerHTML;
        if (eval(qty) > 0) {
            eval(qty--);
            total_qty.innerHTML = qty;
        }
    }
}

function addtocart(itemqty = 0, itemtotal = 0, itemunitvalue = 0, itemdesc = "Full Limited Edition Sneakers ") {
    let item_grp = document.createElement("div");
    item_grp.className = "group";

    let item_wrp = document.createElement("div");
    item_wrp.className = "item";

    let item_pvw = document.createElement("img")
    item_pvw.className = "item-img-pvw";
    item_pvw.setAttribute('src', './images/image-product-1-thumbnail.jpg');

    let item_desc = document.createElement("span");
    item_desc.className = "item-desc-txt";

    let item_qty_total = document.createElement("span");

    let items_total = document.createElement("span");
    items_total.className = "items-total";

    let item_del = document.createElement("img");
    item_del.className = "item-img-del";
    item_del.setAttribute('src', './images/icon-delete.svg');

    item_desc.innerHTML = itemdesc;
    items_total.innerHTML = " $" + total_value;
    item_qty_total.innerHTML = "$" + itemunitvalue + " x " + itemqty;
    item_wrp.appendChild(item_pvw);
    item_grp.appendChild(item_desc);
    item_grp.appendChild(item_qty_total);
    item_grp.appendChild(items_total);
    item_wrp.appendChild(item_grp);
    item_wrp.appendChild(item_del);

    let cart_text = my_cart.innerHTML;
    if (cart_text.trim() == 'Your cart is empty.') {
        my_cart.innerHTML = "";
        item_wrp.className = "cart-item item" + eval(my_cart.children.length + 1);
        my_cart.appendChild(item_wrp);
    } else {
        item_wrp.className = "cart-item item" + eval(my_cart.children.length + 1);
        my_cart.appendChild(item_wrp);
    }

    let my_cartentries = document.querySelectorAll('.cart-item');
    my_cartentries.forEach((cart_entry, index) => {
        let item_remove = cart_entry.querySelector('.item-img-del');
        let item_parent = item_remove.parentNode;
        item_remove.addEventListener('click', (e) => {
            item_remove.removeEventListener;
            removefromcart(item_parent)
        });
    });
}

function removefromcart(cartitem) {
    cartitem.remove();
}


forward.addEventListener('click', (e) => {
    current_index = find_current();

    if (current_index <= img_carousel.length - 1) {

        if (new_index < img_carousel.length - 1) {
            new_index = current_index + 1;
        } else {
            new_index = 0;
        }
        img_carousel[new_index].setAttribute('data-current', 'true');
        img_carousel[current_index].setAttribute('data-current', 'false');
        img_carousel_thumb[new_index].setAttribute('data-current', 'true');
        img_carousel_thumb[current_index].setAttribute('data-current', 'false');
    }
});

backward.addEventListener('click', (e) => {
    current_index = find_current();

    if (current_index > 0) {

        new_index = current_index - 1;
        img_carousel[new_index].setAttribute('data-current', 'true');
        img_carousel[current_index].setAttribute('data-current', 'false');
        img_carousel_thumb[new_index].setAttribute('data-current', 'true');
        img_carousel_thumb[current_index].setAttribute('data-current', 'false');
    } else {
        new_index = 3;
        img_carousel[new_index].setAttribute('data-current', 'true');
        img_carousel[current_index].setAttribute('data-current', 'false');
        img_carousel_thumb[new_index].setAttribute('data-current', 'true');
        img_carousel_thumb[current_index].setAttribute('data-current', 'false');
    }
});


forward2.addEventListener('click', (e) => {
    current_index = find_current2();

    if (current_index <= img_carousel2.length - 1) {

        if (new_index < img_carousel2.length - 1) {
            new_index = current_index + 1;
        } else {
            new_index = 0;
        }
        img_carousel2[new_index].setAttribute('data-current', 'true');
        img_carousel2[current_index].setAttribute('data-current', 'false');
        img_carousel_thumb2[new_index].setAttribute('data-current', 'true');
        img_carousel_thumb2[current_index].setAttribute('data-current', 'false');
    }
    setimage(new_index);
});

backward2.addEventListener('click', (e) => {
    current_index = find_current2();

    if (current_index > 0) {

        new_index = current_index - 1;
        img_carousel2[new_index].setAttribute('data-current', 'true');
        img_carousel2[current_index].setAttribute('data-current', 'false');
        img_carousel_thumb2[new_index].setAttribute('data-current', 'true');
        img_carousel_thumb2[current_index].setAttribute('data-current', 'false');
    } else {
        new_index = 3;
        img_carousel2[new_index].setAttribute('data-current', 'true');
        img_carousel2[current_index].setAttribute('data-current', 'false');
        img_carousel_thumb2[new_index].setAttribute('data-current', 'true');
        img_carousel_thumb2[current_index].setAttribute('data-current', 'false');
    }
    setimage(new_index);
});


decrease_qty.addEventListener("click", (e) => {
    change_qty("minus");
});

increase_qty.addEventListener("click", (e) => {
    change_qty("plus");
});

add2basket.addEventListener("click", (e) => {
    e.preventDefault;
    let item_qty = 0;
    let prod_value = document.querySelector('.price-value');

    item_qty = eval(total_qty.innerHTML);
    item_unit_value = eval(prod_value.innerHTML);

    total_value = eval(item_unit_value * item_qty);

    if (item_qty > 0) {
        qty_error.style.border = "none";
        addtocart(item_qty, total_value, item_unit_value);
        total_qty.innerHTML = 0;
    } else {

        qty_error.style.border = "2px solid red";
    }

});

my_basket.addEventListener('mouseover', (e) => {
    if (cart_wrapper.getAttribute("data-visible") == 'false') {
        cart_wrapper.setAttribute("data-visible", "true");
    }
})

cart_wrapper.addEventListener('touchstart', (e) => {
    let outside = document.querySelector('.ecommerce-wrapper');
    outside.addEventListener('touchstart', (evt) => {
        if (!evt.target.closest('.mycart')) {
            if (cart_wrapper.getAttribute("data-visible") == 'true') {
                cart_wrapper.setAttribute("data-visible", "false");
                outside.removeEventListener;
            }
        }
    });
});

cart_wrapper.addEventListener('mouseleave', (e) => {
    if (cart_wrapper.getAttribute("data-visible") == 'true') {
        cart_wrapper.setAttribute("data-visible", "false");
    }
})

thumbclick();
thumbclick2();