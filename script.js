var container = $('.container');
// var timeSlot = [];
var now = new Date().getHours();
// console.log(now);

$(document).ready(function(){
// Moment date for top of the page
$('#currentDay').text(moment().format('MMMM Do YYYY'));

// Initial function to add stored values to the page
function init() {
    for(i = 7 ; i < 21; i++){
        var time = JSON.parse(localStorage.getItem(`slot${[i]}`));
        $(`#slot${[i]}`).text(time);
    }
}

// Renders the full calendar, time, text, and buttons
function renderCalendar() {
    var form = $('<form>');
    container.append(form);

    function formatI(i) {
        if(i > 12){
            return (i - 12) + ' PM';
        } else{
            return i + ' AM';
        }
    }

    // For loop for adding all elements to the page
    for(i = 7 ; i < 21; i++){
    var $textarea = $('<textarea>');
    var $btn = $('<button>');
    var $p = $('<p>');
    var $div = $('<div>');

    $btn.addClass('saveBtn fas fa-lock');
    $div.addClass('timeDiv form-group');
    $p.attr('style', 'display: inline;');
    $textarea.attr('style', 'width: 90%;border: 1px solid black;');
    $textarea.attr('id', `slot${[i]}`);
    $textarea.attr('data', [i]);
    $p.text(formatI([i]));

    form.append($div);
    $div.append($p);
    $div.append($textarea);
    $div.append($btn);
    }
}

// Function for the save button
function saveD(e) {
    e.preventDefault();
    // console.log('clicked');
    // console.log($(this).siblings('textarea').val().trim());

    var text = $(this).siblings('textarea').val().trim();
    var id = $(this).siblings('textarea').attr('id');

    localStorage.setItem(id, JSON.stringify(text));
};

function colorFormat() {
    // console.log($('#slot7').attr('data'));
    // For loop for adding classes to each time slot
    for (i = 7; i < 21; i++){
        var slot = $(`#slot${[i]}`);

        if(slot.attr('data') < now){
            slot.attr('class', 'past');
        } else if (slot.attr('data') > now) {
            slot.attr('class', 'future');
        } else {
            slot.attr('class', 'present');
        }
    }
};

// Functions fired
renderCalendar();
colorFormat();
init();
// On click for save button
$('.saveBtn').on('click', saveD);
});



