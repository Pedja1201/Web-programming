export default {
    data(){
        return {
            radnici:[],
            radnaMesta:[],
            angazovanja:[],
            radnikZaIzmenu:{},  
            mestoZaIzmenu:{}, 
            angazovanjeZaIzmenu:{},

            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setRadnikZaIzmenu(radnik){ //skladistenje nakon izmene//
            this.radnikZaIzmenu = {...radnik};
        },
        setMestoZaIzmenu(mesto){ //skladistenje nakon izmene//
            this.mestoZaIzmenu = {...mesto};
        },
        setAngazovanjeZaIzmenu(angaz){ //skladistenje nakon izmene//
            this.angazovanjeZaIzmenu = {...angaz};
        },
        
        refreshRadnik(){
             //saljem this van funkcije da obuhvati sve//
            axios.get("api/radnici").then((response) => {
                this.radnici = response.data;
            });
        },
        refreshRadnoMesto(){
            axios.get("api/radnaMesta").then((response) => {
               this.radnaMesta = response.data;
            });
        },
        refreshAngazovanje(){
            axios.get("api/angazovanja").then((response) => {
                this.angazovanja = response.data;
            });
            ///Seleect opcija-dodato
            axios.get("api/radnici").then((response) => {
                this.radnici = response.data;
            });
            axios.get("api/radnaMesta").then((response) => {
                this.radnaMesta = response.data;
             });
        },

        //dodavanje//
        createRadnik(radnik){
            axios.post("api/radnici", radnik).then((response) => {
                this.refreshRadnik();
            });
        },
        createRadnoMesto(mesto){
            axios.post("api/radnaMesta", mesto).then((response) => {
                this.refreshRadnoMesto();
            });
        },
        createAngazovanje(angaz){
            axios.post("api/angazovanja", angaz).then((response) => {
                this.refreshAngazovanje();
            });
        },

        //izmena//
        updateRadnik(radnik){
            axios.put(`api/radnici/${radnik.id}`, radnik).then((response) => {
                this.refreshRadnik();
            });
        },
        updateRadnoMesto(mesto){
            axios.put(`api/radnaMesta/${mesto.id}`, mesto).then((response) => {
                this.refreshRadnoMesto();
            });
        },
        updateAngazovanje(angaz){
            axios.put(`api/angazovanja/${angaz.id}`, angaz).then((response) => {
                this.refreshAngazovanje();
            });
        },
    
        //brisanje//
        removeRadnik(id){
            axios.delete(`api/radnici/${id}`).then((response) => {
                this.refreshRadnik();
            });
        },
        removeRadnoMesto(id){
            axios.delete(`api/radnaMesta/${id}`).then((response) => {
                this.refreshRadnoMesto();
            });
        },
        removeAngazovanje(id){
            axios.delete(`api/angazovanja/${id}`).then((response) => {
                this.refreshAngazovanje();
            });
        },       

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshRadnik();
        this.refreshRadnoMesto();
        this.refreshAngazovanje();
    }
}