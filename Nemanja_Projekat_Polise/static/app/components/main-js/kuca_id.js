////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
    <form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
    <p><b>-Izmena osiguravajuce kuce</b></p>
    
    <div class="mb-3">
        <label class="form-label">Naziv: </label>
        <input type="text" class="form-control aler alert-primary" v-model="kuca.naziv" required>
        <div class="form-text"><i>Uneti naziv</i></div>
    </div>
    
    
    <div>
        <button type="submit" class="btn btn-info">Izmeni</button>
    </div>
    
    </form>
    `,
    data(){
        return {
            kuca: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/osiguravajuceKuce/${this.$route.params['id']}`).then((response) => {
               this.kuca = response.data;
            });
        },
        update(){
            axios.put(`api/osiguravajuceKuce/${this.$route.params['id']}`, this.kuca).then((response) => {
                this.$router.push("/osiguravajuceKuce");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}