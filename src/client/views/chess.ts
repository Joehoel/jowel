import Vue from "vue";

import "@client-styles/main.scss";

import Chess from "@client-views/Chess.vue";

new Vue({
	el: "body",
	render: h => h(Chess),
});
