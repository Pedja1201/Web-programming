export default {
    props: ["korpa", "dugme", "naslov", "korisnici", "igre"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKorpa: this.korpa ? this.korpa : {}
        }
    },


    watch: {
        korpa: function(newValue, oldValue){
            this.novaKorpa = {...this.korpa};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKorpa})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Korisnik ID: </label>
    <select v-model="novaKorpa.korisnik_id" required>
        <option v-for="korisnik in korisnici" :value="korisnik.id">{{korisnik.korisnicko_ime}},{{korisnik.ime}},{{korisnik.prezime}}</option>
    </select>
</div>
<div>
    <label>Video igra ID: </label>
    <select v-model="novaKorpa.video_igra_id" required>
        <option v-for="video_igra in igre" :value="video_igra.id">{{video_igra.naziv}},{{video_igra.zanr}}</option>
    </select>
</div>

<div>
    <label>Datum kupovine: </label>
    <input type="datetime-local" v-model="novaKorpa.datum_kupovine" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="novaKorpa.cena" required></div>
<div>
    <label>Ocena: </label>
    <input type="number" v-model="novaKorpa.ocena" required></div>



<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}