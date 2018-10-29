'use strict';

;(function () {
    var bagCount = document.getElementById('bag-count'),
        bagSum = document.getElementById('bag-sum'),
        itemNumber = document.getElementById('item-number'),
        bagContainer = document.getElementById('bag-container'),
        buyButton = document.getElementById('buy'),
        clearButton = document.getElementById('clear'),
        isEmpty = document.getElementById('is-empty'),
        doc = document;

    bagCount.textContent = localStorage.bagTotal || '';
    if (localStorage.items) {
        var number = 0;
        JSON.parse(localStorage.items).forEach(function (item) {
            number += parseInt(item.quantity);
        });
        itemNumber.textContent = number;
    }
    //itemNumber.textContent = localStorage.items ? JSON.parse(localStorage.items).length : 0;
    bagSum.textContent = localStorage.bagTotal ? localStorage.bagTotal : 0;

    function showItems() {
        var items = localStorage.items ? JSON.parse(localStorage.items) : 0;
        console.log(items);
        if (items === 0 || items.length === 0) isEmpty.style.display = 'block';else {
            (function () {
                items.forEach(function (item, i) {
                    var bagItemContainer = doc.getElementById('bag-container');
                    var bagItem = document.createElement('div');
                    bagItem.classList.add('item');
                    bagItem.dataset.index = i;
                    bagItem.innerHTML = '\n     \n                <a href="item.html" class="item-link new">\n                    <div class="image-wrapper">\n                        <img src="images/man-1.png" alt="Best offer image">\n                    </div>\n                    <dl>\n                        <dt class="name">' + item.name + '</dt>\n                        <dd class="cost">\xA3' + item.price + '</dd>\n                    </dl>\n                </a>\n                <div class="card-options">\n                    <span>Colour: <span>' + item.color + '</span></span>\n                    <span>Size: <span>' + item.size + '</span></span>\n                </div>\n                <div class="quantity">\n                    <span class="quantity-title">Quantity:</span>\n                    <button class="quantity-minus">\n                        <img src="images/minus.png" alt="minus">\n                    </button>\n                    <input type="text" value="' + item.quantity + '">\n                    <button class="quantity-plus">\n                        <img src="images/plus.png" alt="plus">\n                    </button>\n                </div>\n                <button class="remove">Remove item</button>\n                ';
                    bagItemContainer.appendChild(bagItem);
                });
                var minus = document.querySelectorAll('.quantity-minus');
                var plus = document.querySelectorAll('.quantity-plus');

                var _loop = function _loop(i) {
                    minus[i].addEventListener('click', function (e) {

                        var cou = +minus[i].parentNode.children[2].value;
                        if (e.target.tagName !== 'IMG') return;
                        if (cou === 1) return;
                        var parent = e.target.parentNode.parentNode;
                        var counter = parent.children[2];
                        var price = +parent.parentNode.children[0].children[1].children[1].textContent.slice(1);
                        var index = parent.parentNode.dataset.index;
                        var currentPrice = +localStorage.bagTotal;
                        var value = counter.value;
                        var items = JSON.parse(localStorage.items);
                        var newPrice = currentPrice - price;
                        counter.value = +value - 1;
                        localStorage.setItem('bagTotal', newPrice.toFixed(2));
                        bagSum.textContent = newPrice.toFixed(2);
                        bagCount.textContent = localStorage.bagTotal || '';
                        items[index].quantity--;
                        localStorage.setItem('items', JSON.stringify(items));

                        var number = 0;
                        JSON.parse(localStorage.items).forEach(function (item) {
                            number += parseInt(item.quantity);
                        });
                        itemNumber.textContent = number;
                        console.log(number);
                    });
                };

                for (var i = 0; i < minus.length; i++) {
                    _loop(i);
                }
                for (var i = 0; i < plus.length; i++) {
                    plus[i].addEventListener('click', function (e) {
                        if (e.target.tagName !== 'IMG') return;
                        var parent = e.target.parentNode.parentNode;
                        var counter = parent.children[2];
                        var price = +parent.parentNode.children[0].children[1].children[1].textContent.slice(1);
                        var currentPrice = +localStorage.bagTotal;
                        var index = parent.parentNode.dataset.index;
                        var items = JSON.parse(localStorage.items);
                        var value = counter.value;
                        counter.value = +value + 1;
                        var newPrice = currentPrice + price;

                        localStorage.setItem('bagTotal', newPrice.toFixed(2));
                        bagCount.textContent = localStorage.bagTotal || '';
                        bagSum.textContent = newPrice.toFixed(2);
                        items[index].quantity++;
                        localStorage.setItem('items', JSON.stringify(items));

                        var number = 0;
                        JSON.parse(localStorage.items).forEach(function (item) {
                            number += parseInt(item.quantity);
                        });
                        itemNumber.textContent = number;
                        console.log(number);
                    });
                }

                var removeItem = document.querySelectorAll('.remove');
                for (var _i = 0; _i < removeItem.length; _i++) {
                    removeItem[_i].addEventListener('click', function (e) {
                        var parent = e.target.parentNode.parentNode;
                        var name = parent.getElementsByClassName('name')[0].textContent;
                        var items = JSON.parse(localStorage.items);
                        var target = e.target;
                        items.splice(items.findIndex(function (item) {
                            return item.name === name;
                        }), 1);
                        localStorage.setItem('items', JSON.stringify(items));
                        var newPrice = 0;
                        var newNumb = 0;
                        items.forEach(function (item) {
                            newPrice += item.quantity * 180.60;
                            newNumb += item.quantity;
                        });
                        console.log(newPrice.toFixed(2));

                        localStorage.setItem('bagTotal', newPrice.toFixed(2));
                        bagCount.textContent = localStorage.bagTotal || '';
                        bagSum.textContent = newPrice.toFixed(2);
                        itemNumber.textContent = newNumb;
                        console.log(bagContainer.removeChild(target.parentElement));
                    });
                }
            })();
        }
    }

    function handleClear() {
        var children = bagContainer.children;

        if (children.length === 0) return;

        for (var i = children.length - 1; i >= 0; i--) {
            bagContainer.removeChild(children[i]);
        }
        localStorage.removeItem('items');
        localStorage.removeItem('bagTotal');
        itemNumber.textContent = 0;
        bagSum.textContent = 0;
        bagCount.textContent = '';
        isEmpty.style.display = 'block';
    }

    function handleBuy() {
        var children = bagContainer.children;

        if (children.length === 0) return;

        for (var i = children.length - 1; i >= 0; i--) {
            bagContainer.removeChild(children[i]);
        }
        localStorage.removeItem('items');
        localStorage.removeItem('bagTotal');
        bagSum.textContent = 0;
        bagCount.textContent = '';
        itemNumber.textContent = 0;
        isEmpty.textContent = 'Thank you for your purchase!';
        isEmpty.style.color = '#f14a58';
        isEmpty.style.display = 'block';
    }

    buyButton.addEventListener('click', handleBuy);
    clearButton.addEventListener('click', handleClear);
    window.addEventListener('load', showItems);
})();