// declare variable main which pulls main elements from index.html
const $main = $('main');
// declare variable selector which pulls elements with id of 'image-filter' from index.html
const $selector = $('#image-filter');

//declare variable and assign it value of our faux-API
const apiURL = 'https://raw.githubusercontent.com/CodePartnersMD/MD301-01/master/02-jquery-selectors-events/lab/page-1.json';

// create a constructor function with properties image_url, title, description, keyword, and horns
const HornedAnimal = function(imageObj){
    this.image_url = imageObj.image_url;
    this.title = imageObj.title;
    this.description = imageObj.description;
    this.keyword = imageObj.keyword;
    this.horns = imageObj.horns;
};

// declare a variable and assign it the value of an empty array. this will hold all of our horned animal objects
let hornedAnimalArr = [];

// add a method to instances of HornedAnimal and assign it func with parameter imgObj. 'image-template' clone and append it to main
HornedAnimal.prototype.renderAnimal = imgObj => {
    let animalTemplate = $('#image-template').html();
    let handleBarsTemplate = Handlebars.compile(animalTemplate);
    return handleBarsTemplate(imgObj);
    //let $animalClone = $('#image-template').clone()s
    // $main.append($animalClone);
    // $animalClone.attr('id', imgObj.keyword);
    // $animalClone.find('img').attr('src', imgObj.image_url);
    // $animalClone.find('p').text(imgObj.keyword);
};

$($selector).on('change', () => {
    $('section').hide();
    console.log(event);
    $(`section[id=${event.target.value}]`).show();
});

$.getJSON(apiURL, response => {
    response.forEach((val) => {
        let newAnimal = new HornedAnimal(val);
        hornedAnimalArr.push(newAnimal);
        $main.append(newAnimal.renderAnimal(val));
        $selector.append(`<option value=${newAnimal.keyword}>${newAnimal.keyword}</option>`);
    });
});