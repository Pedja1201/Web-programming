export default {
    props: ["polisa", "dugme", "naslov", "automobili", "osiguravajuceKuce"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaPolisa: this.polisa ? this.polisa : {}
        }
    },


    watch: {
        polisa: function(newValue, oldValue){
            this.novaPolisa = {...this.polisa};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaPolisa})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Automobil ID: </label>
    <select v-model="novaPolisa.automobil_id" required>
        <option v-for="auto in automobili" :value="auto.id">{{auto.registarski_broj}}, {{auto.marka}},{{auto.model}},{{auto.zapremina_motora}}</option>
    </select>
</div>
<div>
    <label>Osiguravajuca kuca ID: </label>
    <select v-model="novaPolisa.osiguravajuca_kuca_id" required>
        <option v-for="kuca in osiguravajuceKuce" :value="kuca.id">{{kuca.naziv}}</option>
    </select>
</div>
<div>
    <label>Datum pocetka: </label>
    <input type="datetime-local" v-model="novaPolisa.datum_pocetka" required></div>
<div>
    <label>Datum kraja: </label>
    <input type="datetime-local" v-model="novaPolisa.datum_kraja" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="novaPolisa.cena" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}