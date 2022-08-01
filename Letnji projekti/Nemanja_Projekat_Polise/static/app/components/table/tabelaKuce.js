export default {
    props: ["osiguravajuceKuce", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-warning table-striped table-bordered border-warning">
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="kuca in osiguravajuceKuce">
        <td>{{kuca.id}}</td>
        <td>{{kuca.naziv}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', kuca.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...kuca})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}