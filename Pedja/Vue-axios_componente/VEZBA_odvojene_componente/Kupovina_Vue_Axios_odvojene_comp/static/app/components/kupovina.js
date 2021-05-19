export default {
    data(){
        return {
            automobil:[],
            nikeShop:[],
            korisnici:[],
            autoZaIzmenu:{},
            nikeZaIzmenu:{},
            korisnikZaIzmenu:{},
        }
    },
    methods:{
        setAutoZaIzmenu(auto){ //skladistenje nakon izmene//
            this.autoZaIzmenu = {...auto};
        },
        setNikeZaIzmenu(nike){ //skladistenje nakon izmene//
            this.nikeZaIzmenu = {...nike};
        },
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.korisnikZaIzmenu = {...korisnik};
        },

        refreshAuto(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/auto").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.godiste = new Date(d.godiste).toISOString().split("Z")[0];
                }
                this.automobil = response.data;
            });
        },
        refreshNike(){
            //saljem this van funkcije da obuhvata sve//
            axios.get("api/nike").then((response) => {
               this.nikeShop = response.data;
            });
        },
        refreshKorisnik(){
            //saljem this van funkcije da obuhvata sve//
            axios.get("api/korisnici").then((response) => {
               this.korisnici = response.data;
            });
           ///Select opcija-novoo!!
            axios.get("api/nike").then((response) => {
                this.nikeShop = response.data;
            });
            axios.get("api/auto").then((response) => {
                this.automobil = response.data;
            });
        },

        //dodavanje//
        createAuto(auto){
            axios.post("api/auto", auto).then((response) => {
                this.refreshAuto();
            });
        },
        createNike(nike){
            axios.post("api/nike", nike).then((response) => {
                this.refreshNike();
            });
        },
        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        //izmena//
        updateAuto(auto){
            axios.put(`api/auto/${auto.tablice}`, auto).then((response) => {
                this.refreshAuto();
            });
        },
        updateNike(nike){
            axios.put(`api/nike/${nike.id}`, nike).then((response) => {
                this.refreshNike();
            });
        },
        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.id}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        //brisanje//
        removeAuto(tablice){
            axios.delete(`api/auto/${tablice}`).then((response) => {
                this.refreshAuto();
            });
        },
        removeNike(id){
            axios.delete(`api/nike/${id}`).then((response) => {
                this.refreshNike();
            });
        },
        removeKorisnik(id){
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshKorisnik();
            });
        }
    },
    created(){
        this.refreshAuto();
        this.refreshNike();
        this.refreshKorisnik();
    }
}