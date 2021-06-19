<template>
  <div :class="{ ['always-visible']: dense }">
    <article
      v-if="$apollo.loading"
      :class="{ [$style.movie]: true, [$style.dense]: dense }"
      :style="{
        '--backdrop': 'linear-gradient(90deg, hsla(225, 68%, 15%, 1), hsla(225, 68%, 15%, 1))'
      }"
    >
      <div :class="$style.mockInfo">
        <div :class="$style.poster" />
        <div :class="$style.meta">
          <div :class="[$style.item, $style.header]" />
          <div :class="$style.item" />
          <div :class="$style.item" />
          <div :class="$style.item" />
        </div>
      </div>
    </article>
    <article
      v-if="!$apollo.loading && config && movie"
      :class="{ [$style.movie]: true, [$style.dense]: dense }"
      :style="{
        '--backdrop': movie.backdropPath
          ? `url(${config.baseUrl}original${movie.backdropPath})`
          : 'linear-gradient(90deg, hsla(225, 68%, 15%, 1), hsla(225, 68%, 15%, 1))'
      }"
    >
      <div :class="$style.info">
        <img
          v-if="movie.posterPath"
          :class="$style.poster"
          :src="`${config.baseUrl}w185${movie.posterPath}`"
          :alt="`${movie.title} poster`"
          width="185"
          height="278"
        >
        <div
          v-else
          :class="$style.poster"
        />
        <div :class="$style.meta">
          <small class="line-clamp">
            <span v-if="movie.releaseDate">{{ movie.releaseDate | date({ day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
            <span v-else>Unknown</span>
            <template v-for="company in movie.productionCompanies">
              <span
                :key="company.id"
                :class="$style.middot"
              >&middot;</span>
              <span :key="company.id">{{ company.name }}</span>
            </template>
          </small>
          <h1 :class="{ ['type--body']: dense }">
            <a
              :href="movie.homepage"
              target="_blank"
              rel="noreferrer"
            >{{ movie.title }}</a>
          </h1>
          <h2
            class="type--body"
            :class="{ [$style.tagline]: true, ['line-clamp']: dense }"
          >
            {{ movie.tagline }}
          </h2>
          <div
            class="line-clamp"
            :class="$style.overview"
          >
            {{ movie.overview }}
          </div>
        </div>
      </div>
      <button
        :class="$style.leftButton"
        @click="$emit('prev')"
      >
        <i class="material-icons">keyboard_arrow_left</i>
      </button>
      <button
        :class="$style.rightButton"
        @click="$emit('next')"
      >
        <i class="material-icons">keyboard_arrow_right</i>
      </button>
      <i
        class="material-icons"
        :class="$style.moreIndicator"
      >arrow_downward</i>
    </article>
  </div>
</template>

<script>
import { gql } from "@apollo/client/core";

export default {
  name: "Movie",
  apollo: {
    config: {
      query: gql`query GetConfig {
        config @client {
          baseUrl
        }
      }`,
      error(error) {
        this.$toast({ message: error });
      }
    },
    movie: {
      query: gql`query GetMovieById($id: ID!) {
        movie(id: $id) {
          id
          title
          homepage
          overview
          releaseDate
          productionCompanies {
            name
          }
          tagline
          posterPath
          backdropPath
        }
      }`,
      variables() {
        return {
          id: this.id
        }
      },
      error(error) {
        this.$toast({ message: error });
      }
    }
  },
  props: {
    id: {
      type: Number,
      default: 508439
    }
  },
  data() {
    return {
      dense: false
    }
  },
  mounted() {
    const appBar = document.querySelector('.app-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.dense = !entry.isIntersecting;
      })
    }, {
      threshold: 1.0
    })
    observer.observe(appBar);
    this.observer = observer;
  },
  destroyed() {
    const appBar = document.querySelector('.app-bar');
    this.observer.unobserve(appBar);
  }
}
</script>

<style module>
@custom-media --md-viewport (max-width: 60em);
@custom-media --short-viewport (max-height: 600px);

@keyframes pulse {
  0% { opacity: 0.75; }
  50% { opacity: 1; }
  100% { opacity: 0.75; }
}

.movie {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 38.2vh;
  background-image:
    linear-gradient(
      80deg,
      rgba(var(--primary-color), 1) 38.2%,
      rgba(var(--primary-color), 0) 100%
    ),
    var(--backdrop);
  background-color: rgb(var(--primary-color));
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  transition: min-height 0.5s ease;

  & .leftButton,
  & .rightButton {
    position: absolute;
    top: 0;
    height: 100%;
    background: none;
    border: 0;
    border-radius: 0;
    color: rgb(var(--background-color));
    margin: 0;
    padding: 0;
    min-width: 3rem;

    & :global(.material-icons) {
      font-size: 33px;
      transition: font-size 0.3s ease;
    }

    &:hover :global(.material-icons) {
      font-size: 42px;
    }
  }

  & .leftButton {
    left: 0;

    &:hover {
      background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(var(--primary-color), 0.2));
    }
  }

  & .rightButton {
    right: 0;

    &:hover {
      background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(var(--primary-color), 0.2));
    }
  }

  & .more-indicator {
    display: none;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: rgba(var(--background-color), 0.5);
  }
}

