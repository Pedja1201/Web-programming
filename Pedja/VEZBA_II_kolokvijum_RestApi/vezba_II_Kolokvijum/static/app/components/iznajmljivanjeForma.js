export default {
    props: ["iznajmi", "dugme", "naslov", "korisnici", "knjige"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaIznajmljivanja: this.iznajmi ? this.iznajmi : {}
        }
    },


    watch: {
        iznajmi: function(newValue, oldValue){
            this.novaIznajmljivanja = {...this.iznajmi};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaIznajmljivanja})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Korisnik ID: </label>
    <select v-model="novaIznajmljivanja.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">{{korisnik.korisnicko_ime}},{{korisnik.ime}},{{korisnik.prezime}}</option>
    </select>
</div>
<div>
    <label>Knjiga ID: </label>
    <select v-model="novaIznajmljivanja.knjiga_id" required>
        <option v-for="knjiga in knjige" :value="knjiga.id">{{knjiga.naslov}},{{knjiga.autor}}</option>
    </select>
</div>

<div>
    <label>Datum iznajmljivanja: </label>
    <input type="datetime-local" v-model="novaIznajmljivanja.datum_iznajmljivanja" required></div>
<div>
    <label>Rok vracanja: </label>
    <input type="datetime-local" v-model="novaIznajmljivanja.rok_vracanja" required></div>
<div>
    <label>Datum vracanja: </label>
    <input type="datetime-local" v-model="novaIznajmljivanja.datum_vracanja" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="novaIznajmljivanja.cena" required></div>


<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}