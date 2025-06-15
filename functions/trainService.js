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
        return "data:image/gif;base64,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";
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

  if (tipo === "REG" && numeroTreno && numeroTreno.toString().length === 4) {
    if (codiceCliente === 63) {
      return "https://upload.wikimedia.org/wikipedia/commons/2/22/Icona_Regio_Express.png";
    }
    return "https://upload.wikimedia.org/wikipedia/commons/7/7e/Simbolo_Treno_Regionale_Veloce.svg";
  } else if (tipo === "REG" && numeroTreno && numeroTreno.toString().length === 5) {
    return "https://www.lefrecce.it/Channels.Website.WEB/web/images/logo/REnoTI.svg";
  } else if (tipo === "IC") {
    return "data:image/gif;base64,R0lGODlhRAArAIcAAAAAAACK2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAgAAACwAAAAARAArAAAI9gABBBgYAIDBgwgTKhRIsGHBhRAjLnQoMaLDiw0ralR4ceNBjCAzetTYcWPIkyJHQixZEaXLgSotEjQJcmXImDgR3mxZMydOjCp7+vQI9GfKoSRZGn2I9GhCpTmZDqU4kSrSqwatPnWKdSpXhl+7LoXJMazYmFqzpj0bletatmOlqp0Jt6lbs3Vp0tWJNy/PvR/7+pUJeC7ZwWjvFkas93DgxYz/OjYsN7Lkym8t21wMVfPmyZQ9J4WcWfRj0GAhmw5dVfXqzJ1Xj4wdVHPRtpX93p5dGq7Q0b3Z7iRMWzfK079tvzwuO/Vy156fC46+vDnR4EgDAgA7";
  } else if (categoriaDescrizione === "FA" || categoriaDescrizione === "FR") {
    return "https://nglcila.com/av.gif";
  } else if (tipo === "ICN") {
    return "https://nglcila.com/icn.gif";
  } else if (
    (["MILANO CENTRALE", "MILANO PORTA GARIBALDI"].includes(partenza) && 
    regionaliVelociDestinazioni.includes(destinazione)) || 
    (regionaliVelociDestinazioni.includes(partenza) && 
    ["MILANO CENTRALE", "MILANO PORTA GARIBALDI"].includes(destinazione))
  ) {
    return "https://upload.wikimedia.org/wikipedia/commons/7/7e/Simbolo_Treno_Regionale_Veloce.svg";
  }
  return "https://nglcila.com/av.gif";
};

export { getRegion, getDepartures, getTrainIcon, getTrainTypeIcon, stazioniGenova, stazioniSpeciali, stazioniLombardia };



