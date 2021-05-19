export default {
    props: ["kuca", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKuca: this.kuca ? this.kuca : {}
        }
    },


    watch: {
        kuca: function(newValue, oldValue){
            this.novaKuca = {...this.kuca};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKuca})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="novaKuca.naziv" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}