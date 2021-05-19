export default {
    props: ["korisnici"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>Oznaka</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Broj telefona</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korisnik in korisnici">
        <td>{{korisnik.oznaka}}</td>
        <td>{{korisnik.ime}}</td>
        <td>{{korisnik.prezime}}</td>
        <td>{{korisnik.br_telefona}}</td>
        <td><button v-on:click="$emit('uklanjanje', korisnik.oznaka)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...korisnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}