.info {
  display: flex;
  align-items: flex-start;
  margin: 1rem;
  color: rgb(var(--background-color));
}

.poster {
  margin: 3rem;
  box-shadow: 0 2px 10px 0 rgba(var(--text-color), 0.2);
  height: auto;
  min-width: 185px;
  min-height: 278px;
  background-color: rgb(var(--soul-g));
}

.meta {
  display: flex;
  max-width: 38em;
  margin-top: 3rem;
  margin-right: 3rem;
  flex-direction: column;
  justify-content: flex-start;

  & h1 {
    font-weight: bold;
    margin-top: 0;
    letter-spacing: 0.05em;

    & a {
      color: rgb(var(--background-color));
    }
  }

  & .overview {
    font-weight: 200;
    margin-top: 1rem;
    color: rgba(var(--background-color), 0.9);
    -webkit-line-clamp: 3;
  }

  & small {
    color: rgba(var(--background-color), 0.8);
    font-variant-caps: all-small-caps;
    -webkit-line-clamp: 1;
  }
}

.middot {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.mock-info {
  --spacing-half: 8px;
  --spacing: 16px;

  display: flex;
  align-items: flex-start;
  margin: 1rem;

  & .poster,
  & .item {
    background-color: rgba(var(--background-color), 0.1);
    animation: pulse 1000ms linear infinite forwards;
  }

  & .meta {
    width: 38em;
    max-width: 320px;
  }

  & .item {
    display: flex;
    flex: 0 0 auto;
    width: 100%;
    height: var(--spacing-half);
    margin-bottom: var(--spacing);

    &.header {
      flex: 0 0 auto;
      width: 50%;
      height: var(--spacing);
    }
  }
}

.movie.dense {
  min-height: 0;
  height: auto;
  justify-content: flex-start;

  & .info,
  & .mock-info {
    flex-direction: row;
    align-items: flex-start;
    margin: 1rem 3rem;
    margin-left: calc(7rem + 185px);
  }

  & .mock-info {
    --spacing-half: 4px;
    --spacing: 8px;

    & .meta .item:nth-child(3) {
      display: none;
    }
  }

  & .meta {
    margin: 0;
  }

  & .poster {
    width: 50px;
    min-width: 50px;
    min-height: 75px;
    margin: 0;
    margin-right: 1rem;
  }

  & .overview {
    display: none;
  }

  & .tagline {
    -webkit-line-clamp: 1;
  }

  & .more-indicator {
    display: none;
  }
}

@media (--md-viewport) {
  .movie {
    min-height: calc(100vh - 42px);
    height: calc(100vh - 42px);
    justify-content: center;
    background-image:
      linear-gradient(
        80deg,
        rgba(var(--primary-color), 1) 62.8%,
        rgba(var(--primary-color), 0) 100%
      ),
      var(--backdrop);

    & .more-indicator {
      display: block;
    }
  }

  .info,
  .mock-info {
    flex-direction: column;
    align-items: center;
  }

  .meta {
    margin: 2rem;
    margin-top: 0;
  }

  .mock-info .meta {
    max-width: 240px;
  }

  .movie.dense .mock-info .meta {
    max-width: 160px;
  }
}

@media (--md-viewport) and (--short-viewport) {
  .poster {
    width: 140px;
    min-width: 140px;
    min-height: 210px;
  }

  .meta h1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }

  .overview {
    display: none;
  }
}

@media (max-width: 1107px) {
  .movie.dense {
    & .info,
    & .mock-info {
      margin-left: 3rem;
    }
  }
}
</style>
