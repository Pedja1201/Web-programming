export default {
    props: ["transakcija", "dugme", "naslov", "artikli"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaTransakcija: this.transakcija ? this.transakcija : {}
        }
    },


    watch: {
        transakcija: function(newValue, oldValue){
            this.novaTransakcija = {...this.transakcija};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaTransakcija})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Datum: </label>
    <input type="datetime-local" v-model="novaTransakcija.datum" required></div>
<div>
    <label>Kolicina: </label>
    <input type="number" v-model="novaTransakcija.kolicina" required></div>

<div>
    <label>Artikl ID: </label>
    <select v-model="novaTransakcija.artikl_id" required>
    <option v-for="artikl in artikli" :value="artikl.id">{{artikl.naziv}}, {{artikl.proizvodjac}}, {{artikl.robna_marka}}, {{artikl.dobavljac}}={{artikl.cena}}</option>
    </select>
</div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}