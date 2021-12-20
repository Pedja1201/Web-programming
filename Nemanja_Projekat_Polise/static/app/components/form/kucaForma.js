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
    <form v-on:submit.prevent="$emit('sacuvaj', {...novaKuca})"  class="w-85 p-3 container fade-in bg-image"
    style="
    background-image: url('./pictures/turista.png');
    height: 100vh;
    ">
    <p id="naslov"><b>-{{naslov}}</b></p>
    <div class="mb-3">
        <label class="form-label">Naziv: </label>
        <input type="text" class="form-control aler alert-primary" v-model="novaKuca.naziv" required>
        <div class="form-text"><i>Uneti naziv</i></div>
    </div>
   
    
    <div>
        <button type="submit" class="btn btn-success">{{dugme}}</button>
    </div>
    
    </form>
        `
}