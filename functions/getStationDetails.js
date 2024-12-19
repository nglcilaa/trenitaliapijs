import axios from 'axios';

export const getStationDetails = async (code, regione) => {
  const url = `http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno/dettaglioStazione/${code}/${regione}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero dei dettagli della stazione:', error);
    throw error;
  }
};

