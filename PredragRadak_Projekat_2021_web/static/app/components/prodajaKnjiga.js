export default {
    data(){
        return {
            korisnici:[],
            kupci:[],
            knjige:[],
            iznajmljivanje:[],
            porudzbine:[],
            korisnikZaIzmenu:{},
            kupacZaIzmenu:{},
            knjigaZaIzmenu:{},
            iznajmljivanjeZaIzmenu:{},
            porudzbinaZaIzmenu:{},
            
            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){ //skladistenje nakon izmene//
            this.korisnikZaIzmenu = {...korisnik};
        },
        setKupacZaIzmenu(kupac){ //skladistenje nakon izmene//
            this.kupacZaIzmenu = {...kupac};
        },
        setKnjigaZaIzmenu(knjiga){ //skladistenje nakon izmene//
            this.knjigaZaIzmenu = {...knjiga};
        },
        setIznajmljivanjeZaIzmenu(iznajmiti){ //skladistenje nakon izmene//
            this.iznajmljivanjeZaIzmenu = {...iznajmiti};
        },
        setPorudzbinaZaIzmenu(poruceno){ //skladistenje nakon izmene//
            this.porudzbinaZaIzmenu = {...poruceno};
        },

        refreshKorisnik(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshKupac(){
            axios.get("api/kupci").then((response) => {
               ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datumRodjenja = new Date(d.datumRodjenja).toISOString().split("Z")[0];
                }
                this.kupci = response.data;
            });
        },
        refreshKnjiga(){
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
        },
        refreshIznajmljivanje(){
            axios.get("api/iznajmljivanje").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datumPorudzbine = new Date(d.datumPorudzbine).toISOString().split("Z")[0];
                }
                this.iznajmljivanje = response.data;
            });
            ///Select opcija-novo!
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },
        refreshPorudzbina(){
            axios.get("api/porudzbine").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datumPorudzbine = new Date(d.datumPorudzbine).toISOString().split("Z")[0];
                }
                this.porudzbine = response.data;
            });
            ///Select opcija-novo!
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },

        //dodavanje//
        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        createKupac(kupac){
            axios.post("api/kupci", kupac).then((response) => {
                this.refreshKupac();
            });
        },
        createKnjiga(knjiga){
            axios.post("api/knjige", knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },
        createIznajmljivanje(iznajmiti){
            axios.post("api/iznajmljivanje", iznajmiti).then((response) => {
                this.refreshIznajmljivanje();
            });
        },
        createPorudzbina(poruceno){
            axios.post("api/porudzbine", poruceno).then((response) => {
                this.refreshPorudzbina();
            });
        },

        //izmena//
        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.IDKorisnik}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        updateKupac(kupac){
            axios.put(`api/kupci/${kupac.IDKupac}`, kupac).then((response) => {
                this.refreshKupac();
            });
        },
        updateKnjiga(knjiga){
            axios.put(`api/knjige/${knjiga.IDKnjiga}`, knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },
        updateIznajmljivanje(iznajmiti){
            axios.put(`api/iznajmljivanje/${iznajmiti.IDIznajmljivanje}`, iznajmiti).then((response) => {
                this.refreshIznajmljivanje();
            });
        },
        updatePorudzbina(poruceno){
            axios.put(`api/porudzbine/${poruceno.IDPorudzbina}`, poruceno).then((response) => {
                this.refreshPorudzbina();
            });
        },

        //brisanje//
        removeKorisnik(IDKorisnik){
            axios.delete(`api/korisnici/${IDKorisnik}`).then((response) => {
                this.refreshKorisnik();
            });
        },
        removeKupac(IDKupac){
            axios.delete(`api/kupci/${IDKupac}`).then((response) => {
                this.refreshKupac();
            });
        },
        removeKnjiga(IDKnjiga){
            axios.delete(`api/knjige/${IDKnjiga}`).then((response) => {
                this.refreshKnjiga();
            });
        },
        removeIznajmljivanje(IDIznajmljivanje){
            axios.delete(`api/iznajmljivanje/${IDIznajmljivanje}`).then((response) => {
                this.refreshIznajmljivanje();
            });
        },
        removePorudzbina(IDPorudzbina){
            axios.delete(`api/porudzbine/${IDPorudzbina}`).then((response) => {
                this.refreshPorudzbina();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }

    },
    created(){
        this.refreshKorisnik();
        this.refreshKupac();
        this.refreshKnjiga();
        this.refreshIznajmljivanje();
        this.refreshPorudzbina();
    }
}