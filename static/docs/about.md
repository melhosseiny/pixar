# GraphQL data graph

The [Apollo GraphQL](https://www.apollographql.com/) data graph is available at [`https://pixar-data-graph.vercel.app/graphql`](https://pixar-data-graph.vercel.app/graphql). I enabled the GraphQL playground so you can look at schema documentation and test out queries

## Queries

### Get movies by page (default = 1)

    query GetMovies($page: Int) {
      movies(page: $page) {
        page
        totalPages
        hasNextPage
        movies {
          id
          title
        }
      }
    }

#### Query variables

    {
      "page": 2
    }

### Get movie by id

    query GetMovie($id: ID!) {
      movie(id: $id) {
        title
        tagline
        backdropPath
      }
    }

#### Query variables

    {
      "id": 508439
    }

### Get config

    query GetConfig {
      config {
        baseUrl
      }
    }
