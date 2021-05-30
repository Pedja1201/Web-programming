export default {
  template:`
<div class="w-50 p-3">
    <biblioteka-form v-on:sacuvaj="createBiblioteka" v-bind:naslov="'Dodaj biblioteku'" v-bind:dugme="'Dodaj'"></biblioteka-form>
</div>
<div class="w-80 p-3">
    <tabela-biblioteke v-bind:naslov="'Tabela biblioteka'" v-bind:biblioteke="biblioteke" v-on:uklanjanje="removeBiblioteka" v-on:izmena="setBibliotekaZaIzmenu"></tabela-biblioteke>
</div>
  `,
  data(){
      return {
          biblioteke:[],

          bibliotekaZaIzmenu:{},
        
      }
    },
    methods:{
        setBibliotekaZaIzmenu(biblioteka){ //skladistenje nakon izmene//
            this.$router.push(`/biblioteke/${biblioteka.id}`);
        },

        refreshBiblioteka(){
           //saljem this van funkcije da obuhvata sve//
            axios.get("api/biblioteke").then((response) => {
                this.biblioteke = response.data;
            });
        },

        //dodavanje//
        createBiblioteka(biblioteka){
            axios.post("api/biblioteke", biblioteka).then((response) => {
                this.refreshBiblioteka();
            });
        },

        //izmena//
        updateBiblioteka(biblioteka){
            axios.put(`api/biblioteke/${biblioteka.id}`, biblioteka).then((response) => {
                this.refreshBiblioteka();
            });
        },

        //brisanje//
        removeBiblioteka(id){
            axios.delete(`api/biblioteke/${id}`).then((response) => {
                this.refreshBiblioteka();
            });
        },

    },
    created(){
        this.refreshBiblioteka();
    }
}