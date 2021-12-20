export default {
    props: ["auto", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviAuto: this.auto ? this.auto : {}
        }
    },


    watch: {
        auto: function(newValue, oldValue){
            this.noviAuto = {...this.auto};
        }
        
    },
    template:  `
    <form v-on:submit.prevent="$emit('sacuvaj', {...noviAuto})" class="w-85 m-3 container fade-in bg-image"
    style="
    background-image: url('./pictures/auto.jpg');
    height: 100vh;
    ">
    <p id="naslov"><b>-{{naslov}}</b></p>

    <div class="mb-3">
        <label class="form-label">Registarski broj: </label>
        <input type="text" class="form-control aler alert-warning" v-model="noviAuto.registarski_broj" required>
        <div class="form-text"><i>Uneti registrarski broj</i></div>
    </div>
    
    <div class="mb-3">
        <label class="form-label">Marka: </label>
        <input type="text" class="form-control aler alert-warning" v-model="noviAuto.marka" required>
        <div class="form-text"><i>Uneti marku</i></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Model: </label>
        <input type="text" class="form-control aler alert-warning" v-model="noviAuto.model" required>
        <div class="form-text"><i>Uneti model</i></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Zapremina motora: </label>
        <input type="text" class="form-control aler alert-warning" v-model="noviAuto.zapremina_motora" required>
        <div class="form-text"><i>Uneti zapreminu</i></div>
    </div>
    
    <div>
        <button type="submit" class="btn btn-success">{{dugme}}</button>
    </div>
    
    </form>
`
}