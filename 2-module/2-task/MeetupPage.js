import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div v-cloak>
    <meetup-view v-if="!isLoading && meetup" :meetup="meetup"></meetup-view>
    <div v-else-if="isLoading">...loading</div>
    <div v-else>no data</div>
  </div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      isLoading: false,
      meetup: null,
    };
  },

  mounted() {
    this.loadMeetup();
  },

  methods: {
    async loadMeetup() {
      let meetup;

      this.isLoading = true;

      try {
        meetup = await fetchMeetup(MEETUP_ID);
      } catch (error) {
        this.isLoading = false;
        console.error(error);

        return;
      }

      this.meetup = meetup || null;
      this.isLoading = false;
    },
  },
};
