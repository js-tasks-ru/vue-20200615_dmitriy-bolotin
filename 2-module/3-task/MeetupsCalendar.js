/**
 * Возвращает локализованный месяц, год
 * @param currentDate - объект Date текущего дня
 * @returns {string} - локализованная строка формата "month YYYY"
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
        <div
          v-for="day in calendar"
          :key="day.dateStr"
          :class="['rangepicker__cell', {'rangepicker__cell_inactive': day.notCurrentMonth}]">
          {{day.date}}
          <a class="rangepicker__event" v-if="day.meetups.length" v-for="meetup in day.meetups">{{meetup.title}}</a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    meetupsByDate() {
      return this.meetups.map((meetup) => {
        const { date, title } = meetup;
        const meetupDate = new Date(date);
        const dateStr = meetupDate.toDateString();

        return { title, dateStr };
      });
    },

    currentMonthYear() {
      return getLocaleCurrentMonthYear(this.currentDate);
    },

    currentYear() {
      return this.currentDate.getFullYear();
    },

    currentMonth() {
      return this.currentDate.getMonth();
    },

    calendar() {
      const monthStart = new Date(this.currentYear, this.currentMonth);
      const calStartDay = new Date(monthStart);
      const daysInCurrentMonth = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0,
      ).getDate();
      const weeksInCal = daysInCurrentMonth % 4 === 0 ? 4 : 5;

      // + 1 - начало месяца с понедельника
      calStartDay.setDate(monthStart.getDate() - monthStart.getDay() + 1);

      let week = 1;
      let dayCount = 0;
      const weeksArr = [];

      while (week <= weeksInCal) {
        const month = calStartDay.getMonth();
        const date = calStartDay.getDate();
        const notCurrentMonth = month !== this.currentMonth;
        const dateStr = calStartDay.toDateString();
        const meetups = this.meetupsByDate.filter(
          (meetup) => meetup.dateStr === dateStr,
        );

        weeksArr.push({ date, dateStr, notCurrentMonth, meetups });
        dayCount += 1;
        calStartDay.setDate(calStartDay.getDate() + 1);

        if (dayCount === 7) {
          week += 1;
          dayCount = 0;
        }
      }

      return weeksArr;
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
