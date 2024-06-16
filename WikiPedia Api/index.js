const searchBox = document.querySelector('.search-box');
const results = document.querySelector('.results');
const input = document.getElementById('search-input');
const resultsCount = document.getElementById('results-count');
input.value=localStorage.getItem('inputValue');
window.addEventListener('load', function(event) {
    event.preventDefault();
    const searchvalue = input.value;
    console.log(searchvalue);
    if (searchvalue) {
        show(searchvalue);
    }
});
searchBox.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchvalue = input.value;
    console.log(searchvalue);
    if (searchvalue) {
        show(searchvalue);
    }
});

async function show(searchvalue) {
    let res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${searchvalue}`);
    let data = await res.json();
    console.log(data);
    showresults(data);
}

function showresults(data) {
    results.innerHTML = ''; 
    resultsCount.textContent = data.query.search.length;
    data.query.search.forEach(element => {
        let result = document.createElement('div');
        result.className = "results-child";
        result.innerHTML = `
            <h2>${element.title}</h2>
            <p>${element.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${element.pageid}" target="_blank">Read More</a>
        `;
        results.appendChild(result);
        input.value="";
    });
}