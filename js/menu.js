let search = document.getElementById('search'),
    popUp = document.getElementById('pop-up'),
    buttons = popUp.children;

search.addEventListener('click', (e) => {
    e.preventDefault();

    let searchField = document.getElementById('search-field');
    if(getComputedStyle(searchField).display == 'none') searchField.style.display = 'block';
    else searchField.style.display = 'none';
});

popUp.addEventListener('click', () => {
    console.log(buttons);
    let headerBottom = document.getElementById('header-bottom');
    if(getComputedStyle(headerBottom).display == 'none'){
        headerBottom.style.display = 'flex';
        buttons[0].style.display = 'none';
        buttons[1].style.display = 'block';
    }
    else{
        headerBottom.style.display = 'none';
        buttons[0].style.display = 'block';
        buttons[1].style.display = 'none';
    }
}); 