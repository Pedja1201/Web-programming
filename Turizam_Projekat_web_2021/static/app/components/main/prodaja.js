export default {
    template:`
    <button v-on:click="navigate('prodaja')" type="button" class="btn btn-outline-danger btn-lg btn-block m-3">Dodavanje rezervacije</button>

    <div class="w-75 p-3" v-if="stranicaZaPrikaz=='prodaja'">
        <prodaja-forma v-bind:naslov="'Dodaj prodaju'" v-bind:dugme="'Dodaj'" v-bind:aranzmani="aranzmani" v-bind:turisti="turisti" v-on:sacuvaj="createProdaja"></prodaja-forma>
    </div>
    <div class="w-75 p-3">
        <tabela-prodaje v-bind:naslov="'Tabela prodaje'" v-bind:prodaje="prodaje" v-on:uklanjanje="removeProdaja" v-on:izmena="setProdajaZaIzmenu"></tabela-prodaje>
    </div>
`,
    data(){
        return {
            turisti:[],
            aranzmani:[],
            prodaje:[],

            prodajaZaIzmenu:{},
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setProdajaZaIzmenu(prodaja){ //skladistenje nakon izmene//
            this.$router.push(`/prodaje/${prodaja.id}`);
        },

        refreshProdaja(){
            axios.get("api/prodaje").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_placanja = new Date(d.datum_placanja).toLocaleDateString().split("Z")[0];
                }
                this.prodaje = response.data;
            });
            ///Select opcija-novo
            axios.get("api/aranzmani").then((response) => {
                this.aranzmani = response.data;
             });
             axios.get("api/turisti").then((response) => {
                this.turisti = response.data;
            });
        },
       
        
        //dodavanje//
        createProdaja(prodaja){
            axios.post("api/prodaje", prodaja).then((response) => {
                this.refreshProdaja();
            });
        },
        
        //izmena//
        updateProdaja(prodaja){
            axios.put(`api/prodaje/${prodaja.id}`, prodaja).then((response) => {
                this.refreshProdaja();
            });
        },
        
        //brisanje//
        removeProdaja(id){
            axios.delete(`api/prodaje/${id}`).then((response) => {
                this.refreshProdaja();
            });
        },


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshProdaja();
    }
}
