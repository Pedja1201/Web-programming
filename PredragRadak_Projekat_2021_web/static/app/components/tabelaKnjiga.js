export default {
    props: ["knjige", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>ID-Knjiga</th>
        <th>Naziv</th>
        <th>Autor</th>
        <th>Kategorija</th>
        <th>Cena</th>
        <th>Stanje</th>
        <th>Link</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="knjiga in knjige">
        <td>{{knjiga.IDKnjiga}}</td>
        <td>{{knjiga.naziv}}</td>
        <td>{{knjiga.autor}}</td>
        <td>{{knjiga.kategorija}}</td>
        <td>{{knjiga.cena}}</td>
        <td>{{knjiga.stanje}}</td>
        <td><a href="#">{{knjiga.link}}</a></td>
        <td><button v-on:click="$emit('uklanjanje', knjiga.IDKnjiga)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...knjiga})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}