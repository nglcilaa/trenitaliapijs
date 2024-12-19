// functions/fetchNewsRFI.js
import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URI = "http://www.viaggiatreno.it/infomobilita/resteasy/viaggiatreno";

const fetchNewsFromTicker = async () => {
  const url = `${BASE_URI}/infomobilitaTicker/`;
  try {
    const response = await axios.get(url, { timeout: 30000 });
    const $ = cheerio.load(response.data);
    const news = [];
    $('#accordionGenericInfomob .editModeCollapsibleElement').each((index, element) => {
      const title = $(element).find('.headingNewsAccordion').text().trim();
      const date = $(element).find('h4').text().trim();
      const content = $(element).find('.info-text').html().trim();
      news.push({ titolo: title, data: date, testo: content });
    });
    return news;
  } catch (error) {
    console.error('Errore nel recupero delle notizie dal ticker:', error);
    throw error;
  }
};

const fetchNewsFromRSS = async () => {
  const url = `${BASE_URI}/infomobilitaRSS/false`;
  try {
    const response = await axios.get(url, { 
      timeout: 30000,
    });
    console.log(response.data); // Logga i dati della risposta
    const $ = cheerio.load(response.data);
    const news = [];
    $('#accordionGenericInfomob .editModeCollapsibleElement').each((index, element) => {
      const title = $(element).find('.headingNewsAccordion').text().trim();
      const date = $(element).find('h4').text().trim();
      const content = $(element).find('.info-text').html().trim();
      news.push({ titolo: title, data: date, testo: content });
    });
    return news;
  } catch (error) {
    console.error('Errore nel recupero delle notizie dal RSS:', error);
    throw error;
  }
};

export { fetchNewsFromTicker, fetchNewsFromRSS };

