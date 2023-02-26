// const debounceIT = () => {
//   let timeDelay;
//   return () => {
//     clearTimeout(timeDelay);

//     setTimeout(() => {
//       timeDelay = SearchBar();
//     }, 500);
//   };
// };
// const SearchBar = () => {
//   fetch('http://localhost:3000/db')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };

// const getData = async () => {
//   let res = await fetch('http://localhost:3000/db');
//   let result = await res.json();
//   console.log(result);
// };
// const magicFunction = function (fn, d) {
//   let timer;
//   return function () {
//     // let context = this,
//     //   args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       getData();
//     }, d);
//   };
// };

// const improveFetch = magicFunction(getData, 500);
// let currentWord = document.getElementById('searchWord').value;
// let list = document.getElementById('list');
// let characters = [];
// const getData = async () => {
//   const res = await fetch('http://localhost:3000/db');
//   characters = await res.json();
//   console.log(characters);
//   const filterCharacters = characters.includes((ch) => {
//     console.log(ch);
//     // return ch.appearance.toLowerCase().includes(currentWord);
//   });
//   displayCharacter(filter);
// };
// const searchFunction = (getData, delay) => {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       getData();
//     }, delay);
//   };
// };

// const displayCharacter = (cha) => {
//   const htmlString = cha
//     .map((ch) => {
//       return `
//   <li> <h2>${ch.appearance} </h2>
//        <p> ${ch.category} </p>

//    </li>

//   `;
//     })
//     .join('');
//   list.innerHTML = htmlString;
// };

// const improveFetch = searchFunction(getData, 500);
let list = document.getElementById('list');

const getRequest = (getData, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData();
    }, delay);
  };
};

const getData = async () => {
  let character = [];
  const res = await fetch('https://hp-api.onrender.com/api/characters');
  let result = await res.json();
  character = result;
  let currentWord = document.getElementById('searchWord').value.toLowerCase();

  const filterIt = character.filter((ch) => {
    return (
      ch.name.toLowerCase().includes(currentWord) ||
      ch.house.toLowerCase().includes(currentWord)
    );
  });
  display(filterIt);
};

const display = (cha) => {
  if (cha.length < 10) {
    const htmlString = cha
      .map((ch) => {
        return `
    <li> 
    <div class="tet-info">
    <h1>${ch.name} </h1>
        <h2>${ch.house} </h2>
   
        <br>
        </div>
    <img src = '${ch.image}' class ="potrait"/>

     </li>

    `;
      })
      .join('');
    list.innerHTML = htmlString;
  } else {
    list.textContent = 'Not available, or check typos ';
  }
};

const advanceSearch = getRequest(getData, 500);
