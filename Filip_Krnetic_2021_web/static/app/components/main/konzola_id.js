////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena konzole</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="konzola.naziv" required>
    <div class="form-text"><i>izmeni naziv</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            konzola: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/konzole/${this.$route.params['id']}`).then((response) => {
                this.konzola = response.data;
            });
            axios.get("api/konzole").then((response) => {
                this.konzola = response.data;
            });
        },
        update(){
            axios.put(`api/konzole/${this.$route.params['id']}`, this.konzola).then((response) => {
                this.$router.push("/konzole");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}