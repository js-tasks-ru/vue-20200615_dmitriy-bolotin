import { agendaItemTitles, agendaItemIcons } from './data.js';

/**
 * Возвращает ссылку на изображение иконки события митапа
 * @param agendaItem - объект с описанием события митапа (и параметром type - тип митапа)
 * @return {string} - ссылка на изображение иконки митапа
 */
export const createIconLink = (agendaItem) =>
  `/assets/icons/icon-${agendaItemIcons[agendaItem.type]}.svg`;

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="iconLink" />
      </div>
      <div class="meetup-agenda__item-col" v-if="agendaItem.startsAt && agendaItem.endsAt">
        {{agendaItem.startsAt}} - {{agendaItem.endsAt}}
      </div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{title}}</h5>
        <p v-if="agendaItem.type === 'talk'">
          <span>{{agendaItem.speaker}}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{agendaItem.language}}</span>
        </p>
        <p v-if="agendaItem.description">{{agendaItem.description}}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    title() {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
    },

    iconLink() {
      return createIconLink(this.agendaItem);
    },
  },
};
