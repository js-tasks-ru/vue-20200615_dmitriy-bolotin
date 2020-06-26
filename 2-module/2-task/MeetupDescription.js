export const MeetupDescription = {
  name: 'MeetupDescription',

  template: `<p class="meetup-description" v-if="description">{{description}}</p>`,

  props: {
    description: String,
  },
};
