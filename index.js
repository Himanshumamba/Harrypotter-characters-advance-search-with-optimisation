
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
