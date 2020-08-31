const recipes = document.querySelectorAll('.recipe');
const modal = document.querySelector('.modal_overlay');
for (const recipe of recipes) {
    recipe.addEventListener('click', function(){
        modal.classList.add('active');
        modal.querySelector('.modal img').src = recipe.querySelector('.recipe_image img').src;
        modal.querySelector('.modal_title h1').innerHTML = recipe.querySelector('.recipe_title h1').textContent;
        modal.querySelector('.modal_author p').innerHTML = recipe.querySelector('.recipe_author p').textContent;
    })
}

modal.querySelector('.modal a').addEventListener('click', function(){
    modal.classList.remove('active');
})