export default {
    props: ["korisnik", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKorisnik: this.korisnik ? this.korisnik : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     korisnikZaIzmenu: {
    //         get : function(){
    //             return {...this.korisnik};
    //         },
    //         set: function(novi){
    //             this.noviKorisnik = {...novi};
    //         }
    //     }
    // },

    watch: {
        korisnik: function(newValue, oldValue){
            this.noviKorisnik = {...this.korisnik};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKorisnik})">
<p>-{{naslov}}</p>
<div>
    <label>Oznaka: </label>
    <input type="text" v-model="noviKorisnik.oznaka" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviKorisnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviKorisnik.prezime" required></div>
<div>
    <label>Broj telefona: </label>
    <input type="text" v-model="noviKorisnik.br_telefona" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}