import Vue from "vue";

import "@client-styles/main.scss";

import Snake from "@client-views/Snake.vue";

new Vue({
	el: "body",
	render: h => h(Snake),
});
