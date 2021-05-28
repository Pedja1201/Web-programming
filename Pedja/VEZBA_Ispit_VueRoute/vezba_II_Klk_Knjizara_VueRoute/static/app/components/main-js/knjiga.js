export default {
    template:`
<div>
    <knjiga-forma v-bind:naslov="'Dodaj knjigu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKnjiga"></knjiga-forma>

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
        setKnjigaZaIzmenu(knjiga){ 
            this.$router.push(`/knjige/${knjiga.id}`);
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
            axios.put(`api/knjige/${knjiga.id}`, knjiga).then((response) => {
                this.refreshKnjiga();
            });
        },

        //brisanje//
        removeKnjiga(id){
            axios.delete(`api/knjige/${id}`).then((response) => {
                this.refreshKnjiga();
            });
        },

    },
    created(){
        this.refreshKnjiga();
    }
}