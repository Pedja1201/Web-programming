export default {
    data(){
        return {
            korisnici:[],
            knjige:[],
            iznajmljivanja:[],
            korisnikZaIzmenu:{},
            knjigaZaIzmenu:{},
            iznajmljivanjeZaIzmenu:{},
         
            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.korisnikZaIzmenu = {...korisnik};
        },
        setKnjigaZaIzmenu(knjiga){ 
            this.knjigaZaIzmenu = {...knjiga};
        },
        setIznajmljivanjeZaIzmenu(iznajmi){ 
            this.iznajmljivanjeZaIzmenu = {...iznajmi};
        },

        refreshKorisnik(){
             //saljem this van funkcije da obuhvati sve//
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshKnjiga(){
            axios.get("api/knjige").then((response) => {
               this.knjige = response.data;
            });
        },
        refreshIznajmljivanje(){
            axios.get("api/iznajmljivanja").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_iznajmljivanja = new Date(d.datum_iznajmljivanja).toISOString().split("Z")[0];
                    d.rok_vracanja = new Date(d.rok_vracanja).toISOString().split("Z")[0];
                    d.datum_vracanja = new Date(d.datum_vracanja).toISOString().split("Z")[0];

                }
                this.iznajmljivanja = response.data;
            });
            //select
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
             });

         },
        
        //dodavanje//
        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        createKnjiga(knjiga){
            axios.post("api/knjige", knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },
        createIznajmljivanje(iznajmi){
            axios.post("api/iznajmljivanja", iznajmi).then((response) => {
                this.refreshIznajmljivanje();
            });
        },
        

        //izmena//
        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.id}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        updateKnjiga(knjiga){
            axios.put(`api/knjige/${knjiga.id}`, knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },
        updateIznajmljivanje(iznajmi){
            axios.put(`api/iznajmljivanja/${iznajmi.id}`, iznajmi).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

        //brisanje//
        removeKorisnik(id){
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshKorisnik();
            });
        },
        removeKnjiga(id){
            axios.delete(`api/knjige/${id}`).then((response) => {
                this.refreshKnjiga();
            });
        },
        removeIznajmljivanje(id){
            axios.delete(`api/iznajmljivanja/${id}`).then((response) => {
                this.refreshIznajmljivanje();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKorisnik();
        this.refreshKnjiga();
        this.refreshIznajmljivanje();
    }
}