export default {
    props: ["turista", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviTurista: this.turista ? this.turista : {}
        }
    },


    watch: {
        turista: function(newValue, oldValue){
            this.noviTurista = {...this.turista};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviTurista})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviTurista.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviTurista.prezime" required></div>
<div>
    <label>Datum rodjenja: </label>
    <input type="datetime-local" v-model="noviTurista.datum_rodjenja" required></div>
<div>
    <label>Maticni broj: </label>
    <input type="number" v-model="noviTurista.maticni_broj" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}