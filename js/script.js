let map = null;
let mini_map = null;
let geocoder = null;
let select_marker = null;
let markers = [];
let markerClusterer = null; 
const imagePath = "../images/markers/marker-";

function set_markers_icons() {
    if(!markerClusterer){ return; }
    for(let i in markerClusterer.clusters_) {
        let markers = markerClusterer.clusters_[i].getMarkers();
        let persents = {};
        let colors = {};

        for(let j in markers) {
            if(!persents[markers[j].cat]) { persents[markers[j].cat] = 1; } 
            else { persents[markers[j].cat] += 1; }

            if(!colors[markers[j].cat]) { colors[markers[j].cat] = value_colors_hex[markers[j].cat]; }
        }

        persents = Object.values(persents);
        colors = Object.values(colors);

        for(let j in persents) {
            persents[j] /= markers.length;
        }

        console.log(persents);

        let url = create_icon({
            width: 44,
            height: 44,
            center: {
                x: 22,
                y: 22,
            },
            radius: 15,
            persents: persents,
            colors: colors
        });

        markerClusterer.clusters_[i].clusterIcon_.styles_ = [
            {
                url: url,
                height: 44,
                width: 44
            },
            {
                url: url,
                height: 44,
                width: 44
            },
            {
                url: url,
                height: 44,
                width: 44
            },
            {
                url: url,
                height: 44,
                width: 44
            },
            {
                url: url,
                height: 44,
                width: 44
            }
        ]

        
        markerClusterer.clusters_[i].updateIcon();
        
    }
}

MarkerClusterer.prototype.redraw = function() {
    set_markers_icons();

    this.createClusters_();
};

(function () {
    init_map();
    init_mini_map();
    init_theam();
    geocoder = new google.maps.Geocoder;

    init_select_marker();
    get_markers('all', bild_aside);
    get_count()
    init_events();

}());

function init_map() {
    map = new google.maps.Map(document.getElementById("googlemap"), {
        zoom: default_point.zoom,
        center: new google.maps.LatLng(default_point.lat, default_point.lng),
        scaleControl: true,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        streetViewControl: false,
        panControl: false,
        styles: map_styles.light
    });
}

function init_mini_map() {
    mini_map = new google.maps.Map(document.getElementById("mini-goglemap"), {
        zoom: default_point.zoom,
        center: new google.maps.LatLng(default_point.lat, default_point.lng),
        scaleControl: true,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        streetViewControl: false,
        panControl: false,
        styles: map_styles.light
    });
}

function init_select_marker(title = "Выбранное место") {
    select_marker = new google.maps.Marker({
        position: new google.maps.LatLng(default_point.lat, default_point.lng),
        icon: marker_images.orange,
        draggable: true,
        map: mini_map,
        animation: google.maps.Animation.DROP,
        title: title,
        autoCompl: document.getElementById('adres')
    });

    google.maps.event.addListener(select_marker, "dragend", function (icon) {
        renewAddress(select_marker);
    });

    let auto_comp = new google.maps.places.Autocomplete(document.getElementById('adres'));
    auto_comp.setTypes(["geocode"]);

    google.maps.event.addListener(auto_comp, "place_changed", function () {
        let place = auto_comp.getPlace();
        if(place.geometry != null) {
           setCenterAndZoom(mini_map, place.geometry.location, 16);
           select_marker.setPosition(place.geometry.location);
           renewAddress(select_marker);
        } 
    });

}

function init_markers(data) {

    for (i = 0; i < markers.length; i++) {
        markerClusterer.removeMarker(markers[i]);
        markers[i].setMap(null);
    }
    markers = [];

    data.forEach(function(item, i, arr) {
        let infowindow = new google.maps.InfoWindow();    

        let marker = new google.maps.Marker({
            position: {lat: parseFloat(item.lat), lng: parseFloat(item.lng)},
            map: map,
            title: item.author + " " + item.category,
            icon: marker_images[value_colors[item.categoryid]],
        }); 

        marker.cat = item.categoryid;

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function (marker, item) {
            return function () {
                this.setZIndex(2);

                infowindow.setContent(create_info_window(item.title, item.id));
                infowindow.open(map, marker);
            }
        })(marker, item));
    });

    markerClusterer = new MarkerClusterer(map, markers, {imagePath: imagePath});
 
    

    markerClusterer.styles_[0] = {
        url: "../images/markers/marker-1.png",
        height: 44,
        width: 44
    }
    markerClusterer.styles_[1] = {
        url: "../images/markers/marker-2.png",
        height: 44,
        width: 44
    }
    markerClusterer.styles_[2] = {
        url: "../images/markers/marker-3.png",
        height: 44,
        width: 44
    }

    
}

