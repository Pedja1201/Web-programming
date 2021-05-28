export default {
    data(){
        return {
            kupci:[],
            proizvodi:[],
            kupovine:[],
            kupacZaIzmenu:{},
            proizvodZaIzmenu:{},
            kupovinaZaIzmenu:{},

            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setKupacZaIzmenu(kupac){ //skladistenje nakon izmene//
            this.kupacZaIzmenu = {...kupac};
        },
        setProizvodZaIzmenu(proizvod){ //skladistenje nakon izmene//
            this.proizvodZaIzmenu = {...proizvod};
        },
        setKupovinaZaIzmenu(kupovina){ //skladistenje nakon izmene//
            this.kupovinaZaIzmenu = {...kupovina};
        },

        refreshKupac(){
             //saljem this van funkcije da obuhvati sve//
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },
        refreshProizvod(){
            axios.get("api/proizvodi").then((response) => {
               this.proizvodi = response.data;
            });
        },
        refreshKupovina(){
            axios.get("api/kupovine").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum = new Date(d.datum).toISOString().split("Z")[0];
                }
                this.kupovine = response.data;
            });
            ///Select opcija
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
             });
        },
        
        //dodavanje//
        createKupac(kupac){
            axios.post("api/kupci", kupac).then((response) => {
                this.refreshKupac();
            });
        },
        createProizvod(proizvod){
            axios.post("api/proizvodi", proizvod).then((response) => {
                this.refreshProizvod();
            });
        },
        createKupovina(kupovina){
            axios.post("api/kupovine", kupovina).then((response) => {
                this.refreshKupovina();
            });
        },
        

        //izmena//
        updateKupac(kupac){
            axios.put(`api/kupci/${kupac.id}`, kupac).then((response) => {
                this.refreshKupac();
            });
        },
        updateProizvod(proizvod){
            axios.put(`api/proizvodi/${proizvod.id}`, proizvod).then((response) => {
                this.refreshProizvod();
            });
        },
        updateKupovina(kupovina){
            axios.put(`api/kupovine/${kupovina.broj}`, kupovina).then((response) => {
                this.refreshKupovina();
            });
        },
        

        //brisanje//
        removeKupac(id){
            axios.delete(`api/kupci/${id}`).then((response) => {
                this.refreshKupac();
            });
        },
        removeProizvod(id){
            axios.delete(`api/proizvodi/${id}`).then((response) => {
                this.refreshProizvod();
            });
        },
        removeKupovina(broj){
            axios.delete(`api/kupovine/${broj}`).then((response) => {
                this.refreshKupovina();
            });
        },

        ///Proba za search pretragu
        searchKupovina(){
            axios.get("api/kupovine").then((response) => {
               this.kupovine = response.data;
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKupac();
        this.refreshProizvod();
        this.refreshKupovina();
    }
}