let wordSearch = document.forms["dictFrm"]["word"];

function lookUpWord(e){
    e.preventDefault();
    // let submitButton = document.getElementById('searchButton');
    //   submitButton.innerHTML="Searching...";
    //   submitButton.disabled=true;
    dictionaryAPI(wordSearch);
    // submitButton.innerHTML="Searching";
    // submitButton.disabled=false;
}

async function dictionaryAPI(search){

    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${search.value}`;
    const response = await fetch(apiURL);
    const data = await response.json();

    let searchWord = document.querySelector("#searchWord");
    let speaker = document.querySelector("#speaker");
    let searchPhonetics = document.querySelector("#searchPhonetics");
    let searchTranscribe = document.querySelector("#searchTranscribe");

    for(let properties in data){
        document.querySelector('.alert').style.display = 'none';
        searchWord.innerHTML = data[properties].word;
        document.querySelector("#hr").style.display = "block";
        for(let i in data[properties].phonetics){
            if(data[properties].phonetics[i].audio != ""){
                document.querySelector("#speaker").addEventListener('click', ()=>{
                    searchPhonetics.innerHTML = `<audio controls autoplay><source src="${data[properties].phonetics[i].audio}"></audio>`
                })
                speaker.style.display = "inline-block";
                break;
            }
            // if(data[properties].phonetics[i].text){
            //     searchTranscribe.innerHTML = data[properties].phonetics[i].text;
            //     break;
            // }

        }
        searchTranscribe.innerHTML = data[properties].phonetic;

        let wordDefinition;
        let arrOfWordDefinition = [];
        let partOfSpeech;
        let arrOfPartOfSpeech = [];
        let fullWordDefinition;
        let synonyms;
        let antonyms;
        let arrOfSynonyms = [];
        let arrOfAntonyms = [];

        for(let numOfPartOfSpeech in data[properties].meanings){
            fullWordDefinition = document.querySelector("#fullWordDefinition");
            partOfSpeech = data[properties].meanings[numOfPartOfSpeech].partOfSpeech;
            wordDefinition = data[properties].meanings[numOfPartOfSpeech].definitions;
            synonyms = data[properties].meanings[numOfPartOfSpeech].synonyms;
            antonyms = data[properties].meanings[numOfPartOfSpeech].antonyms;

            arrOfWordDefinition.push(wordDefinition);
            arrOfPartOfSpeech.push(partOfSpeech);

            arrOfSynonyms.push(synonyms);
            arrOfAntonyms.push(antonyms);
        }
        
        for(let i = 0; i < arrOfPartOfSpeech.length; i++){
            fullWordDefinition.innerHTML += 
            `<ul>
                <li><span style='color:orange; font-style: italic'>${arrOfPartOfSpeech[i]}</span></li>
            </ul>`
            for(let j = 0; j < arrOfWordDefinition[i].length; j++){
                if(arrOfWordDefinition[i][j].example === undefined){
                    fullWordDefinition.innerHTML += 
                    `
                    <p><sup><span style= 'color:green; font-style: italic; margin-right:5px'>${j + 1}. </span></sup>${arrOfWordDefinition[i][j].definition}</p>
                    `
                }
                else{
                    fullWordDefinition.innerHTML += 
                    `
                    <sup><span style= 'color:green; font-style:italic; margin-right:10px'>${j + 1}. </span></sup>${arrOfWordDefinition[i][j].definition}
                    <ul type="square">
                        <li><span style='color:rgb(182, 12, 36); font-style:italic'>${arrOfWordDefinition[i][j].example}</span></li>
                    </ul>
                    `
                }
            }
        let synStr = "";
        let antStr = "";
            for(let j = 0; j < arrOfSynonyms[i].length; j++){
                if(arrOfSynonyms[i][j] !== ""){
                    if(j === arrOfSynonyms[i].length - 1){
                        synStr += arrOfSynonyms[i][j] + "."
                    }
                    else{
                        synStr += arrOfSynonyms[i][j] + ", "
                    }
                }
            }

            for(let j = 0; j < arrOfAntonyms[i].length; j++){
                if(arrOfAntonyms[i][j] !== ""){
                    if(j === arrOfAntonyms[i].length - 1){
                        antStr += arrOfAntonyms[i][j] + "."
                    }
                    else{
                        antStr += arrOfAntonyms[i][j] + ", "
                    }
                }
            }
            if(synStr != ""){
                if(antStr != ""){
                    fullWordDefinition.innerHTML += `<span style= 'color:green; font-style: italic'>Synonyms: </span><span style= 'font-style: italic'>${synStr}<span><br>
                    <span style= 'color:green; font-style: italic'>Antonyms: </span><span style= 'font-style: italic'>${antStr}<span><hr>`
                }
                else{
                    fullWordDefinition.innerHTML += `<span style= 'color:green'>Synonyms: </span><span style= 'font-style: italic'>${synStr}<span><br><hr>`   
                }
            }
            else{
                if(antStr != ""){
                    fullWordDefinition.innerHTML += `<span style= 'color:green; font-style: italic'>Antonyms: </span><span style= 'font-style: italic'>${antStr}<span><hr>`
                }
                else{
                    fullWordDefinition.innerHTML += '<hr>'
                }
            }

        }
        
    }
}

document.forms["dictFrm"].addEventListener('submit', lookUpWord);
            
