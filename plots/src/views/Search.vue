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
      {{ plot }}
    </div>
    <a-image
      style="margin-top: 25px"
      :width="200"
      :src="imgUrl"
      :preview="false"
      :placeholder="true"
    />
    <a-row>
      <a-spin
        size="large"
        v-if="classifying"
        class="center"
        style="margin-left: 25%; margin-top: 5%"
        :tip="classSpinner"
      />
    </a-row>
    <div v-if="!classifying && genre" class="center" style="margin-top: 5%">
      Genre: {{ genre }}
    </div>
    <div v-if="!classifying" class="center" style="margin-top: 5%">
      <div v-for="(item, index) in classes" :key="index">
        {{ item.label }}:{{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      searching: false,
      classifying: false,
      searchQuery: "",
      imgUrl: "",
      plot: "",
      genre: "",
      classes: null,
      classSpinner: "Classifying...",
    };
  },
  methods: {
    classification() {
      let me = this;
      me.classifying = true;
      axios({
        method: "get",
        url: "http://localhost:2020/",
        responseType: "json",
        params: {
          plot: this.plot,
        },
      })
        .then(function (response) {
          me.genre = response.data.genre;
          me.classes = response.data.classes;
          me.classifying = false;
        })
        .catch(function (err) {
          me.classSpinner = "Classifier Error. Check that server is still up.";
          console.log(err);
        });
    },
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
          plot: "full",
        },
      })
        .then(function (response) {
          me.plot = response.data.Plot;
          me.imgUrl = response.data.Poster;
          me.searching = false;
          if (response.data.Response !== "False") {
            me.classification();
          } else {
            me.genre = "";
            me.classes = null;
          }
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
