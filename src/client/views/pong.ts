import Vue from "vue";

import "@client-styles/main.scss";

import Pong from "@client-views/Pong.vue";

new Vue({
	el: "body",
	render: h => h(Pong),
});
