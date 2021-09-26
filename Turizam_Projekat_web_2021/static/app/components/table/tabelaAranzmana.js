export default {
    props: ["aranzmani", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped table-dark">
<thead>
    <tr>
        <th>ID</th>
        <th>Smeštaj ID</th>
        <th>Cena</th>
        <th>Datum polaska</th>
        <th>Broj dana</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="aranzman in aranzmani">
        <td>{{aranzman.id}}</td>
        <td>{{aranzman.smestaj_id}}</td>
        <td>{{aranzman.cena}},00</td>
        <td>{{aranzman.datum_polaska}}</td>
        <td>{{aranzman.broj_dana}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', aranzman.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...aranzman})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}