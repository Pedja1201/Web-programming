export default {
    props: ["polise", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped table-info table-bordered border-primary">
<thead>
    <tr>
        <th>ID</th>
        <th>Automobil ID</th>
        <th>Osiguravajuca kuca ID</th>
        <th>Datum pocetka</th>
        <th>Datum kraja</th>
        <th>Cena</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="polisa in polise">
        <td>{{polisa.id}}</td>
        <td>{{polisa.automobil_id}}</td>
        <td>{{polisa.osiguravajuca_kuca_id}}</td>
        <td>{{polisa.datum_pocetka}}</td>
        <td>{{polisa.datum_kraja}}</td>
        <td>{{polisa.cena}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', polisa.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...polisa})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}