function create_icon(param) {
    let canvas = create_canvas(param.width, param.height);
    create_circle(canvas, param.center, param.radius, param.persents, param.colors);
    let dataURL = canvas.toDataURL("image/png");
    document.body.removeChild(canvas);

    return dataURL;
}

function create_canvas(width, height) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    return canvas;
}

function create_circle(canvas, center, radius, persents, colors, lineWidth = 10) {
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = lineWidth;

    ctx.fillStyle = "#F2F2F2";
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.fill();

    let begin = 0;
    let end;
    for(let i in persents) {
        end = (Math.PI * 2) * persents[i] + begin;

        ctx.strokeStyle = colors[i];
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, begin, end);
        ctx.stroke();

        begin = end
    }        
}

function create_info_window(info, id) {
    load_marker_info(id);
    let item = '<div class="info-window">' +
                    '<span>' + info + '...</span>' +
                    '<a class="info-window__link" href="info.php?id=' + id + '"> подробнее</a>' +
                '</div>';
    return item;
}

function load_marker_info(id) {
    let form_data = new FormData();
    form_data.append('id', id);

    $.ajax({
        url: '../php/get_marker.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(data){
            console.log(data);
        }
    });
}

function validation_form() {
    let res = true;
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let adres = document.getElementById('adres');
    let house_number = document.getElementById('house-number');
    let entrance = document.getElementById('entrance');
    let coment = document.getElementById('coment');
    let user_adres = document.getElementById('user-adres');


    if(name.value == '') {
        name.classList.add('create-form__input_error');
        res = false;
    }

    let pattern = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/i;
    if(!pattern.test(phone.value)) {
        phone.classList.add('create-form__input_error');
        res = false;
    }

    if(adres.value == '') {
        adres.classList.add('create-form__input_error');
        res = false;
    }

    if(user_adres.value == '') {
        user_adres.classList.add('create-form__input_error');
        res = false;
    }

    if(house_number.value == '') {
        house_number.classList.add('create-form__input_error');
        res = false;
    }

    if(coment.value.length < 5) {
        coment.classList.add('create-form__input_error');
        res = false;
    }

    return res;
}

function create_marker() {
    if(!validation_form()) { return };

    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let adres = document.getElementById('adres');
    let house_number = document.getElementById('house-number');
    let entrance = document.getElementById('entrance');
    let coment = document.getElementById('coment');
    let category = document.getElementById('category');
    let files = document.getElementById('phots').files;
    let user_adres = document.getElementById('user-adres');
    

    let form_data = new FormData();
    form_data.append('name', name.value);
    form_data.append('phone', phone.value);
    form_data.append('adres', adres.value);
    form_data.append('user_adres', user_adres.value);
    form_data.append('house_number', house_number.value);
    form_data.append('entrance', entrance.value);
    form_data.append('coment', coment.value);
    form_data.append('category', category.value);
    form_data.append('file_count', files.length);
    form_data.append('lat', select_marker.getPosition().lat());
    form_data.append('lng', select_marker.getPosition().lng());

    for (key in files) {
        form_data.append('file' + key, files[key]);
    }

    $.ajax({
        url: '../php/create_marker.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(data){
            if(data == "ok") {
                document.getElementById('create-popup').classList.remove('popup_open');
                swal("Отзыв успешно добавлен!", "Ваш отзыв появиться после модерации", "success").then(() => {
                    location.href=location.href;
                });
            }
            else {
                swal("Упсс..!", data, "error");
            }
        }

    });
}

function get_markers(category, handler) {
    let form_data = new FormData();
    form_data.append('category', category)

    $.ajax({
        url: '../php/get_markers.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(data){
            resault = JSON.parse(data);  
            handler(resault);
        }

    });
}

function get_count() {
    $.ajax({
        url: '../php/get_count.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'post',
        success: function(data){
            document.getElementById('counter-count').innerText = data;
        }

    });
}

