const recipes = document.querySelectorAll('.recipe');
for (const recipe of recipes) {
    recipe.addEventListener('click', function(){
        const cardID = recipe.getAttribute('id'); 
       window.location.href = `/recipes/${cardID}`;
    })
}

modal.querySelector('.modal a').addEventListener('click', function(){
    modal.classList.remove('active');
})