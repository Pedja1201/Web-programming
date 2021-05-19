export default {
    props: ["kupci"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Korisnicko ime</th>
        <th>Lozinka</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="kupac in kupci">
        <td>{{kupac.id}}</td>
        <td>{{kupac.ime}}</td>
        <td>{{kupac.prezime}}</td>
        <td>{{kupac.korIme}}</td>
        <td>{{kupac.lozinka}}</td>
        <td><button v-on:click="$emit('uklanjanje', kupac.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...kupac})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
