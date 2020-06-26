import { MeetupView } from './MeetupView.js';
import {
  MEETUP_ID,
  fetchMeetup,
  createIconLink,
  localeDate,
  getMeetupCoverLink,
  agendaItemTitles,
} from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div><meetup-view></meetup-view></div>`,

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
