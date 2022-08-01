////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
    <form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
    <p><b>-Izmena automobila</b></p>
    <div class="mb-3">
        <label class="form-label">Registarski broj: </label>
        <input type="text" class="form-control aler alert-warning" v-model="auto.registarski_broj" required>
        <div class="form-text"><i>Uneti registrarski broj</i></div>
    </div>
    
    <div class="mb-3">
        <label class="form-label">Marka: </label>
        <input type="text" class="form-control aler alert-warning" v-model="auto.marka" required>
        <div class="form-text"><i>Uneti marku</i></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Model: </label>
        <input type="text" class="form-control aler alert-warning" v-model="auto.model" required>
        <div class="form-text"><i>Uneti model</i></div>
    </div>
    <div class="mb-3">
        <label class="form-label">Zapremina motora: </label>
        <input type="text" class="form-control aler alert-warning" v-model="auto.zapremina_motora" required>
        <div class="form-text"><i>Uneti zapreminu</i></div>
    </div>
    <div>
        <button type="submit" class="btn btn-info">Izmeni</button>
    </div>
    </form>
    `,
    data(){
        return {
            auto: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/automobili/${this.$route.params['id']}`).then((response) => {
               this.auto = response.data;
            });
        },
        update(){
            axios.put(`api/automobili/${this.$route.params['id']}`, this.auto).then((response) => {
                this.$router.push("/automobili");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}