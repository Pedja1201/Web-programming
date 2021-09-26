//Korisnik
import TabelaKorisnika from './components/table/tabelaKorisnika.js'
import KorisnikForma from './components/forma/korisnikForma.js'

//Turista
import TabelaTurista from './components/table/tabelaTurista.js'
import TuristaForma from './components/forma/turistaForma.js'

//Aranzmani
import TabelaAranzmana from './components/table/tabelaAranzmana.js'
import AranzmanForma from './components/forma/aranzmanForma.js'

///Smestaj
import TabelaSmestaja from './components/table/tabelaSmestaja.js'
import SmestajForma from './components/forma/smestajForma.js'


//Prodaja
import TabelaProdaje from './components/table/tabelaProdaje.js'
import ProdajaForma from './components/forma/prodajaForma.js'

////Razdvojene componenete u main
import Korisnici from './components/main/korisnici.js'
import KorisnikId from './components/main/korisnik_id.js'

import Turisti from './components/main/turisti.js'
import TuristaId from './components/main/turista_id.js'

import Aranzmani from './components/main/aranzmani.js'
import AranzmanId from './components/main/aranzman_id.js'

import Smestaji from './components/main/smestaji.js'
import SmestajId from './components/main/smestaj_id.js'

import Prodaja from './components/main/prodaja.js'
import ProdajaId from './components/main/prodaja_id.js'

////Logovanje
import Login from './components/login/login.js'
import Logout from './components/login/logout.js'


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Login},///Prikaz za stranice
        {path: "/logout", component: Logout},///Prikaz za stranice

        {path: "/korisnici", component: Korisnici},///Prikaz za stranice
        {path: "/korisnici/:id", component: KorisnikId},//Pojedinacan prikaz

        {path: "/turisti", component: Turisti},///Prikaz za stranice
        {path: "/turisti/:id", component: TuristaId},///Prikaz za stranice


        {path: "/aranzmani", component: Aranzmani},///Prikaz za stranice
        {path: "/aranzmani/:id", component: AranzmanId},//Pojedinacan prikaz

        {path: "/smestaji", component: Smestaji},///Prikaz za stranice
        {path: "/smestaji/:id", component: SmestajId},//Pojedinacan prikaz

        {path: "/prodaje", component: Prodaja},///Prikaz za stranice
        {path: "/prodaje/:id", component: ProdajaId},//Pojedinacan prikaz   
        
    ],
});

const app = Vue.createApp({});
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.component('tabela-turista', TabelaTurista);
app.component('turista-forma', TuristaForma);

app.component('tabela-aranzmana', TabelaAranzmana);
app.component('aranzman-forma', AranzmanForma);

app.component('tabela-smestaja', TabelaSmestaja);
app.component('smestaj-forma', SmestajForma);


app.component('tabela-prodaje', TabelaProdaje);
app.component('prodaja-forma', ProdajaForma);

app.use(router);
app.mount("#app");
