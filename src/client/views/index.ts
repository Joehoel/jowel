import Vue from "vue";

import "@client-styles/main.scss";

import Index from "@client-views/index.vue";

new Vue({
	el: "body",
	render: h => h(Index),
});
