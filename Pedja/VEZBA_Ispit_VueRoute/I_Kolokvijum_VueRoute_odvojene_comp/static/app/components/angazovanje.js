export default {
    template:`
<div>
    <angazovanje-form v-bind:naslov="'Dodaj angazovanje'" v-bind:radnici="radnici" v-bind:radna-mesta="radnaMesta" v-on:sacuvaj="createAngazovanje" v-bind:dugme="'Dodaj'"></angazovanje-form>

    <tabela-angazovanja v-bind:naslov="'Tabela angazovanja'" v-bind:angazovanje="angazovanje" v-on:uklanjanje="removeAngazovanje" v-on:izmena="setAngazovanjeZaIzmenu"></tabela-angazovanja>
</div>
    `,
    data(){
        return {
            angazovanje:[],
            radnici:[],   ////Select opcija
            radnaMesta:[],  //Select opcija
            angazovanjeZaIzmenu:{},
        }
    },
    methods:{
        setAngazovanjeZaIzmenu(angaz){ //skladistenje nakon izmene//
            this.$router.push(`/angazovanja/${angaz.id}`);
        },

       refreshAngazovanje(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/angazovanja").then((response) => {
                this.angazovanje = response.data;
            });
            ///Select opcija-dodato novo!!!!
            axios.get("api/radnici").then((response) => {
                this.radnici = response.data;
            });
            axios.get("api/radnaMesta").then((response) => {
                this.radnaMesta = response.data;
            });
        },
        //dodavanje//
        createAngazovanje(angaz){
            axios.post("api/angazovanja", angaz).then((response) => {
                this.refreshAngazovanje();
            });
        },
        //izmena//
        updateAngazovanje(angaz){
            axios.put(`api/angazovanja/${angaz.id}`, angaz).then((response) => {
                this.refreshAngazovanje();
            });
        },

        //brisanje//
        removeAngazovanje(id){
            axios.delete(`api/angazovanja/${id}`).then((response) => {
                this.refreshAngazovanje();
            });
        },
    },

    created(){
        this.refreshAngazovanje();
    }
}