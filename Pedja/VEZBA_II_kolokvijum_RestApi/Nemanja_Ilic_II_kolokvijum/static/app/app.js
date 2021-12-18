import VideoIgre from './components/videoIgre.js'

import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'

import TabelaIgra from './components/tabelaIgra.js'
import IgraForma from './components/igraForma.js'

import TabelaKorpa from './components/tabelaKorpa.js'
import KorpaForma from './components/korpaForma.js'

const app = Vue.createApp(VideoIgre);

app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-forma', KorisnikForma);

app.component('tabela-igra', TabelaIgra);
app.component('igra-forma', IgraForma);

app.component('tabela-korpa', TabelaKorpa);
app.component('korpa-forma', KorpaForma);



app.mount("#app");