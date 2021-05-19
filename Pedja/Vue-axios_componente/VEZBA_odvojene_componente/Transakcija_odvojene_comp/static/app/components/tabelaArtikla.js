export default {
    props: ["artikli"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Naziv</th>
        <th>Proizvodjac</th>
        <th>Robna marka</th>
        <th>Dobavljac</th>
        <th>Cena</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="artikl in artikli">
        <td>{{artikl.id}}</td>
        <td>{{artikl.naziv}}</td>
        <td>{{artikl.proizvodjac}}</td>
        <td>{{artikl.robna_marka}}</td>
        <td>{{artikl.dobavljac}}</td>
        <td>{{artikl.cena}}</td>
        <td><button v-on:click="$emit('uklanjanje', artikl.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...artikl})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}
