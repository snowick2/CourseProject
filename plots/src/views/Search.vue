<template>
  <div>
    <a-input-search
      placeholder="Search"
      style="width: 200px"
      @search="onSearch"
    />
    <a-row>
      <a-spin
        size="large"
        v-if="searching"
        class="center"
        style="margin-left: 25%; margin-top: 15%"
        tip="Loading..."
      />
    </a-row>
    <div v-if="!searching" class="center">
     {{plot}}
    </div>
    <a-image
        style="margin-top: 25px"
        :width="200"
        :src="imgUrl"
        :preview="false"
        :placeholder="true"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "search",
  data() {
    return {
      searching: false,
      searchQuery: "",
      imgUrl: "",
      plot: ""
    };
  },
  methods: {
    onSearch(val) {
      this.searchQuery = val;
      this.fetch();
    },
    fetch() {
      let me = this;
      me.searching = true;
      axios({
        method: "get",
        url: "http://www.omdbapi.com/?apikey=68557062",
        responseType: "json",
        params: {
          t: me.searchQuery,
          plot: "full"
        },
      })
        .then(function (response) {
          me.plot = response.data.Plot;
          me.imgUrl = response.data.Poster;
          me.searching = false;
        })
        .catch(function (err) {
          me.searching = false;
          console.log(err);
        });
    },
  },
};
</script>
<style>
.center {
  margin: auto;
  width: 50%;
}
</style>
