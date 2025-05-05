Пример результата: https://gtitov.github.io/martin-maplibre-map/#6/55/37

# Загрузка данных в бд

Через QGIS загрузить в бд postgres+postgis (смотри docker-compose.yaml) содержимое следующих файлов:

- `files/grid.zip`
- `files/oikonyms.zip`

Еще варианты как можно загрузить данные:

- [Loading Data into PostGIS: An Overview](https://www.crunchydata.com/blog/loading-data-into-postgis-an-overview)
- geopandas на питоне

# Запуск мартина

![](./files/img/tiles_description.png)

Для генерации векторных тайлов используем сервер векторных тайлов Martin.  
Загрузим это приложение [отсюда](https://github.com/maplibre/martin/releases).

```shell
martin postgresql://postgres:password@localhost:5432/oikonyms
```

Output:

```
...
[2025-05-05T17:46:06Z INFO  martin::pg::builder] Auto-publishing functions in schemas [] as '{function}' sources
[2025-05-05T17:46:06Z INFO  martin] Use --save-config to save or print Martin configuration.
[2025-05-05T17:46:06Z INFO  martin] Martin has been started on 0.0.0.0:3000.
[2025-05-05T17:46:06Z INFO  martin] Use http://0.0.0.0:3000/catalog to get the list of available sources.
[2025-05-05T17:46:06Z INFO  martin] Web UI is disabled. Use `--webui enable-for-all` in CLI or a config value to enable it for all connections.
```

На последней строчке увидим, что каталог слоёв доступен по адресу `http://0.0.0.0:3000/catalog`, то есть по IP адресам компьютера. Мы воспользуемся нашим любимым localhost (другие обычно и недоступны).

Перейдём по адресу `localhost:3000/catalog`, чтобы увидеть доступные наборы векторных тайлов. Их должно быть два по количеству пространственных таблиц в базе данных.

По адресам `localhost:3000/grid` и `localhost:3000/oikonyms` доступны описания наборов векторных тайлов в формате TileJSON. Наиболее существенным в нём является указание адреса, по которому доступны векторные тайлы — `localhost:3000/grid/{z}/{x}/{y}`

> `/catalog`, `/grid`, `/grid/{z}/{x}/{y}` — это всё эндпоинты API, которое для нас автоматически формирует Martin. Он же выполняет нужные серверные функции, за счёт которых мы получаем ответы, обращаясь к этим эндпоинтам. И ничего не пришлось писать самим, как в прошлом упражнении!

# Дополнительная информация

- TileJSON 3.0.0 / TileJSON [ссылка](https://github.com/mapbox/tilejson-spec/blob/master/3.0.0/README.md)
- Vector tiles standards / Mapbox [ссылка](https://docs.mapbox.com/data/tilesets/guides/vector-tiles-standards/)
