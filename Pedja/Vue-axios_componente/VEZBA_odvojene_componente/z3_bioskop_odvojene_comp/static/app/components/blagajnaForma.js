export default {
    props: ["blagajna", "dugme", "naslov", "bioskop"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaBlagajna: this.blagajna ? this.blagajna : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     blagajnaZaIzmenu: {
    //         get : function(){
    //             return {...this.blagajna};
    //         },
    //         set: function(novi){
    //             this.novaBlagajna = {...novi};
    //         }
    //     }
    // },

    watch: {
        blagajna: function(newValue, oldValue){
            this.novaBlagajna = {...this.blagajna};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaBlagajna})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Cena: </label>
    <input type="text" v-model="novaBlagajna.cena" required></div>
<div>
    <label>Karta ID: </label>
    <select v-model="novaBlagajna.karta_id" required>
        <option v-for="karta in bioskop" :value="karta.id">{{karta.naziv_projekcije}},{{karta.pocetak}}-{{karta.kraj}},{{karta.br_sedista}}</option>
    </select>
</div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}