export default {
    props: ["smestaj", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviSmestaj: this.smestaj ? this.smestaj : {}
        }
    },


    watch: {
        smestaj: function(newValue, oldValue){
            this.noviSmestaj = {...this.smestaj};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviSmestaj})" class="w-85 m-3 container fade-in bg-image"
style="
background-image: url('./pictures/smestaj.jpg');
height: 100vh;
">
<p id="naslov"><b>-{{naslov}}</b></p>

<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control aler alert-warning" v-model="noviSmestaj.naziv" required>
    <div class="form-text"><i>Uneti naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Mesto: </label>
    <input type="text" class="form-control aler alert-warning" v-model="noviSmestaj.mesto" required>
    <div class="form-text"><i>Uneti mesto</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}
