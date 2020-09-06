<template>
  <div class="container">
    <meetups-view
      :view.sync="query.view"
      :date.sync="query.date"
      :participation.sync="query.participation"
      :search.sync="query.search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const initialQueryObj = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};

export default {
  name: 'PageWithQuery',

  components: { MeetupsView },

  data() {
    return {
      query: {
        view: initialQueryObj.view,
        date: initialQueryObj.date,
        participation: initialQueryObj.participation,
        search: initialQueryObj.search,
      },
    };
  },

  watch: {
    query: {
      deep: true,
      handler(queryObj) {
        const newQueryObj = Object.fromEntries(
          Object.entries(queryObj).filter(
            ([key, value]) => initialQueryObj[key] !== value,
          ),
        );

        // push позволит возвращаться по истории переходов
        this.$router.push({path: '/', query: newQueryObj}).catch(error => {
          if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes('Avoided redundant navigation to current location')
          ) {
            console.log(error.message);
          }
        });
      },
    },

    '$route.query': {
      immediate: true,
      handler(updatedQueryObj) {
        this.query = Object.fromEntries(
          Object.keys(this.query).map(key => [
            key,
            updatedQueryObj[key] || initialQueryObj[key],
          ]),
        );
      },
    },
  },
};
</script>

<style scoped></style>
