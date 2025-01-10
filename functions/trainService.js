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

const getTrainIcon = (categoria, regione, destinazione, partenza, codiceCliente) => {
  switch (codiceCliente) {
    case 1:
      return "https://upload.wikimedia.org/wikipedia/commons/8/81/Frecciarossa_TR_-_Logo.svg";
    case 2:
      return "https://nglcila.com/trenitalia.png";
    case 4:
      if (categoria === "IC") {
        return "https://nglcila.com/trenitalia.png";
      } else if (categoria === "ICN") {
        return "https://nglcila.com/icn_notte.gif";
      } else {
        return "https://upload.wikimedia.org/wikipedia/commons/8/86/Treno_Intercity.svg";
      }
    case 18:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Logo_Trenitalia_Tper_%282022%29.svg/800px-Logo_Trenitalia_Tper_%282022%29.svg.png";
    case 63:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Trenord_Logo.svg/800px-Trenord_Logo.svg.png";
    case 64:
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Logo_%C3%96BB.svg/600px-Logo_%C3%96BB.svg.png";
    default:
      return "default_logo_link";
  }
};

const getTrainTypeIcon = (tipo, partenza, destinazione, categoriaDescrizione, numeroTreno, codiceCliente) => {
  const regionaliVelociDestinazioni = [
    "TORINO PORTA NUOVA", "BOLOGNA CENTRALE", "VENEZIA", "BRESCIA", "GENOVA", "ROMA TERMINI", "ROMA TIBURTINA", "ROMA FIUMICINO AEROPORTO"
  ];

  if (tipo === "REG") {
    return "https://upload.wikimedia.org/wikipedia/commons/6/61/Simbolo_Treno_Regionale.svg";
  } else if (tipo === "IC") {
    return "https://upload.wikimedia.org/wikipedia/commons/8/86/Treno_Intercity.svg";
  } else if (categoriaDescrizione === "FA" || categoriaDescrizione === "FR") {
    return "https://nglcila.com/av.gif";
  } else if (tipo === "ICN") {
    return "https://nglcila.com/icn.gif";
  } else if (
    (["MILANO CENTRALE", "MILANO PORTA GARIBALDI"].includes(partenza) && 
    ["TORINO PORTA NUOVA", "BOLOGNA CENTRALE", "VENEZIA", "BRESCIA", "GENOVA", "ROMA TERMINI", "ROMA TIBURTINA", "ROMA FIUMICINO AEROPORTO"].includes(destinazione)) || 
    (["TORINO PORTA NUOVA", "BOLOGNA CENTRALE", "VENEZIA", "BRESCIA", "GENOVA", "ROMA TERMINI", "ROMA TIBURTINA", "ROMA FIUMICINO AEROPORTO"].includes(partenza) && 
    ["MILANO CENTRALE", "MILANO PORTA GARIBALDI"].includes(destinazione))
  ) {
    return "https://upload.wikimedia.org/wikipedia/commons/7/7e/Simbolo_Treno_Regionale_Veloce.svg";
  }
  return "https://nglcila.com/av.gif";
};

export { getRegion, getDepartures, getTrainIcon, getTrainTypeIcon, stazioniGenova, stazioniSpeciali, stazioniLombardia };



