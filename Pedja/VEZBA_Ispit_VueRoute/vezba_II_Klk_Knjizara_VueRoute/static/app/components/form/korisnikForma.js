export default {
    props: ["korisnik", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKorisnik: this.korisnik ? this.korisnik : {}
        }
    },


    watch: {
        korisnik: function(newValue, oldValue){
            this.noviKorisnik = {...this.korisnik};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKorisnik})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Korisnicko ime: </label>
    <input type="username" v-model="noviKorisnik.korisnicko_ime" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviKorisnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviKorisnik.prezime" required></div>
<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}