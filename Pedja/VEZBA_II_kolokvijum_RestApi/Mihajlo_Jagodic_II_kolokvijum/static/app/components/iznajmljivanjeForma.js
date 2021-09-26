export default {
    props: ["iznajmljivanje", "dugme", "naslov", "korisnici", "knjige"],
    emits : ["sacuvaj"],
    data(){
        return{
            novoIznajmljivanje: this.iznajmljivanje ? this.iznajmljivanje : {},
        }
    },

    watch: {
        iznajmljivanje: function(newValue, oldValue){
            this.novoIznajmljivanje = {...this.iznajmljivanje};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novoIznajmljivanje})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Korisnik ID: </label>
    <select v-model="novoIznajmljivanje.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">{{korisnik.korisnicko_ime}}, {{korisnik.ime}},{{korisnik.prezime}}</option>
    </select>
</div>

<div>
    <label>Knjiga ID: </label>
    <select v-model="novoIznajmljivanje.knjiga_id" required>
        <option v-for="knjiga in knjige" :value="knjiga.id">{{knjiga.naslov}}, {{knjiga.autor}}</option>
    </select>
</div>

<div>
    <label>Datum iznajmljivanja: </label>
    <input type="datetime-local" v-model="novoIznajmljivanje.datum_iznajmljivanja" required></div>
<div>
    <label>Roka vracanja: </label>
    <input type="datetime-local" v-model="novoIznajmljivanje.rok_vracanja" required></div>
<div>
    <label>Datum vracanja: </label>
    <input type="datetime-local" v-model="novoIznajmljivanje.datum_vracanja" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="novoIznajmljivanje.cena" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}