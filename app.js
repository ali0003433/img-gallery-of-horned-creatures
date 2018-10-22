// declare variable main, creating a jquery object to hold a reference to element main
const $main = $('main');
const $main2 = $('#page-2');
// declare variable selector, creating a jquery object to store a reference to select el w/ id 'image-filter'
const $selector = $('#image-filter');
const $selector2 = $('#image-filter2');

//declare variable and assign it value of our content
const apiURL = 'https://raw.githubusercontent.com/CodePartnersMD/MD301-01/master/02-jquery-selectors-events/lab/page-1.json';
const apiURL2 = 'https://raw.githubusercontent.com/CodePartnersMD/MD301-01/master/03-flexbox-templating/lab/page-2.json';
//create a constructor function with properties image_url, title, description, keyword, and horns
const HornedAnimal = function(imageObj){
    this.image_url = imageObj.image_url;
    this.title = imageObj.title;
    this.description = imageObj.description;
    this.keyword = imageObj.keyword;
    this.horns = imageObj.horns;
};

//declare a variable and assign it the value of an empty array. this will hold all of our horned animal objects
let hornedAnimalArr = [];
let hornedAnimalArr2 = [];
//create renderAnimal method and assign it arrow func w/ parameter 'param'
//declare var animalTemplate to store a reference to contents of section el w/ id 'image-template'
//declare var handleBarsTemplate and tell handlebars to compile the animal template
//return handleBarsTemplate
HornedAnimal.prototype.renderAnimal = val => {
    let animalTemplate = $('#image-template').html();
    let handleBarsTemplate = Handlebars.compile(animalTemplate);
    return handleBarsTemplate(val);
    //let $animalClone = $('#image-template').clone()s
    // $main.append($animalClone);
    // $animalClone.attr('id', imgObj.keyword);
    // $animalClone.find('img').attr('src', imgObj.image_url);
    // $animalClone.find('p').text(imgObj.keyword);
};

//page 2
HornedAnimal.prototype.renderAnimal2 = val => {
    let animalTemplate2 = $('#image-template2').html();
    let handleBarsTemplate2 = Handlebars.compile(animalTemplate2);
    return handleBarsTemplate2(val);
};

//attach event handler to select el so that when event occurs, section is hidden and then sections w/ id equal to keyword chosen is shown
$($selector).on('change', () => {
    $('section').hide();
    console.log(event);
    $(`section[class=${event.target.value}]`).show();
});

//page 2
$($selector2).on('change', () => {
    $('section').hide();
    $(`section[class=${event.target.value}]`).show();
});
//from the json file, pull the data then for each object in response array, instantiate it using HornedAnimal constructor function. Then push the new instance to hornedAnimalArr. Append the new instance to main


$.getJSON(apiURL, response => {
    response.forEach((val) => {
        let newAnimal = new HornedAnimal(val);
        hornedAnimalArr.push(newAnimal);
        $main.append(newAnimal.renderAnimal(val));
        $selector.append(`<option value=${newAnimal.keyword}>${newAnimal.keyword}</option>`);
    });
});
const sortAnimals = (arr) =>{
    arr.sort((a,b)=> {
        if(a.keyword !== b.keyword){
            return a.keyword > b.keyword;
        } else return a.title > b.title;
    });
    return arr;
};
sortAnimals(hornedAnimalArr);
console.log(sortAnimals(hornedAnimalArr2));


//page 2
$.getJSON(apiURL2, response2 => {
    response2.forEach((val) => {
        let newAnimal2 = new HornedAnimal(val);
        hornedAnimalArr2.push(newAnimal2);
        $main2.append(newAnimal2.renderAnimal2(val));
        $selector2.append(`<option value=${newAnimal2.keyword}>${newAnimal2.keyword}</option>`);
    });
});

