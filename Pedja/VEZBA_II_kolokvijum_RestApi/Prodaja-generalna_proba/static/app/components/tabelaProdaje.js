export default {
    props: ["prodaje"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Aranzman ID</th>
        <th>Turista ID</th>
        <th>Nacin placanja</th>
        <th>Datum placanja</th>
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
        <td><button v-on:click="$emit('uklanjanje', prodaja.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...prodaja})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}