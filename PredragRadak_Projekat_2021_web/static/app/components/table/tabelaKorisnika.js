export default {
    props: ["korisnici", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID-Korisnik</th>
        <th>Ime</th>
        <th>E-mail</th>
        <th>Lozinka</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korisnik in korisnici">
        <td>{{korisnik.IDKorisnik}}</td>
        <td>{{korisnik.ime}}</td>
        <td>{{korisnik.email}}</td>
        <td>{{korisnik.lozinka}}</td>
        <td><button v-on:click="$emit('uklanjanje', korisnik.IDKorisnik)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...korisnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}