export default {
    data(){
        return {
            korisnici:[],
            prijavljen:[],
            korisnikZaIzmenu:{},
            prijavaZaIzmenu:{},
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.korisnikZaIzmenu = {...korisnik};
        },
        setPrijavaZaIzmenu(prijava){ //skladistenje nakon izmene//
            this.prijavaZaIzmenu = {...prijava};
        },

        refreshKorisnik(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshPrijava(){
            //saljem this van funkcije da obuhvata sve//
           axios.get("api/prijave").then((response) => {
               this.prijavljen = response.data;
           });
           ///Select opcija-novo
           axios.get("api/korisnici").then((response) => {
            this.korisnici = response.data;
        });
       },
        //dodavanje//
        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        createPrijava(prijava){
            axios.post("api/prijave", prijava).then((response) => {
                this.refreshPrijava();
            });
        },
        //izmena//
        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.oznaka}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        updatePrijava(prijava){
            axios.put(`api/prijave/${prijava.id}`, prijava).then((response) => {
                this.refreshPrijava();
            });
        },
        //brisanje//
        removeKorisnik(oznaka){
            axios.delete(`api/korisnici/${oznaka}`).then((response) => {
                this.refreshKorisnik();
            });
        },
        removePrijava(id){
            axios.delete(`api/prijave/${id}`).then((response) => {
                this.refreshPrijava();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKorisnik();
        this.refreshPrijava();
    }
}
