;(function () {
    let filter = document.getElementById('filter'),
        filterTablet = document.getElementById('filterTablet'),
        filterHeaders = document.getElementById('filter-headers').children,
        bagCount = document.getElementById('bag-count'),
        itemNumber = document.getElementById('item-number');

    bagCount.textContent = localStorage.bagTotal || '';
    itemNumber.textContent = localStorage.items ? JSON.parse(localStorage.items).length : 0;

    function handleFilter(e) {
        let target = e.target;
        if(target.tagName !== "LI") return;

        let filterValue = target.parentElement.previousElementSibling,
            filterName = filterValue.previousElementSibling,
            parent = filterValue.parentElement;
        if(target.textContent === 'Not selected'){
            filterValue.style.display = 'none';
            parent.style.padding = '25px 20px';
            filterName.style.fontSize = '16px';
            filterName.style.marginBottom = '0px';
            target.parentElement.style.margin = '25px 0 0 0';
        }
        else{
            filterValue.textContent = target.textContent;
            filterValue.style.display = 'block';
            filterName.style.fontSize = '12px';
            filterName.style.marginBottom = '7px';
            parent.style.padding = '15px 20px';
            target.parentElement.style.margin = '15px 0 0 0';
        }
    }

    function handleFilterTablet(e) {
        let target = e.target,
            itemsContainer = this.children[1],
            header = this.children[0],
            lastHeaderLi = header.children[0].children[header.children[0].children.length - 1];

        if(getComputedStyle(itemsContainer).display === 'none'){
            itemsContainer.style.display = 'flex';
            header.style.background = 'url("images/close.png") no-repeat 95% 50%';
        }
        else{
            itemsContainer.style.display = 'none';
            header.style.background = "url(\"images/drop-down-ico.png\") no-repeat 95% 50%";
        }

        if(target.tagName !== "LI") return;
        itemsContainer.style.display = 'flex';

        let targetId = target.parentElement.dataset.id,
            parent = target.parentElement.parentElement,
            siblings = target.parentElement.children;

        for(let i = 0; i < siblings.length; i++){
            if(siblings[i].classList.contains('current-li')) siblings[i].classList.remove('current-li');
        }

        if(target.textContent === 'Not selected'){
            target.style.color = '#000';
            filterHeaders[targetId].textContent = target.parentElement.previousElementSibling.textContent + ' , ';
            filterHeaders[targetId].style.color = '#a8a8a8';
        }else{
            filterHeaders[targetId].textContent = target.textContent;
            filterHeaders[targetId].style.color = '#f14a58';
            target.classList.add('current-li');

        }
    }

    filter.addEventListener('click', handleFilter);
    filterTablet.addEventListener('click', handleFilterTablet);
}());

