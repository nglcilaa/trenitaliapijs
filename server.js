import express from 'express';
import cors from 'cors';
import { getRegion, getDepartures, getTrainIcon, stazioniGenova, stazioniSpeciali, stazioniLombardia } from './functions/trainService.js';
import { fetchNewsFromTicker, fetchNewsFromRSS } from './functions/fetchNewsRFI.js';
import { getTrainDetails } from './functions/fetchDetailTrains.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/stations/:partenza_id/departures', async (req, res) => {
  const { partenza_id } = req.params;
  const today = new Date();
  const datetime = today.toString();

  try {
    console.log(`Checking for departures at ${datetime} from ${partenza_id}`);

    const regioneData = await getRegion(partenza_id);
    const regione = parseInt(regioneData);

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
      iconaTreno: getTrainIcon(d.categoria, regione, d.destinazione, d.partenza, d.codiceCliente)
    }));

    res.json(result);
  } catch (error) {
    console.error('Errore nel recupero delle partenze:', error);
    res.status(500).json({ error: 'Errore nel recupero delle partenze.' });
  }
});

app.get('/news/ticker', async (req, res) => {
  try {
    const news = await fetchNewsFromTicker();
    res.json(news);
  } catch (error) {
    console.error('Errore nel recupero delle notizie dal ticker:', error);
    res.status(500).json({ error: 'Errore nel recupero delle notizie dal ticker.' });
  }
});

app.get('/news/rss', async (req, res) => {
  try {
    const news = await fetchNewsFromRSS();
    res.json(news);
  } catch (error) {
    console.error('Errore nel recupero delle notizie dal RSS:', error);
    res.status(500).json({ error: 'Errore nel recupero delle notizie dal RSS.' });
  }
});

app.get('/train/details/:stazioneId/:trainCode/:date', async (req, res) => {
  const { stazioneId, trainCode, date } = req.params;
  try {
    const trainDetails = await getTrainDetails(stazioneId, trainCode, date);
    res.json(trainDetails);
  } catch (error) {
    console.error('Errore nel recupero dei dettagli del treno:', error);
    res.status(500).json({ error: 'Errore nel recupero dei dettagli del treno.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
















