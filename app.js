const cursos = document.querySelector(".cursos");
const carritoView = document.querySelector(".tbl-carrito tbody");
const deleteCurso = document.querySelector("#carrito");
const btnVaciar = document.querySelector(".btn-vaciar");
let carrito = [];

console.log(carritoView);


load_event_listeners();


function load_event_listeners (){
    cursos.addEventListener('click', add_curso); 
    deleteCurso.addEventListener('click', delete_curso);
    btnVaciar.addEventListener('click', () => {
        carrito = [];
        limpiarHTML();
    });
}

function add_curso(e){

    if(e.target.classList.contains('btn-agregar')){
        const curso_sel = e.target.parentElement;
        getCurso(curso_sel);
    }; 
}

function getCurso(curso){

    infoCurso = { 
        img: curso.querySelector('img').src, 
        title : curso.querySelector('h3').textContent, 
        instructor : curso.querySelector('.card-instructor').textContent, 
        price : curso.querySelector('.card-price').textContent,
        cantidad: 1,
        id : curso.querySelector('.btn-agregar').getAttribute('data-id')
    }

    // busco si el curso ya existe en el carrito
    const  existe = carrito.some( cursos => cursos.id === infoCurso.id);
    
    if(existe){

        //recorro el carrito para aumentarle la cantidad al curso repetido, Este a través de .map se guardará en un nuevo arreglo llamado cursos
        const cursos = carrito.map( curso => {

            if(curso.id === infoCurso.id){
                curso.cantidad++;
            }
            return curso;
            
        })

        // le paso a carrito el valor de cursos
        carrito = [...cursos];
    }
    else{
        carrito = [...carrito, infoCurso];
    }

    
    addCarritoHtml();
}

function addCarritoHtml(){

   limpiarHTML();
   
    carrito.forEach( curso => {

        const {id, img, title, price, cantidad} = curso;

        row = document.createElement('tr');
        row.innerHTML = 
        `<td><img class="img-carrito" src="${img}"></td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${cantidad}</td>
        <td><a class="btn-delete" href="#" data-id="${id}">X</a></td>`;
        carritoView.appendChild(row);

    })
}   

function delete_curso(e){
    if (e.target.classList.contains('btn-delete')){

        id = e.target.getAttribute('data-id');
        curso = carrito.filter( curso => curso.id === id);
        cantidad = curso[0].cantidad

        if(cantidad > 1){
            upd_carrito = carrito.map( curso => {

                if(curso.id === id){
                    curso.cantidad--;
                }
                return curso
            })

            carrito = [...upd_carrito]
        }
        else{
            carrito = carrito.filter( curso => curso.id !== id);
        }

        addCarritoHtml();
    }
}

function limpiarHTML(){
    while(carritoView.firstChild){
        carritoView.removeChild(carritoView.firstChild);
    }
}
