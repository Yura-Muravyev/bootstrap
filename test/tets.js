let date = document.querySelector('input');


function get_current_age(date) {
    var d = date.split('.');
    if( typeof d[2] !== "undefined" ) {
        date = d[2]+'.'+d[1]+'.'+d[0];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    return 0;
    
}

let = dt = get_current_age(date);
const submit = document.querySelector('form');
submit.addEventListener('submit', get_current_age)