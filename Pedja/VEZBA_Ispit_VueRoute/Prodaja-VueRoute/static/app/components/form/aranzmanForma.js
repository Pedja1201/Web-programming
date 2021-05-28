export default {
    props: ["aranzman", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviAranzman: this.aranzman ? this.aranzman : {}
        }
    },


    watch: {
        aranzman: function(newValue, oldValue){
            this.noviAranzman = {...this.aranzman};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviAranzman})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="noviAranzman.naziv" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="noviAranzman.cena" required></div>
<div>
    <label>Datum polaska: </label>
    <input type="datetime-local" v-model="noviAranzman.datum_polaska" required></div>
<div>
    <label>Broj dana: </label>
    <input type="number" v-model="noviAranzman.broj_dana" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}