export default {
    props: ["porudzbine", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped">
<thead>
    <tr>
        <th>ID</th>
        <th>Kupac ID</th>
        <th>Rakija ID</th>
        <th>Količina</th>
        <th>Datuм</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="porudzbina in porudzbine">
        <td>{{porudzbina.id}}</td>
        <td>{{porudzbina.kupac_id}}</td>
        <td>{{porudzbina.rakija_id}}</td>
        <td>{{porudzbina.kolicina}}</td>
        <td>{{porudzbina.datum}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', porudzbina.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...porudzbina})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}