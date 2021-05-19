export default {
    props: ["prijava", "dugme", "naslov", "korisnici"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaPrijava: this.prijava ? this.prijava : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     prijavaZaIzmenu: {
    //         get : function(){
    //             return {...this.prijava};
    //         },
    //         set: function(novi){
    //             this.noviKornovaPrijavaisnik = {...novi};
    //         }
    //     }
    // },

    watch: {
        prijava: function(newValue, oldValue){
            this.novaPrijava = {...this.prijava};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaPrijava})">
<p><b>-{{naslov}}</b></p>
<div class="form-group">
    <label>Korisnik: </label>
    <select v-model="novaPrijava.korisnik_oznaka" required>
        <option v-for="korisnik in korisnici" :value="korisnik.oznaka">{{korisnik.ime}}, {{korisnik.prezime}}/{{korisnik.br_telefona}}</option>
    </select>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}