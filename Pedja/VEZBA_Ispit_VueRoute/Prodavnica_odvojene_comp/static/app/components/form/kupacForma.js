export default {
    props: ["kupac", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKupac: this.kupac ? this.kupac : {}
        }
    },


    watch: {
        kupac: function(newValue, oldValue){
            this.noviKupac = {...this.kupac};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKupac})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviKupac.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviKupac.prezime" required></div>
<div>
    <label>Korisnicko ime: </label>
    <input type="text" v-model="noviKupac.korIme" required></div>
<div>
    <label>Lozinka: </label>
    <input type="password" v-model="noviKupac.lozinka" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}