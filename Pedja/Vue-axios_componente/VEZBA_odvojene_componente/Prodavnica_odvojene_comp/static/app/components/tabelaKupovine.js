export default {
    props: ["kupovine"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>Broj</th>
        <th>Kolicina</th>
        <th>Cena</th>
        <th>Datum</th>
        <th>Kupac ID</th>
        <th>Proizvod ID</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="kupovina in kupovine">
        <td>{{kupovina.broj}}</td>
        <td>{{kupovina.kolicina}}</td>
        <td>{{kupovina.cena}}</td>
        <td>{{kupovina.datum}}</td>
        <td>{{kupovina.kupac_id}}</td>
        <td>{{kupovina.proizvod_id}}</td>
        <td><button v-on:click="$emit('uklanjanje', kupovina.broj)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...kupovina})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
