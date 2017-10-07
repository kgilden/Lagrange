# Kristen Gilden's personal blog

## Build instructions

```
$ export JEKYLL_VERSION=3.6
$ docker run \
    --rm \
    --volume=$PWD:/srv/jekyll \
    -it jekyll/jekyll:$JEKYLL_VERSION \
    jekyll build --draft --watch
```
