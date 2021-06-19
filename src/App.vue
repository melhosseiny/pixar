<template>
  <div
    :class="$style.app"
    @click="clickOutside($event)"
  >
    <v-side-nav
      id="sidenav"
      :active="showSideNav"
    >
      <router-link
        class="btn"
        to="/movies"
      >
        Movies
      </router-link>
      <router-link
        class="btn"
        to="/docs"
      >
        Docs
      </router-link>
    </v-side-nav>
    <v-app-bar
      class="app-bar"
      :class="$style.appBar"
      app-name="Pixar"
      :clickable-logo="$route.path !== '/'"
    >
      <v-nav :class="$style.appNav">
        <router-link
          to="/movies"
          class="btn"
        >
          Movies
        </router-link>
        <router-link
          to="/docs"
          class="btn"
        >
          Docs
        </router-link>
        <a
          id="hamburger"
          :class="[$style.hamburger, 'btn']"
          href="#"
          @click.stop.prevent="toggleSideNav()"
        >
          <i class="material-icons">menu</i>
        </a>
      </v-nav>
    </v-app-bar>
    <main :class="$style.main">
      <router-view />
    </main>
    <footer :class="$style.footer">
      Made with <i class="material-icons">favorite_border</i>
    </footer>
  </div>
</template>

<script>
import {
  VAppBar,
  VNav,
  VSideNav
} from "@melhosseiny/vue-aurora";

import { gql } from "@apollo/client/core";

export default {
  components: {
    VAppBar,
    VNav,
    VSideNav
  },
  apollo: {
    config: {
      query: gql`query GetConfig {
        config {
          baseUrl
        }
      }`,
      error(error) {
        this.$toast({ message: error });
      }
    }
  },
  data() {
    return {
      showSideNav: false
    }
  },
  methods: {
    toggleSideNav() {
      this.showSideNav = !this.showSideNav;
    },
    clickOutside(event) {
      if (event.target.closest('a') && event.target.closest('a').getAttribute("href") === "#") {
        event.preventDefault();
      }
      if (this.showSideNav && (!event.target.closest('#sidenav') || event.target.closest('#sidenav a'))) {
        this.showSideNav = false;
      }
    },
  }
}
</script>

<style module>
@custom-media --sm-viewport (max-width: 30em);
@custom-media --gt-sm-viewport (min-width: 30em);

/* Layout */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

.app-bar {
  color: rgb(var(--background-color));

  & .app-nav {
    & a:not(.hamburger) {
      @media (--sm-viewport) {
        display: none;
      }
    }

    & a.hamburger {
      min-width: auto;

      @media (--gt-sm-viewport) {
        display: none;
      }

      @media (--sm-viewport) {
        display: block;
      }
    }
  }
}

.footer {
  padding: 0.5em 1em;
  background-color: rgb(var(--text-color));
  color: rgb(var(--background-color));

  & i {
    vertical-align: middle;
    margin-top: -4px;
  }
}

:global(.line-clamp) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
