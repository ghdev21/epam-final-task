(function () {
    let bagCount = document.getElementById('bag-count'),
        itemNumber = document.getElementById('item-number'),
        thumbnail = document.getElementById('thumbnail'),
        children = thumbnail.children,
        feature = document.getElementById('feature'),
        addButton = document.getElementById('add');
    children[0].children[0].style.display = 'block';
    bagCount.textContent = localStorage.bagTotal || '';
    itemNumber.textContent = localStorage.items ? JSON.parse(localStorage.items).length : 0;

    function handleThumbnail(e) {
        let target = e.target;

        if(target.tagName !== 'DIV') return;

        let bgImage = getComputedStyle(target).backgroundImage,
            start = bgImage.indexOf('images/'),
            end = parseInt(bgImage.indexOf('")')),
            src = bgImage.substring(start, end);//bgImage.replace(/url\(/g, '').replace(/\)/g, '');

        for(let i = 0; i < children.length; i++){
            children[i].children[0].style.display = 'none';
        }
        target.children[0].style.display = 'block';
        target.parentElement.previousElementSibling.src = src;
    }

    function handleFeature(e) {
        let target = e.target;

        if(target.tagName !== 'LI') return;

        let siblings = target.parentElement.children;

        for(let i = 0; i < siblings.length; i++){
            siblings[i].classList.remove('current-feature');
        }

        target.classList.add('current-feature');
    }

    function handleAdd() {
        function searchActive(node) {
            let number;
            for (let i = 0; i < node.children.length; i++) {
                if (node.children[i].classList.contains('current-feature')) {
                    number = i;
                    break;
                }
            }
            return number;
        }

        let itemsArray = localStorage.items ? JSON.parse(localStorage.items) : [],
            currentItemNumber = parseInt(itemNumber.textContent),
            totalPrice = parseFloat(localStorage.bagTotal) || 0,
            name = document.getElementById('item-name').textContent,
            price = document.getElementById('item-price').textContent,
            color = document.getElementById('item-color'),
            size = document.getElementById('item-size'),
            quantity = 1,
            photo = document.getElementById('item-photo').src + 'endimage',
            isDuplicate = itemsArray.some((item) => {
                if (item.name === name) {
                    if (item.color === color.children[searchActive(color)].textContent && item.size === size.children[searchActive(size)].textContent) {
                        item.quantity += 1;
                        return true;
                    }
                    else return false;
                }
                return false;
            });
        if (isDuplicate === true) {
            localStorage.setItem('items', JSON.stringify(itemsArray));
        }
        else {
            let itemObj = {
                name,
                price,
                color: color.children[searchActive(color)].textContent,
                size: size.children[searchActive(size)].textContent,
                quantity,
                photo: photo.substring(photo.indexOf('images/'), photo.indexOf('endimage'))
            };
            itemsArray.push(itemObj);
            localStorage.setItem('items', JSON.stringify(itemsArray));
        }
        totalPrice += parseFloat(price);
        localStorage.setItem('bagTotal', totalPrice.toFixed(1));
        bagCount.textContent = localStorage.bagTotal;
        itemNumber.textContent = currentItemNumber + 1;
    }

    addButton.addEventListener('click', handleAdd);
    feature.addEventListener('click', handleFeature);
    thumbnail.addEventListener('click', handleThumbnail);
}());