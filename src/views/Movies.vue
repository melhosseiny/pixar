<template>
  <div>
    <v-progress-linear v-if="$apollo.loading" />
    <div v-if="config && movies && movies.movies">
      <Movie
        :id="movieId"
        @prev="prevMovie()"
        @next="nextMovie()"
      />
      <div :class="$style.movies">
        <a
          v-for="(movie, index) in movies.movies"
          :key="movie.id"
          :class="{ [$style.movie]: true, [$style.active]: movieId === +movie.id }"
          href="#"
          @click="selectMovie(movie.id, index)"
        >
          <article>
            <img
              v-if="movie.posterPath"
              :class="$style.poster"
              loading="lazy"
              :src="`${config.baseUrl}w92${movie.posterPath}`"
              :alt="`${movie.title} poster`"
              width="92"
              height="138"
            >
            <div
              v-else
              :class="$style.poster"
            />
            <div :class="$style.meta">
              <h1 class="type--body line-clamp">
                <span>{{ movie.title }}</span>
                <span
                  v-if="movie.releaseDate"
                  :class="$style.year"
                >{{ movie.releaseDate | date({ year: 'numeric' }) }}</span>
              </h1>
              <h2 class="type--body">
                <progress
                  :value="movie.score"
                  max="10"
                />
              </h2>
            </div>
            <div :class="$style.score">
              {{ movie.score | round }}
            </div>
          </article>
        </a>
        <div :class="$style.pagination">
          <a
            v-if="movies.page > 1"
            class="btn"
            href="#"
            @click="gotoPage(page-1)"
          >Prev</a>
          <a
            v-if="movies.hasNextPage"
            class="btn"
            href="#"
            @click="gotoPage(page+1)"
          >Next</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from "@apollo/client/core";

import Movie from "@/components/Movie.vue";
import { VProgressLinear } from "@melhosseiny/vue-aurora";

export default {
  name: "Movies",
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
    movies: {
      query: gql`query GetMovies($page: Int) {
        movies(page: $page) {
          page
          hasNextPage
          totalPages
          totalResults
          movies {
            id
            title
            releaseDate
            score
            posterPath
          }
        }
      }`,
      variables() {
        return {
          page: this.page
        }
      },
      result({ data, error }) {
        if (error) {
          this.$toast({ message: error });
          return;
        }
        if (this.resultIndex === -1) {
          this.resultIndex = data.movies.movies.length - 1;
        } else {
          this.resultIndex = 0;
        }
        this.movieId = +data.movies.movies[this.resultIndex].id;
      }
    }
  },
  components: {
    Movie,
    VProgressLinear
  },
  data() {
    return {
      movieId: undefined,
      resultIndex: 0,
      page: 1
    }
  },
  methods: {
    selectMovie(movieId, index) {
      this.movieId = +movieId;
      this.resultIndex = index;
    },
    gotoPage(page) {
      if (!this.$apollo.loading) {
        this.page = page;
      }
    },
    nextPage() {
      if (this.movies.hasNextPage) {
        this.gotoPage(this.page + 1);
      }
    },
    prevPage() {
      if (this.movies.page > 1) {
        this.gotoPage(this.page - 1);
      }
    },
    nextMovie() {
      if (this.resultIndex === this.movies.movies.length - 1) {
        this.nextPage();
        return;
      }
      this.resultIndex++;
      this.movieId = +this.movies.movies[this.resultIndex].id;
    },
    prevMovie() {
      if (this.resultIndex === 0) {
        if (this.movies.page > 1) {
          this.resultIndex--;
          this.prevPage();
        }
        return;
      }
      this.resultIndex--;
      this.movieId = +this.movies.movies[this.resultIndex].id;
    }
  }
}
</script>

<style module>
@custom-media --sm-viewport (max-width: 30em);

:global(.always-visible) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.movies {
  padding: 2rem 3rem;
  margin-left: calc(4rem + 185px);
}

:global(.always-visible) + .movies {
  margin-top: 108px;
}

.movie {
  display: flex;
  background: var(--soul);
  border: 1px solid var(--soul-hl);
  box-shadow: var(--soul-shadow);
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 4px 8px;
  max-width: 38em;

  &.active,
  &:hover {
    border: 1px solid rgba(var(--soul-b), 0.75);
    text-decoration: none;
  }

  & article {
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
  }

  & .poster {
    width: 33px;
    height: auto;
    min-width: 33px;
    min-height: 49.5px;
    margin-right: 8px;
    background-color: rgb(var(--soul-g));
  }

  & .meta {
    flex-grow: 1;
    width: 0;
  }

  & .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 49.5px;
    margin-left: 8px;
    flex-basis: 49.5px;
    flex-shrink: 0;
    height: 49.5px;
    background-color: rgb(var(--background-color));
    color: rgb(var(--text-color));
    border-radius: 3px;
  }

  & .year {
    color: rgba(var(--text-color), 0.5);
    margin-left: 4px;
  }

  & h1,
  & h2 {
    color: rgb(var(--text-color));
  }

  & h1 {
    font-weight: normal;
    margin-top: 0;
    -webkit-line-clamp: 1;
  }

  & h2 {
    display: inline-flex;
    align-items: center;
    font-weight: 200;
  }
}

progress {
  appearance: none;
  border: none;
  height: 12px;
  margin-right: 4px;
  width: auto;
  min-width: 8rem;
}

progress,
progress::-webkit-progress-bar {
  border-radius: 3px;
  background-color: rgb(var(--background-color));
}

progress::-webkit-progress-value {
  border-radius: 3px;
  background: var(--sky);
}

progress::-moz-progress-bar {
  border-radius: 3px;
  background: var(--sky);
}

.pagination {
  & :global(.btn + .btn) {
    margin-left: 8px;
  }
}

@media (--sm-viewport) {
  progress {
    min-width: 6rem;
  }
}

@media (max-width: 1107px) {
  .movies {
    margin-left: 0;
  }
}
</style>
