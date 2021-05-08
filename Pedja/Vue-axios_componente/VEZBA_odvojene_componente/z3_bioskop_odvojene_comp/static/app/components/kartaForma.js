export default {
    props: ["karta", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKarta: this.karta ? this.karta : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     kartaZaIzmenu: {
    //         get : function(){
    //             return {...this.karta};
    //         },
    //         set: function(novi){
    //             this.novaKarta = {...novi};
    //         }
    //     }
    // },

    watch: {
        karta: function(newValue, oldValue){
            this.novaKarta = {...this.karta};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKarta})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID: </label>
    <input type="text" v-model="novaKarta.id" required></div>
<div>
    <label>Naziv projekcije: </label>
    <input type="text" v-model="novaKarta.naziv_projekcije" required></div>
<div>
    <label>Pocetak: </label>
    <input type="datetime-local" v-model="novaKarta.pocetak" required></div>
<div>
    <label>Kraj: </label>
    <input type="datetime-local" v-model="novaKarta.kraj" required></div>
<div>
    <label>br_sedista: </label>
    <input type="number" v-model="novaKarta.br_sedista" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}