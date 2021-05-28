export default {
    props: ["polise", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
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
        <td><button v-on:click="$emit('uklanjanje', polisa.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...polisa})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}