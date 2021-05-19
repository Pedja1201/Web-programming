export default {
    data(){
        return {
            bioskop:[],
            blagajne:[],
            kartaZaIzmenu:{},
            blagajnaZaIzmenu:{},

            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setKartaZaIzmenu(karta){ //skladistenje nakon izmene//
            this.kartaZaIzmenu = {...karta};
        },
        setBlagajnaZaIzmenu(blagajna){ //skladistenje nakon izmene//
            this.blagajnaZaIzmenu = {...blagajna};
        },

        refreshKarta(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/karte").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.pocetak = new Date(d.pocetak).toISOString().split("Z")[0];
                    d.kraj = new Date(d.kraj).toISOString().split("Z")[0];
                }
                this.bioskop = response.data;
            });
        },
        refreshBlagajna(){
            //saljem this van funkcije da obuhvata sve//
           axios.get("api/blagajna").then((response) => {
               this.blagajne = response.data;
           });
           ///Select opcija-novo!
           axios.get("api/karte").then((response) => {
            this.bioskop = response.data;
            });
        },
        //dodavanje//
        createKarta(karta){
            axios.post("api/karte", karta).then((response) => {
                this.refreshKarta();
            });
        },
        createBlagajna(blagajna){
            axios.post("api/blagajna", blagajna).then((response) => {
                this.refreshBlagajna();
            });
        },
        //izmena//
        updateKarta(karta){
            axios.put(`api/karte/${karta.id}`, karta).then((response) => {
                this.refreshKarta();
            });
        },
        updateBlagajna(blagajna){
            axios.put(`api/blagajna/${blagajna.id}`, blagajna).then((response) => {
                this.refreshBlagajna();
            });
        },
        //brisanje//
        removeKarta(id){
            axios.delete(`api/karte/${id}`).then((response) => {
                this.refreshKarta();
            });
        },
        removeBlagajna(id){
            axios.delete(`api/blagajna/${id}`).then((response) => {
                this.refreshBlagajna();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKarta();
        this.refreshBlagajna();
    }
}