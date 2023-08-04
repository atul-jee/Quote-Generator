const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('quote-container');


let apiQuotes=[];
function loading(){
	quoteContainer.hidden=true;
	loader.hidden=false;
	
}
function complete()
{
	quoteContainer.hidden=false;
	loader.hidden=true;
	
}

function newQuote() {
	// body... 
	loading();
	const quote= apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
	console.log(quote);
	let comma_ind=quote.author.indexOf(',');
	if(quote.author==='type.fit')
	{
		authorText.textContent='<---Unknown--->';
	}
	else{
	authorText.textContent='<---'+quote.author.slice(0,comma_ind)+'--->';
}
	if(quote.text.length>50)
	{
		quoteText.classList.add('long-quote');
	}
	else{
		quoteText.classList.remove('long-quote');
	}
	quoteText.textContent=quote.text;
	complete();
}

async function get_quote() {
	/* body... */
	const api_url='https://type.fit/api/quotes';
	try {
		const response=await fetch(api_url);
		apiQuotes=await response.json();
		newQuote();
	} catch(e) {
		
		console.log(e);
	}
}
function tweetQuote () {
	// body... 
	const twitter_url= `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
	window.open(twitter_url,'_blank');
}
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);
get_quote();
