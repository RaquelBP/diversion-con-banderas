const listaDOM= document.getElementById("countries-list")

fetch("https://restcountries.com/v3/all")
    .then((response)=>{
        if(!response.ok){
            throw new Error("La solicitud no fue exitosa:", response.status)
        }
        return response.json()
    })
    .then((data)=>{
        //Mete el resultado de la llamada a la función getData dentro de la variable dataArray
        const dataArray= getData(data)
        dataToDOM(dataArray)

    })

function getData(data){
    //Este array alamacenará todos los datos necesarios de cada país
    const dataArray=[]
    //Ejecuta sobre cada país (cada elemento dentro del array data)
    data.forEach((element, i) => {
        //Crea un array temporal para meter los datos que necesitamos de cada país como un único elemento dentro del dataArray
        const temporalArray=[]

        const nameData= data[i].name.common
        const flagData= data[i].flags[1]
        temporalArray.push(nameData, flagData) 

        //En caso de que el país no tenga capital, asígnale un array vacío
        if(data[i].capital){
            const capitalArrayData= data[i].capital
            temporalArray.push(capitalArrayData)
        } else{
            const capitalArrayData= []
            temporalArray.push(capitalArrayData)
        }
        const populatonData= data[i].population
        const carData= data[i].car.side
        temporalArray.push(populatonData, carData)
        dataArray.push(temporalArray)
    })
    //Devuelve el dataArray para usarlo fuera de esta función
    return dataArray
}

//Función para añadir los datos del dataArray al DOM
function dataToDOM(dataArray){
    //Ordena los paises alfabeticamente
    dataArray.sort()

    //Crea el ul para meter las banderas como li
    const listaUl= document.createElement("ul")
    listaDOM.appendChild(listaUl)

    //Crea el div para enseñar la información del país seleccionado al final de la página para que al abrirlo, no se desplacen las banderas abajo
    const infoDOM= document.createElement("div")
    infoDOM.setAttribute("id", "infoPaises")
    //Pon el div de información oculto al crearse para que solo se haga visible una vez de mos al click. SI no será visible el background color por el padding aunque no tenga texto todavía
    infoDOM.style.visibility = "hidden"
    listaDOM.appendChild(infoDOM)
    

    dataArray.forEach((element) => {
        const nombre= element[0]
        const bandera= element[1]
        
        const capitalIteracion = element[2]
        const capital= capitalIteracion.join(", ")
        
        const poblacion= element[3]
        const coche= element[4]

        const countryLi= document.createElement("li")
        countryLi.setAttribute("class", "countryDisplay")
        listaUl.appendChild(countryLi)

        const banderaImg = document.createElement("img")
        banderaImg.setAttribute("src", bandera)
        countryLi.appendChild(banderaImg)

        const nombreLi = document.createElement("p")
        nombreLi.textContent= nombre
        countryLi.appendChild(nombreLi)

    })

    //Para identificar qué pais estamos seleccionando hacemos un grupo de nodos al seleccinar todos los elementos li por clase. Al ser un grupo de nodos y no un array un map o un foeEach no funcionan
    const seleccion= document.getElementsByClassName("countryDisplay")
    //En cada elemento le creamos un posible eventlistener que activar si clickamos
    for(let i=0; i<seleccion.length; i++){
        seleccion[i].addEventListener("click", ()=>{
            infoDOM.innerHTML=""
            //Al hacer click hacemos el div de información visible
            infoDOM.style.visibility = "visible"

            const datosPais = document.createElement("div")
            infoDOM.appendChild(datosPais)

            //Crea el boton cerrar
            const cerrarDOM= document.createElement("button")
            infoDOM.appendChild(cerrarDOM)
            cerrarDOM.innerText="Cerrar"
            //Si clickas el boton de cerrar, oculta el div de información
            cerrarDOM.addEventListener("click", ()=> {
                infoDOM.style.visibility = "hidden"
            })

            //Bandera
            const infoBandera= document.createElement("img")
            infoBandera.setAttribute("src", dataArray[i][1])
            datosPais.appendChild(infoBandera)

            //Abrimos lista para el resto de datos
            const infoDatos= document.createElement("p")
            datosPais.appendChild(infoDatos)
            const infoDatosLista= document.createElement("ul")
            infoDatos.appendChild(infoDatosLista)
            
            //Nombre
            const infoNombre= document.createElement("li")
            infoNombre.innerText= dataArray[i][0]
            infoDatosLista.appendChild(infoNombre)
            

            //Capital
            const infoCapital= document.createElement("li")
            infoDatosLista.appendChild(infoCapital)
            const tituloCapital= document.createElement("span")
            tituloCapital.innerText= "Capital: "
            infoCapital.appendChild(tituloCapital)
            const textoCapital = document.createTextNode(dataArray[i][2].join(", "));
            infoCapital.appendChild(textoCapital)
            
            
            //Población
            const infoPoblacion= document.createElement("li")
            infoDatosLista.appendChild(infoPoblacion)
            const tituloPoblacion= document.createElement("span")
            tituloPoblacion.innerText= "Población: "
            infoPoblacion.appendChild(tituloPoblacion)
            const textoPoblacion = document.createTextNode(dataArray[i][3]);
            infoPoblacion.appendChild(textoPoblacion)


            //Lado por el que conducen
            const infoCoche= document.createElement("li")
            infoDatosLista.appendChild(infoCoche)
            const tituloCoche= document.createElement("span")
            tituloCoche.innerText= "Lado de la carretera: "
            infoCoche.appendChild(tituloCoche)
            const textoCoche = document.createTextNode(dataArray[i][4]);
            infoCoche.appendChild(textoCoche)
            
        })
    }

}