import { localeDate } from './data.js';

export const MeetupInfo = {
  template: `<ul class="info-list">
      <li v-if="meetup.organizer">
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{meetup.organizer}}
      </li>
      <li v-if="meetup.place">
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{meetup.place}}
      </li>
      <li v-if="meetup.date">
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="meetup.date">{{localeDate}}</time>
      </li>
    </ul>`,

  props: {
    meetup: Object,
  },

  computed: {
    localeDate() {
      return localeDate(this.meetup.date);
    },
  },
};
