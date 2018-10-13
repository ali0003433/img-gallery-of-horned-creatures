// declare variable main which pulls main elements from index.html
const $main = $('main');
// declare variable selector which pulls elements with id of 'image-filter' from index.html
const $selector = $('#image-filter');

//declare variable and assign it value of our faux-API
const apiURL = 'https://raw.githubusercontent.com/CodePartnersMD/MD301-01/master/02-jquery-selectors-events/lab/page-1.json'

// create a constructor functio
const HornedAnimal = function(imageObj){
    this.image_url = imageObj.image_url;
    this.title = imageObj.title;
    this.description = imageObj.description;
    this.keyword = imageObj.keyword;
    this.horns = imageObj.horns;
};

let hornedAnimalArr = [];

HornedAnimal.prototype.renderAnimal = imgObj => {
    let $animalClone = $('#image-template').clone();
    $main.append($animalClone);
    $animalClone.attr('id', imgObj.keyword);
    $animalClone.find('img').attr('src', imgObj.image_url);
    $animalClone.find('p').text(imgObj.keyword);
};

$($selector).on('change', () => {
    $('section').hide();
    $(`section[id=${event.target.value}]`).show();
});

$.getJSON(apiURL, response => {
    response.forEach((val) => {
        let newAnimal = new HornedAnimal(val);
        hornedAnimalArr.push(newAnimal);
        newAnimal.renderAnimal(val);
        $selector.append(`<option value=${newAnimal.keyword}>${newAnimal.keyword}</option>`);
    });
});