////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena smeštaja</b></p>

<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control aler alert-danger" v-model="smestaj.naziv" required>
    <div class="form-text"><i>Izmeni naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Mesto: </label>
    <input type="text" class="form-control aler alert-danger" v-model="smestaj.mesto" required>
    <div class="form-text"><i>Izmeni mesto</i></div>
</div>


<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>

</form>
    `,
    data(){
        return {
            smestaj: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/smestaji/${this.$route.params['id']}`).then((response) => {
                this.smestaj = response.data;
            });
        },
        update(){
            axios.put(`api/smestaji/${this.$route.params['id']}`, this.smestaj).then((response) => {
                this.$router.push("/smestaji");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}