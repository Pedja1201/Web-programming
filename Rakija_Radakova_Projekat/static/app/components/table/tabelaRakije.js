export default {
    props: ["rakije", "naslov"],
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
        <th>Naziv</th>
        <th>Sorta</th>
        <th>Cena</th>
        <th>Godina</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="rakija in rakije">
        <td>{{rakija.id}}</td>
        <td>{{rakija.naziv}}</td>
        <td>{{rakija.sorta}}</td>
        <td>{{rakija.cena}},00</td>
        <td>{{rakija.godina}}</td>
        <td><button class="btn btn-danger me-3" v-on:click="$emit('uklanjanje', rakija.id)">Ukloni</button>
            <button class="btn btn-warning" v-on:click="$emit('izmena', {...rakija})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}