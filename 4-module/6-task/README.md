# Работа с query параметрами

Задача состоит в том, чтобы синхронизировать значение некоторых параметров со значением `query` параметров в обе стороны.

Первое, что поможет решить задачу -- это отслеживание `query` с помощью `watch`. Тут нужно помнить, что отслеживание может быть не только за свойством компонента, но и за глубокими свойствами свойства. Достаточно назвать функцию (или объект) отслеживания строкой с путём до отслеживаемого свойства. А добавление свойства `immediate: true` реализует инициализацию компонента со значениями из `query`. Можно также использовать отслеживание целиком за всем `$route`.

Второе проще, надо добавить обработчик всех событий вида `@update:prop`, который будет обновлять `query` через метод `$router.replace({ query: newQuery })` или `push`. Это может быть как обработчик с параметром - названием обновляемого параметра, так и универсальный метод, обновляющий весь `query`.

Нужно также учитывать, что значения по умолчанию требуется убирать из `query`.

Методы `Object.keys`, `Object.entries` и `Object.fromEntries` могут помощь генерировать объекты и сделать код более универсальным. Хотя параметров всего 4, и можно изменять их явно.

```vue
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
```
