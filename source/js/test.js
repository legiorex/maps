function fn(coords){
    let placemarks = new ymaps.Placemark(coords, {
        balloonContent: 'Это новая точка'
    }, {
        preset: 'islands#icon',
        iconColor: '#0095b6'

    })

    return placemarks;
}


// Создаем кластер

let clusterer = new ymaps.Clusterer({
    // Используем макет балуна кластера "карусель"
    clusterBalloonContentBodyLayout: "cluster#balloonCarouselContent",
    // Используем собственный подмакет для отображения информации о геообъекте
    clusterBalloonContentItemLayout: ClusterBalloonContentItemLayout,
    // Устанавливаем ограничение на количество элементов в нижней панели
    clusterBalloonPagerSize: 5,

    // Установка внешнего вида нижней панели.
    // Режим marker рекомендуется использовать с небольшим количеством элементов.
    // clusterBalloonPagerType: 'marker',

    clusterBalloonWidth: 220
});



clusterer.add(fn());
myMap.geoObjects.add.add(clusterer);

ClusterBalloonContentItemLayout = ymaps.templateLayoutFactory.createClass([
    '<div class=entry>',
    '<div class=bold>$[item.place]</div>',
    '<div>$[item.review]</div>',
    '<div class=author>$[item.date]</div>',
    '</div>'
].join(''));

{
    "type": "Feature",
    "id": 0,
    "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]},
    "properties": {
        "balloonContentHeader": "<font size=3><b><a target='_blank' href='https://yandex.ru'>Здесь может быть ваша ссылка</a></b></font>",
        "balloonContentBody": "<p>Ваше имя: <input name='login'></p><p><em>Телефон в формате 2xxx-xxx:</em>  <input></p><p><input type='submit' value='Отправить'></p>",
        "balloonContentFooter": "<font size=1>Информация предоставлена: </font> <strong>этим балуном</strong>",
        "clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
        "hintContent": "<strong>Текст  <s>подсказки</s></strong>"}}
