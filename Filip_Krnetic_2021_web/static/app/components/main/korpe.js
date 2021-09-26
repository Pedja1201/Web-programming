export default {
    template:`
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <korpa-forma v-bind:igrice="igrice" v-bind:naslov="'Dodaj u korpu'"  v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKorpa"></korpa-forma>
</div>

<div class="w-75 p-3">
    <tabela-korpe v-bind:naslov="'Tabela korpe'" v-bind:korpe="korpe" v-on:uklanjanje="removeKorpa" v-on:izmena="setKorpaZaIzmenu"></tabela-korpe
</div>
<button v-on:click="navigate('dodaj')" type="button" class="btn btn-dark btn-lg btn-block m-3">Dodaj u korpu</button>


`,
    data(){
        return {
            korpe:[],
            igrice:[],
            rakijaZaIzmenu:{},
    
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setKorpaZaIzmenu(korpa){ //skladistenje nakon izmene//
            this.$router.push(`/korpe/${korpa.id}`);
        },


        refreshKorpa(){
            axios.get("api/korpe").then((response) => {
                this.korpe = response.data;
            });
            axios.get("api/igrice").then((response) => {
                this.igrice = response.data;
            });
            
        },
        
        //dodavanje//
        createKorpa(korpa){
            axios.post("api/korpe", korpa).then((response) => {
                this.refreshKorpa();
            });
        },
        
        //izmena//
        updateKorpa(korpa){
            axios.put(`api/korpe/${korpa.id}`, korpa).then((response) => {
                this.refreshKorpa();
            });
        },

        
        //brisanje//
        removeKorpa(id){
            axios.delete(`api/korpe/${id}`).then((response) => {
                this.refreshKorpa();
            });
        },
        


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKorpa();
    }
}
