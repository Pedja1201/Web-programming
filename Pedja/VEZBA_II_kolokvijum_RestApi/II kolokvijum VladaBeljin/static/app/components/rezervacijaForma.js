export default {
    props: ["rezervacija", "dugme", "korisnici", "hoteli"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaRezervacija: this.rezervacija ? this.rezervacija : {},
        }
    },

    watch: {
        rezervacija: function(newValue, oldValue){
            this.novaRezervacija = {...this.rezervacija};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaRezervacija})">
<div>
    <label>Korisnik ID: </label>
    <select v-model="novaRezervacija.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">{{korisnik.korisnicko_ime}}, {{korisnik.ime}},{{korisnik.prezime}}</option>
    </select>
</div>

<div>
    <label>Hotel ID: </label>
    <select v-model="novaRezervacija.hotel_id" required>
        <option v-for="hotel in hoteli" :value="hotel.id">{{hotel.naziv}}, {{hotel.adresa}}</option>
    </select>
</div>

<div>
    <label>Datum rezervacije: </label>
    <input type="datetime-local" v-model="novaRezervacija.datum_rezervacije" required></div>
<div>
    <label>Rok: </label>
    <input type="datetime-local" v-model="novaRezervacija.rok" required></div>
<div>
    <label>Datum odlaska: </label>
    <input type="datetime-local" v-model="novaRezervacija.datum_odlaska" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="novaRezervacija.cena" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}