const currentPage = location.pathname;

let menuLinks;

if(currentPage.includes("admin")){
    menuLinks = document.querySelectorAll(".headerAdmin > div a");
}else{
    menuLinks = document.querySelectorAll(".menu > a");
}

for (const link of menuLinks) {
    if(currentPage.includes(link.getAttribute("href"))){
        link.classList.add("active");
    }
}


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

function addField(content){
    const contents = document.querySelector(`#${content}s`);
    const fieldContainer = document.querySelectorAll(`.${content}`);

    //realiza um clone do último conteúdo adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    //não adiciona um novo input se o último tem um valor vazio
    if(newField.children[0].value == '') return false;

    //deixa o valor do input vazio
    newField.children[0].value = '';
    contents.appendChild(newField);
}

const addIngredient = document.querySelector(".add-ingredient");

if(addIngredient){
    addIngredient.addEventListener('click', addField.bind(null, 'ingredient'), false);
}

const addStep = document.querySelector(".add-step");

if(addStep){
    addStep.addEventListener('click', addField.bind(null, 'step'), false);
}