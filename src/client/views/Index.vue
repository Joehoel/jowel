<template>
<body>
	<TextBox class="text-box" :text="`Welcome!`" />
</body>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import TextBox from "@client-components/TextBox.vue";

@Component({
	components: { TextBox },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
