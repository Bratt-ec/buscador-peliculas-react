import React ,{ Fragment, useState} from  'react';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import Alert from './Alert';

const Form = (props) => {
    const { valor, setValor} = props;
    const[error, setError] = useState(false);
    // variables
    const divResultado = document.querySelector('#resultado');
    const paginacionDiv = document.querySelector('#paginacion');
    const registrosPorPagina = 30;
    let totalPaginas;
    let iterador;
    let paginaActual = 1;

 const searchMovie =  (e) =>{

        e.preventDefault();

        if(valor === ''){
            setError(true);
            return;
        }
        
        setError(false)
        buscarPelicula();

    async function buscarPelicula(){
                //  API Buscar película
            const key = '98da8dd30fc05b04591833c8620534ab';
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=es-ES&query=${valor}&page=${paginaActual}&include_adult=false`;
        
            try {
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                // si no hay resultados de busqueda imprime mensaje
                if(datos.total_results === 0){
                    alert('No se ha encontrado, intente otra busqueda');
                    return;
                }
                console.log(datos.results);
                totalPaginas = calcularPaginas(datos.total_results);
                mostrarPeliculas(datos.results);    
            } catch (error) {
                console.log(error);
            }
        }
    // Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
    function *crearPaginador(total) {
        for (let i = 1; i <= total; i++ ) {
            yield i;
        }
    }
    // calcular registros por página
    function calcularPaginas(total) {
        return parseInt( Math.ceil( total / registrosPorPagina ));
    }

    // Mostrar películas
    function mostrarPeliculas(peliculas){

        // removemos algun resultado previo
        while (divResultado.firstChild) {
            divResultado.removeChild(divResultado.firstChild);
        }
        // 
        peliculas.forEach( pelicula =>{
            const imgUrl = 'http://image.tmdb.org/t/p/w300_and_h450_bestv2/';
            const {title,overview,release_date,vote_average,poster_path,} = pelicula;
    
            divResultado.innerHTML += `
            <div class="card small-c mb-1 col-md-2 col-sm-3">
                <div class="bg-dark">
                    <img class="h-100 w-100" src="${imgUrl + poster_path}" alt="Poster de la Película" >
    
                    <div class="p-1">
                        <p class="font-bold h4" id="#titulo-peli"> ${title}</p>
                        <p class="font-bold">Fecha de estreno: <span class="font-light"> ${release_date} </span> </p>
                        <p class="font-bold">Puntuación: <span class="font-light"> ${vote_average}/10 </span> </p>
                    </div>
                </div>
            </div>
            `;
        });
        // Limpiar el paginador previo
        while(paginacionDiv.firstChild) {
            paginacionDiv.removeChild(paginacionDiv.firstChild)
        }
    
        // Generamos el nuevo HTML
        imprimirPaginador();
        
    }
    // 
    function imprimirPaginador() {
        iterador = crearPaginador(totalPaginas);
    
        while(true) {
            const { value, done} = iterador.next();
            if(done) return;
    
            // Caso contrario, genera un botón por cada elemento en el generador
            const boton = document.createElement('a');
            boton.href = '#';
            boton.dataset.pagina = value;
            boton.textContent = value;
            boton.classList.add('siguiente','font-bold', 'mb-4', 'rounded','page-link');
    
            boton.onclick = () => {
                paginaActual = value;
    
                buscarPelicula();
            }
    
            paginacionDiv.appendChild(boton);
        }
    }
}

    return ( 
        <Fragment>
            <div className="form-group">
                <form onSubmit={searchMovie}>
                    <label className="col-form-label">Escriba el nombre de una película</label>
                        <div className="form-group d-flex pt-2 form-row">
                            <input 
                                type="text" 
                                className="form-control col-sm-8 col-lg-4" 
                                placeholder="Por ejemplo... Jurasic Park" 
                                id="inputBusqueda"
                                onChange = { e => { setValor(e.target.value) } } 
                            />
                        </div>
                        <div className='form-row'>
                            <button type="submit" className="btn btn-success col-sm-3 col-lg-2"><i className='bx bx-search-alt' />Buscar</button>
                        </div>
                        { (error) ?  <Alert /> : null }                    
                </form>
            </div>
            <div id="resultado" className='row d-flex'>

            </div>
            <div id="paginacion" className="d-flex pagina flex-wrap justify-content-center pagination ">
                
            </div>  
        </Fragment>
     );
}
 
export default Form;