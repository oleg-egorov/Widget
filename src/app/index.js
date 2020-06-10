import '../style/style.scss';
import axios from 'axios';

const innerElem = document.getElementById('Content');
const buttonRight = document.getElementById('button_R');
const buttonLeft = document.getElementById('button_L');

innerElem.style.right = `${-30}px`;
buttonRight.disabled = true;

const time = 3000;

let goInt;
let counterButton = 0;
let goBack;
let lengthArr;

function handleRightButtonClick() {
  clearInterval(goInt);
  goInt = setInterval(handleRightButtonClick, time);

  buttonLeft.disabled = false;
  counterButton++;

  const RightOffset = parseInt(innerElem.style.right, 10);
  innerElem.style.right = `${RightOffset + 170}px`;

  if (counterButton === lengthArr - 1) {
    buttonRight.disabled = true;

    clearInterval(goInt);
    goBack = setTimeout(begin, time);
  }
}

function handleLeftButtonClick() {
  clearTimeout(goBack);
  clearInterval(goInt);
  goInt = setInterval(handleRightButtonClick, time);

  buttonRight.disabled = false;
  counterButton--;

  const leftOffset = parseInt(innerElem.style.right, 10);
  innerElem.style.right = `${leftOffset - 170}px`;

  if (counterButton === 0) {
    buttonLeft.disabled = true;
  }
}

buttonLeft.addEventListener('click', handleLeftButtonClick);
buttonRight.addEventListener('click', handleRightButtonClick);

function begin() {
  counterButton = 0;
  innerElem.style.right = `${-30}px`;

  buttonRight.disabled = false;
  buttonLeft.disabled = true;

  clearInterval(goInt);
  goInt = setInterval(handleRightButtonClick, time);
}

function addContent(response) {
  response.forEach((car) => {
    const list = document.createElement('div');
    const listHeader = document.createElement('div');
    const slide = document.createElement('div');
    const img = document.createElement('div');
    const price = document.createElement('div');
    const description = document.createElement('div');
    const descriptionText = document.createElement('div');
    const descriptionText2 = document.createElement('div');
    const check = document.createElement('div');
    const priceText = document.createElement('p');
    const checkText = document.createElement('p');

    list.className = 'Widget__List';
    listHeader.className = 'Widget__ListHeader';
    slide.className = 'Widget__Slide';
    img.className = 'Widget__Image';
    price.className = 'Widget__Price';
    description.className = 'Widget__Description';
    descriptionText.className = 'Widget__DescriptionText';
    descriptionText2.className = 'Widget__DescriptionText2';
    check.className = 'Widget__Check';
    priceText.className = 'Widget__PriceText';
    checkText.className = 'Widget__CheckText';

    listHeader.innerHTML = `<p><b>${car.mark}</b></p> <p>на Базаре</p>`;
    priceText.innerHTML = `${car.price} Р`;
    descriptionText.innerHTML = `${car.year}, ${car.run} км`;
    descriptionText2.innerHTML = `${car.mark} ${car.model}`;
    check.innerHTML = '<img src=\'image/Check.png\'>';
    checkText.innerHTML = 'В САЛОНЕ';
    img.style.backgroundImage = car.image;

    innerElem.appendChild(list);
    list.appendChild(listHeader);
    list.appendChild(slide);
    slide.appendChild(img);
    img.appendChild(price);
    slide.appendChild(description);
    description.appendChild(descriptionText);
    description.appendChild(descriptionText2);
    description.appendChild(check);
    price.appendChild(priceText);
    check.appendChild(checkText);
  });
}

axios.get('https://my-json-server.typicode.com/Oleg944/database/arr')
  .then((response) => {
    addContent(response.data);
    goInt = setInterval(handleRightButtonClick, time);
    lengthArr = response.data.length;
    buttonRight.disabled = false;
  });
