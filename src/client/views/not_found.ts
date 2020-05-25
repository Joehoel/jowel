import Vue from "vue";

import "@client-styles/main.scss";

import NotFound from "@client-views/NotFound.vue";

new Vue({
	el: "body",
	render: h => h(NotFound),
});