function bild_aside(data) {
    let list =  '<div class="marker-list__item" category-id=all>' +
                    '<div class="marker-list__icon">' +
                        '<img src="images/markers/marker-default.svg" alt="ico">' +
                    '</div>' +
                    '<div class="marker-list__text">' +
                        'Все категории' +
                    '</div>' +
                '</div>';
    let data_markers = [];
    for (key in data) {

        data_markers = data_markers.concat(data[key]);

        list += '<div class="marker-list__item" category-id=' + key + '>' +
                   '<div class="marker-list__icon">' +
                        '<img src="images/markers/marker-' + value_colors[key] + '.svg" alt="ico">' +
                    '</div>' +
                    '<div class="marker-list__text">' +
                        data[key][0].category +
                    '</div>' +
                '</div>';
    }

    document.getElementById('counter-markers').innerText = data_markers.length;

    init_markers(data_markers);

    document.getElementById('marker-list').innerHTML = list;
    init_events_aside();
}

function init_events() {
    document.getElementById('create-btn').onclick = function() {
        document.getElementById('create-popup').classList.add('popup_open');
    };

    document.getElementById('burger-btn').onclick = function() {
        this.classList.toggle('burger-btn_open');
        document.getElementById('aside').classList.toggle('aside_open');
    };

    document.getElementById('create-popup').onclick = function(event){
        document.getElementById('create-popup').classList.remove('popup_open');
    };

    document.getElementById('create-popup-content').onclick = function(e) {
        e.stopPropagation();
    };
   
    document.getElementById('submit-btn').onclick = () => {
        create_marker();
    };

    let inputs = document.getElementsByClassName('create-form__input');
    for(let i in inputs) {
        inputs[i].onchange = (e) => {
            e.target.classList.remove('create-form__input_error');
        };
    } 
    
    document.getElementById('category').onchange = function(e) {
        let value = e.target.value;

        select_marker.setIcon(marker_images[value_colors[value]]);
    }

    document.getElementById('theam-btm').onclick = function() {
        if(this.classList.contains('light')) {
            map.setOptions({styles:  map_styles.dark });
            mini_map.setOptions({styles:  map_styles.dark });
            localStorage.setItem('theam', 'dark');
        }
        else {
            map.setOptions({styles:  map_styles.light });
            mini_map.setOptions({styles:  map_styles.light });
            localStorage.setItem('theam', 'light');
        }
        this.classList.toggle('light');
        document.getElementById('body').classList.toggle('light');
    };


}

function init_events_aside() {
    
    let items = document.getElementsByClassName('marker-list__item');
    for(let i in items) {
        items[i].onclick = (e) => {
            let category =  items[i].getAttribute('category-id');
            get_markers(category, (data) => {
                let data_markers = [];
                for (key in data) {            
                    data_markers = data_markers.concat(data[key]);
                }

                init_markers(data_markers);            
            });
        };
    } 
}

function renewAddress(marker) {

    geocoder.geocode({latLng: marker.getPosition()}, function (arr, status) {
        let num = null;
        let street = null;
        let city = null;
        
        if(arr.length == 0) { return; }

        let len = arr[0].address_components.length;
        for(let i=0; i < len; i++){
            if(arr[0].address_components[i].types[0] == "street_number") {
                num = arr[0].address_components[i].long_name;
            }
            if(arr[0].address_components[i].types[0] == "route") {
                street = arr[0].address_components[i].long_name;
            }
            if(arr[0].address_components[i].types[0] == "locality") {
                city = arr[0].address_components[i].long_name;
            }                
        }


        let adres = '';
        if(city)  { adres += city; }
        if(street) { adres += ', ' + street; }
            
        if(status == google.maps.GeocoderStatus.OK) {
            if(marker.getMap() == null) { marker.setMap(map); }             
           
            if(adres !== '') { document.getElementById('adres').value = adres; }
            if(num) { document.getElementById('house-number').value = num; }
        }
    })
}

function setCenterAndZoom(map, center, zoom) {
    map.setCenter(center);
    map.setZoom(zoom)
}

function init_theam() {
    let theam = localStorage.getItem('theam');
    if(theam == null) { return; }

    if(theam == 'dark') {
        map.setOptions({styles:  map_styles.dark });
        document.getElementById('theam-btm').classList.remove('light');
        document.getElementById('body').classList.remove('light');
    }
    else if(theam == 'dark') {
        map.setOptions({styles:  map_styles.light });
        document.getElementById('theam-btm').classList.add('light');
        document.getElementById('body').classList.add('light');
    }
}