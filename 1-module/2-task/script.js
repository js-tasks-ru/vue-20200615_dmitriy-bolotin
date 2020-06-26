import Vue from '/vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  const { imageId } = meetup;

  return imageId ? `${API_URL}/images/${imageId}` : undefined;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
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
const agendaItemIcons = {
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
const localeDate = (date) =>
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
const createIconLink = (agendaItem) =>
  `/assets/icons/icon-${agendaItemIcons[agendaItem.type]}.svg`;

export const app = new Vue({
  el: '#app',

  data: {
    isLoading: false,
    meetupRaw: null,
  },

  mounted() {
    this.loadMeetupRaw();
  },

  computed: {
    meetup() {
      if (!this.meetupRaw) {
        return;
      }

      return {
        ...this.meetupRaw,
        localeDate: localeDate(this.meetupRaw.date),
        coverLink: getMeetupCoverLink(this.meetupRaw),
        normalizedAgenda: this.meetupRaw.agenda.map((agendaItem) => ({
          ...agendaItem,
          title: agendaItem.title || agendaItemTitles[agendaItem.type],
          iconLink: createIconLink(agendaItem),
          isTalk: agendaItem.type === 'talk',
        })),
      };
    },
  },

  methods: {
    async loadMeetupRaw() {
      let meetupRaw;

      this.isLoading = true;

      try {
        const response = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);
        meetupRaw = await response.json();
      } catch (error) {
        this.isLoading = false;
        console.error(error);

        return;
      }

      this.meetupRaw = meetupRaw;
      this.isLoading = false;
    },
  },
});
