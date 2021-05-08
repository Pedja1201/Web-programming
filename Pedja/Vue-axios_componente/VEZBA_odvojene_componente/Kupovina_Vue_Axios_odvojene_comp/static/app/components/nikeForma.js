export default {
    props: ["nike", "dugme", "naslov"],
    emits: ["sacuvaj"],
    data(){
        return{
            noviNike: this.nike ? this.nike : {}
        }
    },
    watch: {
        nike : function(newValue, oldValue){
            this.noviNike = {...this.nike}
        }
    },
    template: `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviNike})">
<p><b>-{{naslov}}</b></p>

<div>
    <label>Odeca:</label>
    <input type="text" v-model="noviNike.odeca" required>
</div>
<div>
    <label>Obuca:</label>
    <input type="text" v-model="noviNike.obuca" required>
</div>
<div>
    <label>Velicina:</label>
    <input type="text" v-model="noviNike.velicina" required>
</div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `
}