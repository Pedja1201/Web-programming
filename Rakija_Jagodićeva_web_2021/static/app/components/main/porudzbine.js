export default {
    template:`
    <button v-on:click="navigate('porudzbina')" type="button" class="btn btn-success btn-lg btn-block m-3">Dodavanje porudžbine</button>

    <div class="w-75 p-3" v-if="stranicaZaPrikaz=='porudzbina'">
        <porudzbina-forma v-bind:naslov="'Dodaj porudzbinu'" v-bind:dugme="'Dodaj'" v-bind:rakije="rakije" v-bind:kupci="kupci" v-on:sacuvaj="createPorudzbina"></porudzbina-forma>
    </div>
    <div class="w-75 p-3">
        <tabela-porudzbine v-bind:naslov="'Tabela porudzbine'" v-bind:porudzbine="porudzbine" v-on:uklanjanje="removePorudzbina" v-on:izmena="setPorudzbinaZaIzmenu"></tabela-porudzbine>
    </div>
`,
    data(){
        return {
            porudzbine:[],
            kupci:[],
            rakije:[],

            porudzbinaZaIzmenu:{},
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setPorudzbinaZaIzmenu(porudzbina){ //skladistenje nakon izmene//
            this.$router.push(`/porudzbine/${porudzbina.id}`);
        },

        refreshPorudzbina(){
            axios.get("api/porudzbine").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum = new Date(d.datum).toLocaleDateString().split("Z")[0];
                }
                this.porudzbine = response.data;
            });
            ///Select opcija-novo
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
             });
             axios.get("api/rakije").then((response) => {
                this.rakije = response.data;
            });
        },
       
        
        //dodavanje//
        createPorudzbina(porudzbina){
            axios.post("api/porudzbine", porudzbina).then((response) => {
                this.refreshPorudzbina();
            });
        },
        
        //izmena//
        updatePorudzbina(porudzbina){
            axios.put(`api/porudzbine/${porudzbine.id}`, porudzbina).then((response) => {
                this.refreshPorudzbina();
            });
        },
        
        //brisanje//
        removePorudzbina(id){
            axios.delete(`api/porudzbine/${id}`).then((response) => {
                this.refreshPorudzbina();
            });
        },


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshPorudzbina();
    }
}
