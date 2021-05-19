export default {
    props: ["kupac", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKupac: this.kupac ? this.kupac : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     kupacZaIzmenu: {
    //         get : function(){
    //             return {...this.kupac};
    //         },
    //         set: function(novi){
    //             this.noviKupac = {...novi};
    //         }
    //     }
    // },

    watch: {
        kupac: function(newValue, oldValue){
            this.noviKupac = {...this.kupac};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKupac})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviKupac.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviKupac.prezime" required></div>
<div>
    <label>Datum rodjenja: </label> 
    <input type="datetime-local" v-model="noviKupac.datumRodjenja" required></div>
<div>
    <label>E-mail: </label> 
    <input type="email" v-model="noviKupac.email" required></div>
<div>
    <label>Telefon: </label> 
    <input type="text" v-model="noviKupac.telefon" required></div>
<div>
    <label>Mesto: </label> 
    <input type="text" v-model="noviKupac.mesto" required></div>
<div>
    <label>Adresa: </label> 
    <input type="text" v-model="noviKupac.adresa" required></div>
<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}