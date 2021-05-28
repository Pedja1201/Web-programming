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
<p><b>-{{naslov}}</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviKorisnik.ime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="noviKorisnik.email" required></div>
<div>
    <label>Lozinka: </label> 
    <input type="password" v-model="noviKorisnik.lozinka" maxlength="20" required></div>
<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}
