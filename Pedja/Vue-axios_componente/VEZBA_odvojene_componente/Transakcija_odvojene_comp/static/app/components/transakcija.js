export default {
    data(){
        return {
            artikli:[],
            transakcije:[],
            artiklZaIzmenu:{},   
            transakcijaZaIzmenu:{},

            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setArtiklZaIzmenu(artikl){ //skladistenje nakon izmene//
            this.artiklZaIzmenu = {...artikl};
        },
        setTransakcijaZaIzmenu(transakcija){ //skladistenje nakon izmene//
            this.transakcijaZaIzmenu = {...transakcija};
        },
        
        refreshArtikl(){
             //saljem this van funkcije da obuhvati sve//
            axios.get("api/artikli").then((response) => {
                this.artikli = response.data;
            });
        },
        refreshTransakcija(){
            axios.get("api/transakcije").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum = new Date(d.datum).toISOString().split("Z")[0];
                }
                this.transakcije = response.data;
            });
           //Selcet opcija iz forme -novo
            axios.get("api/artikli").then((response) => {
                this.artikli = response.data;
            });
        },
        

        //dodavanje//
        createArtikl(artikl){
            axios.post("api/artikli", artikl).then((response) => {
                this.refreshArtikl();
            });
        },
        createTransakcija(transakcija){
            axios.post("api/transakcije", transakcija).then((response) => {
                this.refreshTransakcija();
            });
        },

        //izmena//
        updateArtikl(artikl){
            axios.put(`api/artikli/${artikl.id}`, artikl).then((response) => {
                this.refreshArtikl();
            });
        },
        updateTransakcija(transakcija){
            axios.put(`api/transakcije/${transakcija.id}`, transakcija).then((response) => {
                this.refreshTransakcija();
            });
        },        

        //brisanje//
        removeArtikl(id){
            axios.delete(`api/artikli/${id}`).then((response) => {
                this.refreshArtikl();
            });
        }, 
        removeTransakcija(id){
            axios.delete(`api/transakcije/${id}`).then((response) => {
                this.refreshTransakcija();
            });
        },       

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshArtikl();
        this.refreshTransakcija();
    }
}