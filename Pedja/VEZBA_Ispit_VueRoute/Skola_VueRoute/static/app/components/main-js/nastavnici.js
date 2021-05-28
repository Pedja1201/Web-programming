export default {
    template:`
<div>
    <nastavnik-form v-bind:naslov="'Dodaj nastavnika'" v-on:sacuvaj="createNastavnik" v-bind:dugme="'Dodaj'"></nastavnik-form>

    <tabela-nastavnika v-bind:naslov="'Tabela nastavnika'" v-bind:nastavnici="nastavnici" v-on:uklanjanje="removeNastavnik" v-on:izmena="setNastavnikZaIzmenu"></tabela-nastavnika>
</div>
    `,
    data(){
        return {
            nastavnici:[],
        
            nastavnikZaIzmenu:{},
           
        }
    },
    methods:{
        setNastavnikZaIzmenu(nastavnik){ //skladistenje nakon izmene//
            this.$router.push(`/${nastavnik.licni_id}`);
        },


        refreshNastavnik(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/nastavnici").then((response) => {
                this.nastavnici = response.data;
            });
        },
        
        //dodavanje//
        createNastavnik(nastavnik){
            axios.post("api/nastavnici", nastavnik).then((response) => {
                this.refreshNastavnik();
            });
        },

        //izmena//
        updateNastavnik(nastavnik){
            axios.put(`api/nastavnici/${nastavnik.licni_id}`, nastavnik).then((response) => {
                this.refreshNastavnik();
            });
        },

        //brisanje//
        removeNastavnik(licni_id){
            axios.delete(`api/nastavnici/${licni_id}`).then((response) => {
                this.refreshNastavnik();
            });
        },
    },
    created(){
        this.refreshNastavnik();
    }
}