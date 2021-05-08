export default {
    props: ["angaz", "dugme", "naslov"],
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
    <label>ID-Radnik: </label>
    <input type="number" v-model="novoAngazovanje.radnik_id" required></div>
<div>
    <label>ID-Radno mesto: </label>
    <input type="number" v-model="novoAngazovanje.radno_mesto_id" required></div>
<div>
    <label>Pocetak: </label>
    <input type="date" v-model="novoAngazovanje.pocetak" required></div>
<div>
    <label>Kraj: </label>
    <input type="date" v-model="novoAngazovanje.kraj" required></div>
<div>
    <label>Plata: </label>
    <input type="text" v-model="novoAngazovanje.plata" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}