/**
 * Возвращает локализованную дату митапа
 * @returns {string} - локализованная дата
 */
export const getLocaleCurrentMonthYear = (currentDate) => {
  const localeMonth = currentDate.toLocaleString(navigator.language, {
    month: 'long',
  });

  const year = currentDate.getFullYear();

  return `${localeMonth} ${year}`;
};

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="decrementMonth"></button>
          <div>{{currentMonthYear}}</div>
          <button class="rangepicker__selector-control-right" @click="incrementMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell rangepicker__cell_inactive">28</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">29</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">30</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">31</div>
        <div class="rangepicker__cell">
          1
          <a class="rangepicker__event">Митап</a>
          <a class="rangepicker__event">Митап</a>
        </div>
        <div class="rangepicker__cell">2</div>
        <div class="rangepicker__cell">3</div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    currentMonthYear() {
      return getLocaleCurrentMonthYear(this.currentDate);
    },

    currentYear() {
      return this.currentDate.getFullYear();
    },

    currentMonth() {
      return this.currentDate.getMonth();
    },
  },

  methods: {
    incrementMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1);
    },

    decrementMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1);
    },
  },
};
