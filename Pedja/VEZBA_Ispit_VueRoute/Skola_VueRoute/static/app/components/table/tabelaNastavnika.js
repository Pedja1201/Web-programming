export default {
    props: ["nastavnici", "naslov"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
    <p><b>-{{naslov}}</b></p>
<table>
<thead>
    <tr>
        <th>Licni ID</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>E-mail</th>
        <th>Broj telefona</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="nastavnik in nastavnici">
        <td>{{nastavnik.licni_id}}</td>
        <td>{{nastavnik.ime}}</td>
        <td>{{nastavnik.prezime}}</td>
        <td>{{nastavnik.email}}</td>
        <td>{{nastavnik.br_telefona}}</td>
        <td><button v-on:click="$emit('uklanjanje', nastavnik.licni_id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...nastavnik})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}