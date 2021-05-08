export default {
    props: ["korisnik", "dugme", "naslov"],
    emits: ["sacuvaj"],
    data(){
        return{
            noviKorisnik: this.korisnik ? this.korisnik : {}
        }
    },
    watch: {
        korisnik : function(newValue, oldValue){
            this.noviKorisnik = {...this.korisnik}
        }
    },
    template: `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKorisnik})">
<p><b>-{{naslov}}</b></p>

<div>
    <label>Ime:</label>
    <input type="text" v-model="noviKorisnik.ime" required>
</div>
<div>
    <label>Prezime:</label>
    <input type="text" v-model="noviKorisnik.prezime" required>
</div>
<div>
    <label>Zanimanje:</label>
    <input type="text" v-model="noviKorisnik.zanimanje" required>
</div>
<div>
    <label>ID-Nike:</label>
    <input type="number" v-model="noviKorisnik.nike_id" required>
</div>
<div>
    <label>Auto-tablice:</label>
    <input type="text" v-model="noviKorisnik.auto_tablice" required>
</div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `
}