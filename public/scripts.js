const recipes = document.querySelectorAll('.recipe');
for (const recipe of recipes) {
    recipe.addEventListener('click', function(){
        const cardID = recipe.getAttribute('id'); 
        window.location.href = `/recipes/${cardID}`;
    })
}
const abouts = document.querySelectorAll('.about');
for (const about of abouts) {
    const button = about.querySelector('.sub_button'); 
    button.addEventListener('click', function(){
        const description =  about.querySelector('.detail_description');
        if(description.classList.contains('active')){
            description.classList.remove('active')
            button.querySelector('a').innerHTML = 'ESCONDER';
        }else{
            description.classList.add('active');
            button.querySelector('a').innerHTML = 'MOSTRAR';
        }
    })
}

modal.querySelector('.modal a').addEventListener('click', function(){
    modal.classList.remove('active');
})