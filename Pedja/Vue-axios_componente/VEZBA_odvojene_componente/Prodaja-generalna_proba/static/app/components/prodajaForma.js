export default {
    props: ["prodaja", "dugme", "naslov", "aranzmani", "turisti"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaProdaja: this.prodaja ? this.prodaja : {}
        }
    },


    watch: {
        prodaja: function(newValue, oldValue){
            this.novaProdaja = {...this.prodaja};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaProdaja})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Aranzman ID: </label>
    <select v-model="novaProdaja.aranzman_id" required>
        <option v-for="aranzman in aranzmani" :value="aranzman.id">{{aranzman.naziv}}, {{aranzman.cena}}, {{aranzman.datum_polaska}}, {{aranzman.broj_dana}}</option>
    </select>
</div>
<div>
    <label>Turista ID: </label>
    <select v-model="novaProdaja.turista_id" required>
        <option v-for="turista in turisti" :value="turista.id">{{turista.ime}}, {{turista.prezime}}, {{turista.datum_rodjenja}}, {{turista.maticni_broj}}</option>
    </select>
</div>

<div>
    <label>Nacin placanja: </label>
    <input type="text" v-model="novaProdaja.nacin_placanja" required></div>
<div>
    <label>Datum placanja: </label>
    <input type="datetime-local" v-model="novaProdaja.datum_placanja" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}