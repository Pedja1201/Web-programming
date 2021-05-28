export default {
    template:`
<div>
    <porudzbina-form v-on:sacuvaj="createPorudzbina" v-bind:naslov="'Dodaj porudzbinu'" v-bind:dugme="'Dodaj'" v-bind:knjige="knjige" v-bind:kupci="kupci"></porudzbina-form>

    <tabela-porudzbine v-bind:naslov="'Tabela porudzbine'" v-bind:porudzbine="porudzbine" v-on:uklanjanje="removePorudzbina" v-on:izmena="setPorudzbinaZaIzmenu"></tabela-porudzbine>

</div>
    `,
    data(){
        return {
            porudzbine:[],
            knjige:[], ///select opcija
            kupci:[], ///select opcija

            porudzbinaZaIzmenu:{},
            
        }
    },
    methods:{
        setPorudzbinaZaIzmenu(poruceno){ //skladistenje nakon izmene//
            this.$router.push(`/porudzbine/${poruceno.IDPorudzbina}`);
        },


        refreshPorudzbina(){
            axios.get("api/porudzbine").then((response) => {
                this.porudzbine = response.data;
            });
            ///Select opcija-novo!
            axios.get("api/knjige").then((response) => {
                this.knjige = response.data;
            });
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },

        //dodavanje//
        createPorudzbina(poruceno){
            axios.post("api/porudzbine", poruceno).then((response) => {
                this.refreshPorudzbina();
            });
        },

        //izmena//
        updatePorudzbina(poruceno){
            axios.put(`api/porudzbine/${poruceno.IDPorudzbina}`, poruceno).then((response) => {
                this.refreshPorudzbina();
            });
        },

        //brisanje//
        removePorudzbina(IDPorudzbina){
            axios.delete(`api/porudzbine/${IDPorudzbina}`).then((response) => {
                this.refreshPorudzbina();
            });
        },

    },
    created(){
        this.refreshPorudzbina();
    }
}