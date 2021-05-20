export default {
    props: ["korisnici"],
    emits: ["izmena", "uklanjanje"],

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
        <th>Zanimanje</th>
        <th>ID-Nike</th>
        <th>Auto-Tablice</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="korisnik in korisnici">
        <td>{{korisnik.id}}</td>
        <td>{{korisnik.ime}}</td>
        <td>{{korisnik.prezime}}</td>
        <td>{{korisnik.zanimanje}}</td>
        <td>{{korisnik.nike_id}}</td>
        <td>{{korisnik.auto_tablice}}</td>
        <td><button v-on:click="$emit('uklanjanje', korisnik.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...korisnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}

