import axios from 'axios';

const BASE_URI = "http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno";

const getTrainDetails = async (stazioneId, trainCode, date) => {
  const url = `${BASE_URI}/andamentoTreno/${stazioneId}/${trainCode}/${date}`;
  try {
    const response = await axios.get(url, { timeout: 30000 });
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero dei dettagli del treno:', error);
    throw error;
  }
};

export { getTrainDetails };
