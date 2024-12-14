// trenoService.js
import axios from 'axios';

const BASE_URI = "http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno";

const get = async (endpoint, ...args) => {
  const url = `${BASE_URI}/${endpoint}/${args.join('/')}`;
  try {
    console.log(`Fetching from URL: ${url}`);  
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

const stazioniSpeciali = [
  "ASTI", "RIMINI", "RAVENNA", "PADOVA", "VENEZIA", 
   "MODENA", "LIVORNO", "PISA"
];

const stazioniLombardia = [
  "BRESCIA", "PAVIA", "PIOLTELLO LIMITO", "VARESE", 
  "MORTARA", "TREVIGLIO", "MILANO GRECO PIRELLI", "MI.P.GENOVA"
];

const getTrainIcon = (categoria, regione, destinazione, partenza) => {
  if (categoria === "REG") {
    if (regione === 1) { // 1 corrisponde a LOMBARDIA
      if (
        destinazione.includes("BOLOGNA") ||
        destinazione.includes("TORINO") ||
        stazioniGenova.some(staz => destinazione.includes(staz)) ||
        stazioniSpeciali.some(staz => destinazione.includes(staz))
      ) {
        return "https://seeklogo.com/images/T/trenitalia-logo-0AE98832B5-seeklogo.com.png";
      } else if (
        partenza === "VERONA PORTA NUOVA" && destinazione === "MILANO CENTRALE" || 
        partenza === "MILANO CENTRALE" && destinazione === "VERONA PORTA NUOVA"
      ) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Trenord_Logo.svg/800px-Trenord_Logo.svg.png";
      } else {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Trenord_Logo.svg/800px-Trenord_Logo.svg.png";
      }
    } else if (stazioniLombardia.some(staz => destinazione.includes(staz))) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Trenord_Logo.svg/800px-Trenord_Logo.svg.png";
    } else {
      return "https://seeklogo.com/images/T/trenitalia-logo-0AE98832B5-seeklogo.com.png";
    }
  } else if (categoria === "IC") {
    return "https://upload.wikimedia.org/wikipedia/commons/8/86/Treno_Intercity.svg";
  } else if (categoria === "EC") {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/SBB_EC_Logo.svg/2560px-SBB_EC_Logo.svg.png";
  } else {
    return "https://upload.wikimedia.org/wikipedia/commons/8/81/Frecciarossa_TR_-_Logo.svg";
  }
};

export { getRegion, getDepartures, getTrainIcon, stazioniGenova, stazioniSpeciali, stazioniLombardia };


