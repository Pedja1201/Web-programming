export default {
    props: ["kupci", "naslov"],
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
        <th>Ime</th>
        <th>Prezime</th>
        <th>Adresa stanovanja</th>
        <th>Broj telefona</th>
        <th>Korisnik ID</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="kupac in kupci">
        <td>{{kupac.id}}</td>
        <td>{{kupac.ime}}</td>
        <td>{{kupac.prezime}}</td>
        <td>{{kupac.adresa}}</td>
        <td>{{kupac.telefon}}</td>
        <td>{{kupac.korisnik_id}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', kupac.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...kupac})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}