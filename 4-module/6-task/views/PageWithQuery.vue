<template>
  <div class="container">
    <meetups-view
      :date.sync="query.date"
      :participation.sync="query.participation"
      :search.sync="query.search"
      :view.sync="query.view"
      @update:date="queryUpdated"
      @update:view="queryUpdated"
      @update:participation="queryUpdated"
      @update:search="queryUpdated"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaults = {
  view: 'list',
  search: '',
  date: 'all',
  participation: 'all',
};

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      query: {
        date: defaults.date,
        participation: defaults.participation,
        search: defaults.search,
        view: defaults.view,
      },
    };
  },

  watch: {
    '$route.query': {
      immediate: true,
      handler(value) {
        this.query = Object.fromEntries(
          Object.keys(this.query).map((key) => [
            key,
            value[key] || defaults[key],
          ]),
        );
      },
    },
  },

  methods: {
    queryUpdated() {
      this.$router.replace({
        query: Object.fromEntries(
          Object.entries(this.query).filter(
            ([key, value]) => value !== defaults[key],
          ),
        ),
      });
    },
  },
};
</script>

<style scoped></style>
