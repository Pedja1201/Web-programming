export default {
    template:`
    <button v-on:click="navigate('igrice')" type="button" class="btn btn-success btn-lg btn-block m-3">Dodavanje porudžbine</button>

    <div class="w-75 p-3" v-if="stranicaZaPrikaz=='igrice'">
        <igrica-forma v-bind:naslov="'Dodaj igricu'" v-bind:dugme="'Dodaj'" v-bind:konzole="konzole" v-on:sacuvaj="createIgrica"></igrica-forma>
    </div>
    <div class="w-75 p-3">
        <tabela-igrice v-bind:naslov="'Tabela igrica'" v-bind:igrice="igrice" v-on:uklanjanje="removeIgrica" v-on:izmena="setIgricaZaIzmenu"></tabela-igrice>
    </div>
`,
    data(){
        return {
            igrice:[],
            konzole:[],

            igricaZaIzmenu:{},
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setIgricaZaIzmenu(igrica){ //skladistenje nakon izmene//
            this.$router.push(`/igrice/${igrica.id}`);
        },

        refreshIgrica(){
            axios.get("api/igrice").then((response) => {
                for(let d of response.data) {
                    d.datum = new Date(d.datum).toLocaleDateString().split("Z")[0];
                }
                this.igrice = response.data;
            });
            axios.get("api/konzole").then((response) => {
                this.konzole = response.data;
            });
        },
       
        
        //dodavanje//
        createIgrica(igrica){
            axios.post("api/igrice", igrica).then((response) => {
                this.refreshIgrica();
            });
        },
        
        //izmena//
        updateIgrica(igrica){
            axios.put(`api/igrice/${igrica.id}`, igrica).then((response) => {
                this.refreshIgrica();
            });
        },
        
        //brisanje//
        removeIgrica(id){
            axios.delete(`api/igrice/${id}`).then((response) => {
                this.refreshIgrica();
            });
        },


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshIgrica();
    }
}
