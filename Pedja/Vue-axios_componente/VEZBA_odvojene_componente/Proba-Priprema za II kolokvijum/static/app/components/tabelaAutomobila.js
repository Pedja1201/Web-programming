export default {
    props: ["automobili"],
    emits:["izmena", "uklanjanje"],

    data(){
        return{}
    },
    template: `
<table>
<thead>
    <tr>
        <th>ID</th>
        <th>Registarski broj</th>
        <th>Marka</th>
        <th>Model</th>
        <th>Zapremina motora</th>
        <th>Akcije</th>
    </tr>
</thead>
<tbody>
    <tr v-for="auto in automobili">
        <td>{{auto.id}}</td>
        <td>{{auto.registarski_broj}}</td>
        <td>{{auto.marka}}</td>
        <td>{{auto.model}}</td>
        <td>{{auto.zapremina_motora}}</td>
        <td><button v-on:click="$emit('uklanjanje', auto.id)">Ukloni</button>
            <button v-on:click="$emit('izmena', {...auto})">Izmena</button>
        </td>
    </tr>
</tbody>
</table>
    `
}