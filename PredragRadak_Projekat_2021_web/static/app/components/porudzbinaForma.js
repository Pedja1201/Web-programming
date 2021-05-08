export default {
    props: ["poruceno", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaPorudzbina: this.poruceno ? this.poruceno : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     porudzbinaZaIzmenu: {
    //         get : function(){
    //             return {...this.poruceno};
    //         },
    //         set: function(novi){
    //             this.novaPorudzbina = {...novi};
    //         }
    //     }
    // },

    watch: {
        poruceno: function(newValue, oldValue){
            this.novaPorudzbina = {...this.poruceno};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaPorudzbina})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID-Knjiga: </label>
    <input type="number" v-model="novaPorudzbina.IDKnjiga" required></div>
<div>
    <label>ID-Kupac: </label>
    <input type="number" v-model="novaPorudzbina.IDKupac" required></div>
<div>
    <label>Kolicina: </label> 
    <input type="number" v-model="novaPorudzbina.kolicina" required></div>
<div>
    <label>Nacin placanja: </label> 
    <input type="text" v-model="novaPorudzbina.nacinPlacanja" required></div>
<div>
    <label>Valuta: </label> 
    <input type="text" v-model="novaPorudzbina.valuta" required></div>

<div>
    <label>Datum porudzbine: </label> 
    <input type="date" v-model="novaPorudzbina.datumPorudzbine" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}
