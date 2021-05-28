export default {
    props: ["kupci", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID-Kupac</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Datum rodjenja</th>
        <th>E-mail</th>
        <th>Telefon</th>
        <th>Mesto</th>
        <th>Adresa</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="kupac in kupci">
        <td>{{kupac.IDKupac}}</td>
        <td>{{kupac.ime}}</td>
        <td>{{kupac.prezime}}</td>
        <td>{{kupac.datumRodjenja}}</td>
        <td>{{kupac.email}}</td>
        <td>{{kupac.telefon}}</td>
        <td>{{kupac.mesto}}</td>
        <td>{{kupac.adresa}}</td>
        <td><button v-on:click="$emit('uklanjanje', kupac.IDKupac)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...kupac})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}