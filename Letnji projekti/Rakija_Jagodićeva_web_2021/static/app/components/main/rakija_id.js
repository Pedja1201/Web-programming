////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena rakije</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="rakija.naziv" required>
    <div class="form-text"><i>Izmeni naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Sorta: </label>
    <input type="text" class="form-control" v-model="rakija.sorta" required>
    <div class="form-text"><i>Izmeni sortu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control" v-model="rakija.cena" required>
    <div class="form-text"><i>Izmeni cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Godina: </label>
    <input type="number" class="form-control" v-model="rakija.godina" required>
    <div class="form-text"><i>Izmeni godinu</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            rakija: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/rakije/${this.$route.params['id']}`).then((response) => {
                
                this.rakija = response.data;
            });
        },
        update(){
            axios.put(`api/rakije/${this.$route.params['id']}`, this.rakija).then((response) => {
                this.$router.push("/rakije");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}