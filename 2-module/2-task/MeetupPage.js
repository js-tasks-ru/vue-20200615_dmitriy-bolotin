import { MeetupView } from './MeetupView.js';
import {
  MEETUP_ID,
  fetchMeetup,
  createIconLink,
  localeDate,
  agendaItemTitles,
} from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div v-cloak>
    <meetup-view :meetup="meetup" v-if="!isLoading && meetup"></meetup-view>
    <div v-else-if="isLoading">...loading</div>
    <div v-else>no data</div>
  </div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      isLoading: false,
      meetupRaw: null,
    };
  },

  computed: {
    meetup() {
      if (!this.meetupRaw) {
        return;
      }

      return {
        ...this.meetupRaw,
        localeDate: localeDate(this.meetupRaw.date),
        normalizedAgenda: this.meetupRaw.agenda.map((agendaItem) => ({
          ...agendaItem,
          title: agendaItem.title || agendaItemTitles[agendaItem.type],
          iconLink: createIconLink(agendaItem),
          isTalk: agendaItem.type === 'talk',
        })),
      };
    },
  },

  mounted() {
    this.loadMeetupRaw();
  },

  methods: {
    async loadMeetupRaw() {
      let meetupRaw;

      this.isLoading = true;

      try {
        meetupRaw = await fetchMeetup(MEETUP_ID);
      } catch (error) {
        this.isLoading = false;
        console.error(error);

        return;
      }

      this.meetupRaw = meetupRaw;
      this.isLoading = false;
    },
  },
};
