//URL de la API
const API = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=00";

// Obtener resultado de API
const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json), paginacion(json);
        })
        .catch((error) => {
            console.log("Error :", error);
        });
};

const llenarDatos = (data) => {
    let html = "";
    document.getElementById("datosPersonajes").innerHTML = "";
    data.results.forEach((pj) => {
        const pokeURL = pj.url;
        return fetch(pokeURL)
            .then((response) => response.json())
            .then((json) => {
                llenarTarjeta(json, html)
            })
            .catch((error) => {
                console.log("Error :", error);
            });
    });
};

let html = "";
const PokeFichas = (data, html) => {
    if (data != "") {
        html += '<div class="col mt-5">';
        html += '<div class="card" style="width: 10rem;">';
        html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
        html += '<div class="card-body">';
        html += `<h5 class = "card-title" >${data.name}</h5>`;
        html += `<p class="card-text">Altura :${data.height}</p>`;
        html += `<p class="card-text">Peso :${data.weight}</p>`;
        html += "</div>";
        html += "</div>";
        html += "</div>";
        document.getElementById("datosPersonajes").innerHTML = html;
    }

}

// Paginacion
const paginacion = (info) => {
    let prevDisabled = "";
    let nextDisabled = "";

    if (info.previous == null) {
        prevDisabled = "disabled";
    } else {
        prevDisabled = "";
    }

    if (info.next == null) {
        nextDisabled = "disabled";
    } else {
        nextDisabled = "";
    }

    let html = "";
    html += `<li class="page-item ${prevDisabled}"><a class="page-link" onclick="getData('${info.previous}')">Previous</a></li>`;
    html += `<li class="page-item ${nextDisabled}"><a class="page-link" onclick="getData('${info.next}')">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
};

//EjecutargetData
getData(API);