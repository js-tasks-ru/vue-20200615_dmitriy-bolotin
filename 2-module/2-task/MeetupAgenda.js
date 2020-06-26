import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item v-for="agendaItem in agenda" :agenda-item="agendaItem" :key="agendaItem.id"></meetup-agenda-item>
    </div>`,

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: Array,
  },
};
