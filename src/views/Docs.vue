<template>
  <article :class="$style.doc">
    <v-markdown path="/docs/about.md" />
  </article>
</template>

<script>
import { VMarkdown } from "@melhosseiny/vue-aurora";

export default {
  name: "Docs",
  components: {
    VMarkdown
  }
}
</script>

<style module>
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

.doc {
  margin-left: 1rem;
  margin-right: 1rem;
  max-width: 38em;

  & :--heading {
    margin-bottom: 1rem;
  }

  & :any-link {
    color: rgb(var(--accent-color));
  }
}

pre {
  margin-bottom: 1em;
  background-color: rgba(var(--text-color), 0.07);
  padding: 0.5em;
  overflow: auto;
}

article img,
article video {
  display: block;
  max-width: 100%;
  box-sizing: border-box;
}
</style>
