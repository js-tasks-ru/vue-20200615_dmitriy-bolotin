/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
export const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
export function getMeetupCoverLink(meetup) {
  return meetup.imageId ? `${API_URL}/images/${meetup.imageId}` : undefined;
}

/**
 * Получает данные митапа по его ID с API
 * @param {Number} id
 * @return {Promise}
 */
export async function fetchMeetup(id) {
  return fetch(`${API_URL}/meetups/${id}`).then((res) => res.json());
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
export const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

/**
 * Возвращает локализованную дату митапа
 * @param date - timestamp даты митапа
 * @returns {string} - локализованная дата
 */
export const localeDate = (date) =>
  new Date(date).toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/**
 * Возвращает ссылку на изображение иконки события митапа
 * @param agendaItem - объект с описанием события митапа (и параметром type - тип митапа)
 * @return {string} - ссылка на изображение иконки митапа
 */
export const createIconLink = (agendaItem) =>
  `/assets/icons/icon-${agendaItemIcons[agendaItem.type]}.svg`;