export default {
    data(){
        return {
            korisnici:[],
            igre:[],
            korpe:[],
            korisnikZaIzmenu:{},
            igraZaIzmenu:{},
            korpaZaIzmenu:{},
         
            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.korisnikZaIzmenu = {...korisnik};
        },
        setIgraZaIzmenu(igra){ 
            this.igraZaIzmenu = {...igra};
        },
        setKorpaZaIzmenu(korpa){ 
            this.korpaZaIzmenu = {...korpa};
        },

        refreshKorisnik(){
             //saljem this van funkcije da obuhvati sve//
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshIgra(){
            axios.get("api/videoIgre").then((response) => {
               this.igre = response.data;
            });
        },
        refreshKorpa(){
            axios.get("api/korpa").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_kupovine = new Date(d.datum_kupovine).toISOString().split("Z")[0];
            

                }
                this.korpe = response.data;
            });
            //select
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
            axios.get("api/videoIgre").then((response) => {
                this.igre = response.data;
             });

         },
        
        //dodavanje//
        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        createIgra(igra){
            axios.post("api/videoIgre", igra).then((response) => {
                this.refreshIgra();
            });
        },
        createKorpa(korpa){
            axios.post("api/korpa", korpa).then((response) => {
                this.refreshKorpa();
            });
        },
        

        //izmena//
        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.id}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        updateIgra(igra){
            axios.put(`api/videoIgre/${igra.id}`, igra).then((response) => {
                this.refreshIgra();
            });
        },
        updateKorpa(korpa){
            axios.put(`api/korpa/${korpa.id}`, korpa).then((response) => {
                this.refreshKorpa();
            });
        },

        //brisanje//
        removeKorisnik(id){
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshKorisnik();
            });
        },
        removeIgra(id){
            axios.delete(`api/videoIgre/${id}`).then((response) => {
                this.refreshIgra();
            });
        },
        removeKorpa(id){
            axios.delete(`api/korpa/${id}`).then((response) => {
                this.refreshKorpa();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKorisnik();
        this.refreshIgra();
        this.refreshKorpa();
    }
}