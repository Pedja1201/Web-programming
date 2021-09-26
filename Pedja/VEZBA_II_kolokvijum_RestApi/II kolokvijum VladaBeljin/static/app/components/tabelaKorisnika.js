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
        <th>ID</th>
        <th>Korisnicko ime</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Akcije</th>
    </tr>
</thead>




<tbody>
    <tr v-for="korisnik in korisnici">
        <td>{{korisnik.id}}</td>
        <td>{{korisnik.korisnicko_ime}}</td>
        <td>{{korisnik.ime}}</td>
        <td>{{korisnik.prezime}}</td>
        <td><button v-on:click="$emit('uklanjanje', korisnik.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...korisnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
