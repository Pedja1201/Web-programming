export default {
    data(){
        return {
            nastavnici:[],
            predmeti:[],
            skole:[],
            nastavnikZaIzmenu:{},
            predmetZaIzmenu:{},
            skolaZaIzmenu:{},
            stranicaZaPrikaz: ""
        }
    },
    methods:{
        setNastavnikZaIzmenu(nastavnik){ //skladistenje nakon izmene//
            this.nastavnikZaIzmenu = {...nastavnik};
        },
        setPredmetZaIzmenu(predmet){ //skladistenje nakon izmene//
            this.predmetZaIzmenu = {...predmet};
        },
        setSkolaZaIzmenu(skola){ //skladistenje nakon izmene//
            this.skolaZaIzmenu = {...skola};
        },

        refreshNastavnik(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/nastavnici").then((response) => {
                this.nastavnici = response.data;
            });
        },
        refreshPredmet(){
           axios.get("api/predmeti").then((response) => {
               this.predmeti = response.data;
           });
       },
       refreshSkola(){
            axios.get("api/skole").then((response) => {
                this.skole = response.data;
            });
            //select opcija-novo
            axios.get("api/nastavnici").then((response) => {
                this.nastavnici = response.data;
            });
            axios.get("api/predmeti").then((response) => {
                this.predmeti = response.data;
            });
        },
        
        //dodavanje//
        createNastavnik(nastavnik){
            axios.post("api/nastavnici", nastavnik).then((response) => {
                this.refreshNastavnik();
            });
        },
        createPredmet(predmet){
            axios.post("api/predmeti", predmet).then((response) => {
                this.refreshPredmet();
            });
        },
        createSkola(skola){
            axios.post("api/skole", skola).then((response) => {
                this.refreshSkola();
            });
        },
        //izmena//
        updateNastavnik(nastavnik){
            axios.put(`api/nastavnici/${nastavnik.licni_id}`, nastavnik).then((response) => {
                this.refreshNastavnik();
            });
        },
        updatePredmet(predmet){
            axios.put(`api/predmeti/${predmet.id}`, predmet).then((response) => {
                this.refreshPredmet();
            });
        },
        updateSkola(skola){
            axios.put(`api/skole/${skola.id}`, skola).then((response) => {
                this.refreshSkola();
            });
        },

        //brisanje//
        removeNastavnik(licni_id){
            axios.delete(`api/nastavnici/${licni_id}`).then((response) => {
                this.refreshNastavnik();
            });
        },
        removePredmet(id){
            axios.delete(`api/predmeti/${id}`).then((response) => {
                this.refreshPredmet();
            });
        },
        removeSkola(id){
            axios.delete(`api/skole/${id}`).then((response) => {
                this.refreshSkola();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshNastavnik();
        this.refreshPredmet();
        this.refreshSkola();
    }
}