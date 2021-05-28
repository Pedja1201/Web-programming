export default {
    template:`
<div>
<radnik-form v-bind:naslov="'Dodaj radnika'" v-on:sacuvaj="createRadnik" v-bind:dugme="'Dodaj'"></radnik-form>

<tabela-radnika v-bind:naslov="'Tabela radnika'" v-bind:radnici="radnici" v-on:uklanjanje="removeRadnik" v-on:izmena="setRadnikZaIzmenu"></tabela-radnika>
</div>
    `,
    data(){
        return {
            radnici:[],
            radnikZaIzmenu:{},
        }
    },
    methods:{
        setRadnikZaIzmenu(radnik){ //skladistenje nakon izmene//
            this.$router.push(`/${radnik.id}`);

        },

        refreshRadnik(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/radnici").then((response) => {
                this.radnici = response.data;
            });
        },
        //dodavanje//
        createRadnik(radnik){
            axios.post("api/radnici", radnik).then((response) => {
                this.refreshRadnik();
            });
        },

        //izmena//
        updateRadnik(radnik){
            axios.put(`api/radnici/${radnik.id}`, radnik).then((response) => {
                this.refreshRadnik();
            });
        },

        //brisanje//
        removeRadnik(id){
            axios.delete(`api/radnici/${id}`).then((response) => {
                this.refreshRadnik();
            });
        },
    },
    created(){
        this.refreshRadnik();
    }
}