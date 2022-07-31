let map = null;
let marker = null;
let body = document.getElementById('body');


(function () {
    init_map();
    init_theam();
    init_marker();
    init_events();
    
}());

function init_map() {
    let zoom = 16;
    let lat = body.getAttribute('lat');
    let lng = body.getAttribute('lng');
    
    map = new google.maps.Map(document.getElementById("googlemap"), {
        zoom: zoom,
        center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
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

function init_marker(title = "Выбранное место") {
    let lat = body.getAttribute('lat');
    let lng = body.getAttribute('lng');
    let category_id = body.getAttribute('cat_id');

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
        icon: marker_images[value_colors[category_id]],
        draggable: false,
        map: map,
        animation: google.maps.Animation.DROP,
    });

}

function init_events() {
    document.getElementById('theam-btm').onclick = function() {
        if(this.classList.contains('light')) {
            map.setOptions({styles:  map_styles.dark });
            localStorage.setItem('theam', 'dark');
        }
        else {
            map.setOptions({styles:  map_styles.light });
            localStorage.setItem('theam', 'light');
        }
        this.classList.toggle('light');
        document.getElementById('body').classList.toggle('light');
    };

    document.getElementById('slider__img').onclick = function() {
        document.getElementById('img-popup').classList.add('popup_open');
    };

    document.getElementById('img-popup').onclick = function(event){
        document.getElementById('img-popup').classList.remove('popup_open');
    };

    document.getElementById('img-popup-content').onclick = function(e) {
        e.stopPropagation();
    };

    document.getElementById('big-img').onclick = (e) => {
        document.getElementById('img-popup').classList.remove('popup_open');
    };

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