export default {
    template:`
<div class="w-50 p-3">
    <knjiga-form v-on:sacuvaj="createKnjiga" v-bind:biblioteke="biblioteke" v-bind:naslov="'Dodaj knjigu'" v-bind:dugme="'Dodaj'"></knjiga-form>
</div>
<div class="w-75 p-3">
    <tabela-knjiga v-bind:naslov="'Tabela knjiga'" v-bind:knjige="knjige" v-on:uklanjanje="removeKnjiga" v-on:izmena="setKnjigaZaIzmenu"></tabela-knjiga>
</div>
    `,
    data(){
        return {
            knjige:[],
            biblioteke:[], ///Select opcija
            knjigaZaIzmenu:{},
          
        }
    },
    methods:{
        setKnjigaZaIzmenu(knjiga){ //skladistenje nakon izmene//
            this.$router.push(`/knjige/${knjiga.IDKnjiga}`);
        },

        refreshKnjiga(){
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
            ///select opcija
            axios.get("api/biblioteke").then((response) => {
                this.biblioteke = response.data;
            });
        },

        //dodavanje//
        createKnjiga(knjiga){
            axios.post("api/knjige", knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },

        //izmena//
        updateKnjiga(knjiga){
            axios.put(`api/knjige/${knjiga.IDKnjiga}`, knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },

        //brisanje//
        removeKnjiga(IDKnjiga){
            axios.delete(`api/knjige/${IDKnjiga}`).then((response) => {
                this.refreshKnjiga();
            });
        },

    },
    created(){
        this.refreshKnjiga();
    }
}