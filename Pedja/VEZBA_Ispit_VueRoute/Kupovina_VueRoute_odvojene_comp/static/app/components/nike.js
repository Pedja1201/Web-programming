export default {
    template:`
<div>
    <nike-form v-bind:naslov="'Dodaj nike'" v-on:sacuvaj="createNike" v-bind:dugme="'Dodaj'"></nike-form>

    <tabela-nike v-bind:nike-shop="nikeShop" v-on:uklanjanje="removeNike" v-on:izmena="setNikeZaIzmenu"></tabela-nike>

</div>
    `,
    data(){
        return {
            nikeShop:[],
            nikeZaIzmenu:{},
        }
    },
    methods:{
        setNikeZaIzmenu(nike){ //skladistenje nakon izmene//
            this.$router.push(`/nike/${nike.id}`);
        },

        refreshNike(){
            //saljem this van funkcije da obuhvata sve//
            axios.get("api/nike").then((response) => {
               this.nikeShop = response.data;
            });
        },

        //dodavanje//
        createNike(nike){
            axios.post("api/nike", nike).then((response) => {
                this.refreshNike();
            });
        },
        //izmena//
        updateNike(nike){
            axios.put(`api/nike/${nike.id}`, nike).then((response) => {
                this.refreshNike();
            });
        },
        //brisanje//
        removeNike(id){
            axios.delete(`api/nike/${id}`).then((response) => {
                this.refreshNike();
            });
        },
    
    },
    created(){
        this.refreshNike();
    }
}