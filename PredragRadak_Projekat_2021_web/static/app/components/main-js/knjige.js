export default {
    template:`
<div>
    <knjiga-form v-on:sacuvaj="createKnjiga" v-bind:naslov="'Dodaj knjigu'" v-bind:dugme="'Dodaj'"></knjiga-form>

    <tabela-knjiga v-bind:naslov="'Tabela knjiga'" v-bind:knjige="knjige" v-on:uklanjanje="removeKnjiga" v-on:izmena="setKnjigaZaIzmenu"></tabela-knjiga>
</div>
    `,
    data(){
        return {
            knjige:[],
          
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