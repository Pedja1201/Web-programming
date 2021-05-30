export default {
    props: ["korisnici", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table class="table table-success table-striped">
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
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', korisnik.IDKorisnik)">Ukloni</button>
            <button class="btn btn-info" v-on:click="$emit('izmena', {...korisnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}