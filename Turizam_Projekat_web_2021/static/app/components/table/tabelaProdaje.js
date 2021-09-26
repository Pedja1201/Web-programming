export default {
    props: ["prodaje", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped table-danger">
<thead>
    <tr>
        <th>ID</th>
        <th>Aranžman ID</th>
        <th>Turista ID</th>
        <th>Način plaćanja</th>
        <th>Datum plaćanja</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="prodaja in prodaje">
        <td>{{prodaja.id}}</td>
        <td>{{prodaja.aranzman_id}}</td>
        <td>{{prodaja.turista_id}}</td>
        <td>{{prodaja.nacin_placanja}}</td>
        <td>{{prodaja.datum_placanja}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', prodaja.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...prodaja})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}