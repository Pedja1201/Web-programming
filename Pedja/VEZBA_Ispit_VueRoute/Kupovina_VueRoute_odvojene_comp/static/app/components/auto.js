export default {
    template:`
<div>
    <auto-form v-bind:naslov="'Dodaj auto'" v-on:sacuvaj="createAuto" v-bind:dugme="'Dodaj'"></auto-form>

    <tabela-auto v-bind:automobil="automobil" v-on:uklanjanje="removeAuto" v-on:izmena="setAutoZaIzmenu"></tabela-auto>

</div>
    `,
    data(){
        return {
            automobil:[],
            autoZaIzmenu:{},
        }
    },
    methods:{
        setAutoZaIzmenu(auto){ //skladistenje nakon izmene//
            this.$router.push(`/${auto.tablice}`);
        },

        refreshAuto(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/auto").then((response) => {
                this.automobil = response.data;
            });
        },

        //dodavanje//
        createAuto(auto){
            axios.post("api/auto", auto).then((response) => {
                this.refreshAuto();
            });
        },
        //izmena//
        updateAuto(auto){
            axios.put(`api/auto/${auto.tablice}`, auto).then((response) => {
                this.refreshAuto();
            });
        },
        //brisanje//
        removeAuto(tablice){
            axios.delete(`api/auto/${tablice}`).then((response) => {
                this.refreshAuto();
            });
        },

    },
    created(){
        this.refreshAuto();
    }
}