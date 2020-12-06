const Proceso = require('./proceso.js')

let Procesador = (function(){
    let inicio = null;
    var noTarea = 1;
    var cVacios = 0;
    var cTotales = 0;
    var pCompletados = 0;
    var pPendientes = 0;

    const start = () =>{
        for(let cycle = 0; cycle <= 300; cycle++){
            if((Math.ceil(Math.random() * 100)) <= 39){
                let newProcess = new Proceso(noTarea);
                add(newProcess);
                noTarea++
                pPendientes++;
            }
            if(inicio != null){
                if(inicio.reqProcess == 0){
                    delProcess(inicio);
                    pCompletados++;
                    pPendientes--;
                    cTotales += inicio.reqProcess
                }
                inicio.reqProcess--;
                inicio = inicio.siguiente;
            }
            if(inicio == null){
                cVacios++
            }
            showStatus();
        }
    }

    const add = (process) => {
        if(inicio == null){
            inicio = process;
            inicio.siguiente = inicio;
            inicio.anterior = inicio;
        } else {
            let aux = inicio;
            while(aux.siguiente != inicio){
                aux=aux.siguiente;
            }
            aux.siguiente = process;
            aux.siguiente.anterior = aux;
            aux.siguiente.siguiente = inicio;
            inicio.anterior = process;
        }
        return process;
    }

    const search = (process) => {
        let aux = inicio;
        if(aux != null){
            while(aux != process && aux.siguiente != inicio){
                aux = aux.siguiente;
            }
            if (aux == process){
                return aux;
            } else {
                return console.error('Error', 'buscar');
            }
        }
    }

    const delProcess = (process) => {
        if(process == inicio && inicio.anterior == inicio && inicio.siguiente == inicio){
            inicio = null;
        } else if (inicio == process){
            inicio.siguiente.anterior = inicio.anterior;
            inicio.anterior.siguiente = inicio.siguiente;
            inicio = inicio.siguiente;
        } else {
            let aux = inicio;
            while (aux.siguiente != process && aux.siguiente != inicio){
                aux = aux.siguiente
            }
            if(aux.siguiente == process){
                aux.siguiente = aux.siguiente.siguiente;
                aux.siguiente.anterior = aux;
            } else {
                return console.error('Error', 'eliminar')
            }
        }
    }

    const showStatus = () => {
        console.log(`Ciclos vacios: ${cVacios}\nCiclos pendientes: ${cTotales-pCompletados}\nProcesos realizados: ${pCompletados}\nProcesos pendientes: ${pPendientes}\n`);
    }

    return {
        iniciar: start,
        mostrar: showStatus
    }


})
module.exports = Procesador;
