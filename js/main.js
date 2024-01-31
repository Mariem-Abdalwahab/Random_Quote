let quote = document.querySelector('.quote p')
let quote_author = document.querySelector('.author .name')
let new_quote = document.querySelector('.new-quote');
let twitter = document.querySelector('.twitter');
let copy_btn = document.querySelector('.copy');
let speak_btn = document.querySelector('.sound');

async function fetching(){
    let random = await fetch("https://api.quotable.io/random")
    .then(response =>
        response.json()
        .then(res=>{
            // console.log(res);
            return res;
        })
    );
    return random;
}
async function random_quote(){
    new_quote.innerHTML = 'loading...';
    new_quote.classList.add('loading');
    let res = await fetching();
    // console.log(res.content);
    new_quote.innerHTML = 'New Quote';
    new_quote.classList.remove('loading');

    quote.innerHTML = res.content;
    quote_author.innerHTML = res.author;
}
function share_twitter(){
    window.open(`https://twitter.com/compose/tweet?url=${quote.innerHTML} by ${quote_author.innerHTML}`, '_blank')
}

function copy(){
    navigator.clipboard.writeText(`${quote.innerHTML} by ${quote_author.innerHTML}`).then(y=>{
        console.log(y);       
    }) 
}

function speak(){
    let sound = new SpeechSynthesisUtterance(`${quote.innerHTML} by ${quote_author.innerHTML}`);
    window.speechSynthesis.speak(sound);
    setInterval(()=>{
        if(speechSynthesis.speaking){
            speak_btn.classList.add('active')
        }else{
            speak_btn.classList.remove('active')
        }
    },10)
}

new_quote.addEventListener('click', random_quote);
twitter.addEventListener('click', share_twitter);
copy_btn.addEventListener('click', copy);
speak_btn.addEventListener('click', speak);
console.log(quote);