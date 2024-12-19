import axios from 'axios';

const getTrainOrigin = async (numeroTreno) => {
  const url = `http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/cercaNumeroTreno/${numeroTreno}`;

  try {
    const response = await axios.get(url);
    const data = response.data; // Ottieni la risposta JSON

    // Estrarre la stazione di provenienza dal campo descLocOrig
    if (data && data.descLocOrig) {
      return data.descLocOrig;
    } else {
      throw new Error('Stazione di provenienza non trovata');
    }
  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    throw new Error('Errore nel recupero delle informazioni sul treno');
  }
};

export default getTrainOrigin;
