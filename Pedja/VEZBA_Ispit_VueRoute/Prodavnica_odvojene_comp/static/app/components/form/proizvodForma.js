export default {
    props: ["proizvod", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviProizvod: this.proizvod ? this.proizvod : {}
        }
    },


    watch: {
        proizvod: function(newValue, oldValue){
            this.noviProizvod = {...this.proizvod};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviProizvod})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="noviProizvod.naziv" required></div>
<div>
    <label>Opis: </label>
    <textarea v-model="noviProizvod.opis" required></textarea></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="noviProizvod.cena" required></div>
<div>
    <label>Dostupno: </label>
    <select v-model="noviProizvod.dostupno">
        <option value="1">DA</option>
        <option value="0">NE</option>
    </select>
</div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}