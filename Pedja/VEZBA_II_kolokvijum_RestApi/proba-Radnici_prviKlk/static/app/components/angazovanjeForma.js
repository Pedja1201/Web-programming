export default {
    props: ["angaz", "dugme", "naslov", "radnici", "radnaMesta"],
    emits : ["sacuvaj"],
    data(){
        return{
            novoAngazovanje: this.angaz ? this.angaz : {}
        }
    },


    watch: {
        angaz: function(newValue, oldValue){
            this.novoAngazovanje = {...this.angaz};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novoAngazovanje})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Radnik ID: </label>
    <select v-model="novoAngazovanje.radnik_id" required>
        <option v-for="radnik in radnici" :value="radnik.id">{{radnik.ime}}, {{radnik.prezime}}, {{radnik.email}}</option>
    </select>
<div>
<div>
    <label>Radno mesto ID: </label>
    <select v-model="novoAngazovanje.radno_mesto_id" required>
        <option v-for="mesto in radnaMesta" :value="mesto.id">{{mesto.naziv}}</option>
    </select>
<div>

<div>
    <label>Pocetak: </label>
    <input type="datetime-local" v-model="novoAngazovanje.pocetak" required></div>
<div>
    <label>Kraj: </label>
    <input type="datetime-local" v-model="novoAngazovanje.kraj" required></div>
<div>
    <label>Plata: </label>
    <input type="number" v-model="novoAngazovanje.plata" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}