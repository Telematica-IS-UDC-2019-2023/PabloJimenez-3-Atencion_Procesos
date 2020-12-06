const Proceso = (function (idAssigned){
    this.id = idAssigned;
    this.siguiente = null;
    this.anterior = null;
    this.reqProcess = Number(Math.floor(Math.random() * (14 - 4 +1)) +4);
});
module.exports = Proceso;