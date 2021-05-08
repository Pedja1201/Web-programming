export default {
    props: ["iznajmiti", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaIznajmljivanja: this.iznajmiti ? this.iznajmiti : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     iznajmljivanjeZaIzmenu: {
    //         get : function(){
    //             return {...this.iznajmiti};
    //         },
    //         set: function(novi){
    //             this.novaIznajmljivanja = {...novi};
    //         }
    //     }
    // },

    watch: {
        iznajmiti: function(newValue, oldValue){
            this.novaIznajmljivanja = {...this.iznajmiti};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaIznajmljivanja})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID-Kupac: </label>
    <input type="number" v-model="novaIznajmljivanja.IDKupac" required></div>
<div>
    <label>ID-Knjiga: </label>
    <input type="number" v-model="novaIznajmljivanja.IDKnjiga" required></div>
<div>
    <label>Kolicina: </label> 
    <input type="number" v-model="novaIznajmljivanja.kolicina" required></div>
<div>
    <label>Nacin placanja: </label> 
    <input type="text" v-model="novaIznajmljivanja.nacinPlacanja" required></div>
<div>
    <label>Valuta: </label> 
    <input type="text" v-model="novaIznajmljivanja.valuta" required></div>
<div>
    <label>Period iznajmljivanja: </label> 
    <input type="text" v-model="novaIznajmljivanja.periodIznajmljivanja" required></div>
<div>
    <label>Datum porudzbine: </label> 
    <input type="date" v-model="novaIznajmljivanja.datumPorudzbine" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}