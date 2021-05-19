export default {
    data(){
        return {
            automobili:[],
            osiguravajuceKuce:[],
            polise:[],
            autoZaIzmenu:{},
            kucaZaIzmenu:{},
            polisaZaIzmenu:{},
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setAutoZaIzmenu(auto){ //skladistenje nakon izmene//
            this.autoZaIzmenu = {...auto};
        },
        setKucaZaIzmenu(auto){ //skladistenje nakon izmene//
            this.kucaZaIzmenu = {...auto};
        },
        setPolisaZaIzmenu(polisa){ //skladistenje nakon izmene//
            this.polisaZaIzmenu = {...polisa};
        },
        

        refreshAutomobil(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/automobili").then((response) => {
                this.automobili = response.data;
            });
        },
        refreshOsiguravajucaKuca(){
            axios.get("api/osiguravajuceKuce").then((response) => {
               this.osiguravajuceKuce = response.data;
            });
        },
        refreshPolisa(){
            axios.get("api/polise").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_pocetka = new Date(d.datum_pocetka).toISOString().split("Z")[0];
                    d.datum_kraja = new Date(d.datum_kraja).toISOString().split("Z")[0];
                }
                this.polise = response.data;
            });
            //Select opcija-novoo
            axios.get("api/automobili").then((response) => {
                this.automobili = response.data;
            });
            axios.get("api/osiguravajuceKuce").then((response) => {
                this.osiguravajuceKuce = response.data;
             });
        },
        
        //dodavanje//
        createAutomobil(auto){
            axios.post("api/automobili", auto).then((response) => {
                this.refreshAutomobil();
            });
        },
        createOsiguravajucaKuca(kuca){
            axios.post("api/osiguravajuceKuce", kuca).then((response) => {
                this.refreshOsiguravajucaKuca();
            });
        },
        createPolisa(polisa){
            axios.post("api/polise", polisa).then((response) => {
                this.refreshPolisa();
            });
        },
        
        //izmena//
        updateAutomobil(auto){
            axios.put(`api/automobili/${auto.id}`, auto).then((response) => {
                this.refreshAutomobil();
            });
        },
        updateOsiguravajucaKuca(kuca){
            axios.put(`api/osiguravajuceKuce/${kuca.id}`, kuca).then((response) => {
                this.refreshOsiguravajucaKuca();
            });
        },
        updatePolisa(polisa){
            axios.put(`api/polise/${polisa.id}`, polisa).then((response) => {
                this.refreshPolisa();
            });
        },
        
        //brisanje//
        removeAutomobil(id){
            axios.delete(`api/automobili/${id}`).then((response) => {
                this.refreshAutomobil();
            });
        },
        removeOsiguravajucaKuca(id){
            axios.delete(`api/osiguravajuceKuce/${id}`).then((response) => {
                this.refreshOsiguravajucaKuca();
            });
        },
        removePolisa(id){
            axios.delete(`api/polise/${id}`).then((response) => {
                this.refreshPolisa();
            });
        },
        

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshAutomobil();
        this.refreshOsiguravajucaKuca();
        this.refreshPolisa();
    }
}
