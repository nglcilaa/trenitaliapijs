import axios from 'axios';
import express from 'express';
import cors from 'cors';
import stations from './stations.json' assert { type: 'json' };

const app = express();
const PORT = process.env.PORT || 5000;

const BASE_URI = "http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno";

app.use(cors());
app.use(express.json());

const get = async (endpoint, ...args) => {
  const url = `${BASE_URI}/${endpoint}/${args.join('/')}`;
  try {
    console.log(`Fetching from URL: ${url}`);  // Stampa l'URL completo in console
    const response = await axios.get(url, { timeout: 30000 });
    return response.data;
  } catch (error) {
    console.error('Errore nella richiesta:', error);
    throw error;
  }
};

const getRegion = async (stazioneId) => {
  const url = `${BASE_URI}/regione/${stazioneId}`;
  try {
    const response = await axios.get(url, { timeout: 30000 });
    return response.data;
  } catch (error) {
    console.error('Errore nella richiesta della regione:', error);
    throw error;
  }
};

const getDepartures = async (partenzaId, datetime) => {
  return get('partenze', partenzaId, datetime);
};

const stazioniGenova = [
  "GENOVA BRIGNOLE",
  "GENOVA PIAZZA PRINCIPE",
  "GENOVA SESTRI PONENTE",
  "GENOVA PEGLI",
  "GENOVA PRA",
  "GENOVA BOLZANETO",
  "GENOVA VOLTRI",
  "GENOVA CORNIGLIANO",
  "GENOVA SAMPIERDARENA"
];

const getTrainIcon = (categoria, regione, destinazione) => {
  if (categoria === "REG") {
    if (regione === 1) { // 1 corrisponde a LOMBARDIA
      if (destinazione.includes("BOLOGNA") || destinazione.includes("TORINO") || stazioniGenova.some(staz => destinazione.includes(staz))) {
        return "https://seeklogo.com/images/T/trenitalia-logo-0AE98832B5-seeklogo.com.png";
      } else {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Trenord_Logo.svg/800px-Trenord_Logo.svg.png";
      }
    } else {
      return "https://seeklogo.com/images/T/trenitalia-logo-0AE98832B5-seeklogo.com.png";
    }
  } else if (categoria === "FR") {
    return "https://upload.wikimedia.org/wikipedia/commons/8/81/Frecciarossa_TR_-_Logo.svg";
  } else {
    return "https://upload.wikimedia.org/wikipedia/commons/8/81/Frecciarossa_TR_-_Logo.svg";
  }
};

app.get('/stations/:partenza_id/departures', async (req, res) => {
  const { partenza_id } = req.params;
  const today = new Date();

  // Formattazione data e ora secondo lo standard richiesto
  const datetime = today.toString();

  try {
    console.log(`Checking for departures at ${datetime} from ${partenza_id}`);

    // Ottenere la regione della stazione di partenza
    const regioneData = await getRegion(partenza_id);
    const regione = parseInt(regioneData); // Supponendo che l'ID della regione sia un numero intero

    const departures = await getDepartures(partenza_id, datetime);
    console.log('Departures:', departures);

    const result = departures.map(d => ({
      numeroTreno: parseInt(d.numeroTreno),
      categoria: d.categoria,
      categoriaDescrizione: d.categoriaDescrizione.trim(),
      origine: d.origine,
      codOrigine: d.codOrigine,
      destinazione: d.destinazione,
      codDestinazione: d.codDestinazione,
      oraPartenzaEstera: d.oraPartenzaEstera,
      oraArrivoEstera: d.oraArrivoEstera,
      tratta: d.tratta,
      regione: d.regione,
      origineZero: d.origineZero,
      destinazioneZero: d.destinazioneZero,
      orarioPartenzaZero: d.orarioPartenzaZero,
      orarioArrivoZero: d.orarioArrivoZero,
      circolante: d.circolante,
      codiceCliente: d.codiceCliente,
      binarioEffettivoArrivoCodice: d.binarioEffettivoArrivoCodice,
      binarioEffettivoArrivoDescrizione: d.binarioEffettivoArrivoDescrizione,
      binarioEffettivoArrivoTipo: d.binarioEffettivoArrivoTipo,
      binarioProgrammatoArrivoCodice: d.binarioProgrammatoArrivoCodice,
      binarioProgrammatoArrivoDescrizione: d.binarioProgrammatoArrivoDescrizione,
      binarioEffettivoPartenzaCodice: d.binarioEffettivoPartenzaCodice,
      binarioEffettivoPartenzaDescrizione: d.binarioEffettivoPartenzaDescrizione,
      binarioEffettivoPartenzaTipo: d.binarioEffettivoPartenzaTipo,
      binarioProgrammatoPartenzaCodice: d.binarioProgrammatoPartenzaCodice,
      binarioProgrammatoPartenzaDescrizione: d.binarioProgrammatoPartenzaDescrizione,
      subTitle: d.subTitle,
      esisteCorsaZero: d.esisteCorsaZero,
      orientamento: d.orientamento,
      inStazione: d.inStazione,
      haCambiNumero: d.haCambiNumero,
      nonPartito: d.nonPartito,
      provvedimento: d.provvedimento,
      riprogrammazione: d.riprogrammazione,
      orarioPartenza: new Date(d.orarioPartenza).getTime(),
      orarioArrivo: d.orarioArrivo ? new Date(d.orarioArrivo).getTime() : null,
      stazionePartenza: d.stazionePartenza,
      stazioneArrivo: d.stazioneArrivo,
      statoTreno: d.statoTreno,
      corrispondenze: d.corrispondenze,
      servizi: d.servizi,
      ritardo: d.ritardo,
      tipoProdotto: d.tipoProdotto,
      compOrarioPartenzaZeroEffettivo: d.compOrarioPartenzaZeroEffettivo,
      compOrarioArrivoZeroEffettivo: d.compOrarioArrivoZeroEffettivo,
      compOrarioPartenzaZero: d.compOrarioPartenzaZero,
      compOrarioArrivoZero: d.compOrarioArrivoZero,
      compOrarioArrivo: d.compOrarioArrivo,
      compOrarioPartenza: d.compOrarioPartenza,
      compNumeroTreno: d.compNumeroTreno,
      compOrientamento: d.compOrientamento,
      compTipologiaTreno: d.compTipologiaTreno,
      compClassRitardoTxt: d.compClassRitardoTxt,
      compClassRitardoLine: d.compClassRitardoLine,
      compImgRitardo2: d.compImgRitardo2,
      compImgRitardo: d.compImgRitardo,
      compRitardo: d.compRitardo,
      compRitardoAndamento: d.compRitardoAndamento,
      compInStazionePartenza: d.compInStazionePartenza,
      compInStazioneArrivo: d.compInStazioneArrivo,
      compOrarioEffettivoArrivo: d.compOrarioEffettivoArrivo,
      compDurata: d.compDurata,
      compImgCambiNumerazione: d.compImgCambiNumerazione,
      materiale_label: d.materiale_label,
      dataPartenzaTreno: new Date(d.dataPartenzaTreno).getTime(),
      binarioProgrammato: d.binarioProgrammatoPartenzaDescrizione,
      binarioReale: d.binarioEffettivoPartenzaDescrizione,
      iconaTreno: getTrainIcon(d.categoria, regione, d.destinazione)
    }));

    res.json(result);
  } catch (error) {
    console.error('Errore nel recupero delle partenze:', error);
    res.status(500).json({ error: 'Errore nel recupero delle partenze.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});











