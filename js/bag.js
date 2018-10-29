;(function () {
    let bagCount = document.getElementById('bag-count'),
        bagSum = document.getElementById('bag-sum'),
        itemNumber = document.getElementById('item-number'),
        bagContainer = document.getElementById('bag-container'),
        buyButton = document.getElementById('buy'),
        clearButton = document.getElementById('clear'),
        isEmpty = document.getElementById('is-empty'),
        doc = document;


    bagCount.textContent = localStorage.bagTotal || '';
    if(localStorage.items){
        let number = 0;
        JSON.parse(localStorage.items).forEach((item) => {
            number += parseInt(item.quantity);
        });
        itemNumber.textContent = number;
    }
    //itemNumber.textContent = localStorage.items ? JSON.parse(localStorage.items).length : 0;
    bagSum.textContent = localStorage.bagTotal ? localStorage.bagTotal : 0;

    function showItems() {
        let items = localStorage.items ? JSON.parse(localStorage.items) : 0;
        console.log(items);
        if(items === 0 || items.length === 0) isEmpty.style.display = 'block';
        else{
            items.forEach((item, i) => {
                let bagItemContainer = doc.getElementById('bag-container');
                let bagItem = document.createElement('div');
                bagItem.classList.add('item');
                bagItem.dataset.index = i;
                bagItem.innerHTML = `
     
                <a href="item.html" class="item-link new">
                    <div class="image-wrapper">
                        <img src="images/man-1.png" alt="Best offer image">
                    </div>
                    <dl>
                        <dt class="name">${item.name}</dt>
                        <dd class="cost">£${item.price}</dd>
                    </dl>
                </a>
                <div class="card-options">
                    <span>Colour: <span>${item.color}</span></span>
                    <span>Size: <span>${item.size}</span></span>
                </div>
                <div class="quantity">
                    <span class="quantity-title">Quantity:</span>
                    <button class="quantity-minus">
                        <img src="images/minus.png" alt="minus">
                    </button>
                    <input type="text" value="${item.quantity}">
                    <button class="quantity-plus">
                        <img src="images/plus.png" alt="plus">
                    </button>
                </div>
                <button class="remove">Remove item</button>
                `;
                bagItemContainer.appendChild(bagItem);
            });
            const minus = document.querySelectorAll('.quantity-minus');
            const plus = document.querySelectorAll('.quantity-plus');
            for (let i = 0; i < minus.length; i++) {
                minus[i].addEventListener('click', e => {

                    let cou = +minus[i].parentNode.children[2].value;
                    if (e.target.tagName !== 'IMG' ) return;
                    if (cou === 1) return;
                    const parent = e.target.parentNode.parentNode;
                    const counter = parent.children[2];
                    const price = +parent.parentNode.children[0].children[1].children[1].textContent.slice(1);
                    const index = parent.parentNode.dataset.index;
                    const currentPrice = +localStorage.bagTotal;
                    let value = counter.value;
                    let items = JSON.parse(localStorage.items);
                    const newPrice = currentPrice - price;
                    counter.value = +value - 1;
                    localStorage.setItem('bagTotal', newPrice.toFixed(2));
                    bagSum.textContent = newPrice.toFixed(2);
                    bagCount.textContent = localStorage.bagTotal || '';
                    items[index].quantity--;
                    localStorage.setItem('items', JSON.stringify(items));

                    let number = 0;
                    JSON.parse(localStorage.items).forEach((item) => {
                        number += parseInt(item.quantity);
                    });
                    itemNumber.textContent = number;
                    console.log(number)
                });
            }
            for (let i = 0; i < plus.length; i++){
                plus[i].addEventListener('click', e => {
                    if (e.target.tagName !== 'IMG' ) return;
                    const parent = e.target.parentNode.parentNode;
                    const counter = parent.children[2];
                    const price = +parent.parentNode.children[0].children[1].children[1].textContent.slice(1);
                    const currentPrice = +localStorage.bagTotal;
                    const index = parent.parentNode.dataset.index;
                    let items = JSON.parse(localStorage.items);
                    let value = counter.value;
                    counter.value = +value + 1;
                    const newPrice = currentPrice + price;

                    localStorage.setItem('bagTotal', newPrice.toFixed(2));
                    bagCount.textContent = localStorage.bagTotal || '';
                    bagSum.textContent = newPrice.toFixed(2);
                    items[index].quantity++;
                    localStorage.setItem('items', JSON.stringify(items));

                    let number = 0;
                    JSON.parse(localStorage.items).forEach((item) => {
                        number += parseInt(item.quantity);
                    });
                    itemNumber.textContent = number;
                    console.log(number)
                })
            }

            let removeItem = document.querySelectorAll('.remove');
            for(let i = 0; i < removeItem.length; i++){
                removeItem[i].addEventListener('click', e =>{
                    const parent = e.target.parentNode.parentNode;
                    const name = parent.getElementsByClassName('name')[0].textContent;
                    let items = JSON.parse(localStorage.items);
                    let target = e.target;
                    items.splice(items.findIndex(item => item.name === name), 1);
                    localStorage.setItem('items', JSON.stringify(items));
                    let newPrice = 0;
                    let newNumb = 0;
                    items.forEach(item => {
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
        }
    }

    function handleClear(){
        let children = bagContainer.children;

        if(children.length === 0) return;

        for(let i = children.length - 1; i >= 0 ; i--){
            bagContainer.removeChild(children[i]);
        }
        localStorage.removeItem('items');
        localStorage.removeItem('bagTotal');
        itemNumber.textContent = 0;
        bagSum.textContent = 0 ;
        bagCount.textContent = '';
        isEmpty.style.display = 'block';
    }

    function handleBuy() {
        let children = bagContainer.children;

        if(children.length === 0) return;

        for(let i = children.length - 1; i >= 0 ; i--){
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

}());