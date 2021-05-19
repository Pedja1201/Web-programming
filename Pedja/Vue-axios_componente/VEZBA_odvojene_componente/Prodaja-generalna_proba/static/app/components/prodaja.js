export default {
    data(){
        return {
            turisti:[],
            aranzmani:[],
            prodaje:[],
            turistaZaIzmenu:{},
            aranzmanZaIzmenu:{},
            prodajaZaIzmenu:{},
          
            stranicaZaPrikaz:"turisti",
        }
    },
    methods:{
        setTuristaZaIzmenu(turista){ //skladistenje nakon izmene//
            this.turistaZaIzmenu = {...turista};
        },
        setAranzmanZaIzmenu(aranzman){ //skladistenje nakon izmene//
            this.aranzmanZaIzmenu = {...aranzman};
        },
        setProdajaZaIzmenu(prodaja){ //skladistenje nakon izmene//
            this.prodajaZaIzmenu = {...prodaja};
        },

        refreshTurista(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/turisti").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_rodjenja = new Date(d.datum_rodjenja).toISOString().split("Z")[0];
                }
                this.turisti = response.data;
            });
        },
        refreshAranzman(){
            axios.get("api/aranzmani").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_polaska = new Date(d.datum_polaska).toISOString().split("Z")[0];
                }
                this.aranzmani = response.data;
            });
        },
        refreshProdaja(){
            axios.get("api/prodaje").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_placanja = new Date(d.datum_placanja).toISOString().split("Z")[0];
                }
                this.prodaje = response.data;
            });
            ///Select opcija-novo
            axios.get("api/aranzmani").then((response) => {
                this.aranzmani = response.data;
             });
             axios.get("api/turisti").then((response) => {
                this.turisti = response.data;
            });
        },
       
        
        //dodavanje//
        createTurista(turista){
            axios.post("api/turisti", turista).then((response) => {
                this.refreshTurista();
            });
        },
        createAranzman(aranzman){
            axios.post("api/aranzmani", aranzman).then((response) => {
                this.refreshAranzman();
            });
        },
        createProdaja(prodaja){
            axios.post("api/prodaje", prodaja).then((response) => {
                this.refreshProdaja();
            });
        },
        
        //izmena//
        updateTurista(turista){
            axios.put(`api/turisti/${turista.id}`, turista).then((response) => {
                this.refreshTurista();
            });
        },
        updateAranzman(aranzman){
            axios.put(`api/aranzmani/${aranzman.id}`, aranzman).then((response) => {
                this.refreshAranzman();
            });
        },
        updateProdaja(prodaja){
            axios.put(`api/prodaje/${prodaja.id}`, prodaja).then((response) => {
                this.refreshProdaja();
            });
        },
        
        //brisanje//
        removeTurista(id){
            axios.delete(`api/turisti/${id}`).then((response) => {
                this.refreshTurista();
            });
        },
        removeAranzman(id){
            axios.delete(`api/aranzmani/${id}`).then((response) => {
                this.refreshAranzman();
            });
        },
        removeProdaja(id){
            axios.delete(`api/prodaje/${id}`).then((response) => {
                this.refreshProdaja();
            });
        },


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshTurista();
        this.refreshAranzman();
        this.refreshProdaja();
    }
}
