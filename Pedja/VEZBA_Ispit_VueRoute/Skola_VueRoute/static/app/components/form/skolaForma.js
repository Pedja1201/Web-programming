export default {
    props: ["skola", "dugme", "naslov", "nastavnici", "predmeti"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaSkola: this.skola ? this.skola : {}
        }
    },

    watch: {
        skola: function(newValue, oldValue){
            this.novaSkola = {...this.skola};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaSkola})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID: </label>
    <input type="number" v-model="novaSkola.id" required></div>
<div>
    <label>Ime skole: </label>
    <input type="text" v-model="novaSkola.ime_skole" required></div>
<div>
    <label>Adresa: </label>
    <input type="text" v-model="novaSkola.adresa" required></div>
<div>
    <label>ID-Nastavnika: </label>
    <select v-model="novaSkola.nastavnik_licni_id" required>
        <option v-for="nastavnik in nastavnici" :value="nastavnik.licni_id">{{nastavnik.ime}}, {{nastavnik.prezime}}, {{nastavnik.email}}/{{nastavnik.br_telefona}}</option>
    </select>
</div>
<div>
    <label>ID-Predmeta: </label>
    <select v-model="novaSkola.predmet_id" required>
        <option v-for="predmet in predmeti" :value="predmet.id">{{predmet.ime_predmeta}}, {{predmet.razred}}</option>
    </select>
</div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}