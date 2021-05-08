export default {
    props: ["blagajna", "dugme", "naslov"],
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
    <label>ID-karta: </label>
    <input type="text" v-model="novaBlagajna.karta_id" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}