// api.js

// Fallback quotes in case all APIs fail
const fallbackQuotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  { quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  {
    quote: "Education is not preparation for life; education is life itself.",
    author: "John Dewey",
  },
  {
    quote: "The more that you read, the more things you will know.",
    author: "Dr. Seuss",
  },
];

function getRandomFallbackQuote() {
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  const quote = fallbackQuotes[randomIndex];
  return `"${quote.quote}" — ${quote.author}`;
}

async function loadQuote() {
  const quoteDiv = document.getElementById("quote");
  if (!quoteDiv) {
    console.error("Quote element not found!");
    return;
  }

  quoteDiv.textContent = "Loading inspirational quote...";
  console.log("Fetching quote from API...");

  // Try multiple APIs in order of preference
  const apis = [
    {
      name: "ZenQuotes",
      url: "https://zenquotes.io/api/random",
      parse: (data) => `"${data[0].q}" — ${data[0].a}`,
    },
    {
      name: "QuoteGarden",
      url: "https://quote-garden.herokuapp.com/api/v3/quotes/random",
      parse: (data) => `"${data.data.quoteText}" — ${data.data.quoteAuthor}`,
    },
    {
      name: "Quotable (backup)",
      url: "https://api.quotable.io/random",
      parse: (data) => `"${data.content}" — ${data.author}`,
    },
  ];

  for (let api of apis) {
    try {
      console.log(`Trying ${api.name} API...`);
      const response = await fetch(api.url);

      if (response.ok) {
        const data = await response.json();
        console.log(`${api.name} API response:`, data);
        const quoteText = api.parse(data);
        quoteDiv.textContent = quoteText;
        console.log(`Successfully loaded quote from ${api.name}`);
        return; // Success! Exit the function
      } else {
        console.warn(`${api.name} API returned status: ${response.status}`);
      }
    } catch (error) {
      console.warn(`${api.name} API failed:`, error.message);
      continue; // Try next API
    }
  }

  // If all APIs fail, use fallback quotes
  console.log("All APIs failed, using fallback quote");
  quoteDiv.textContent = getRandomFallbackQuote();
}

// Auto-load a quote when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Wait a bit for the page to fully render
  setTimeout(() => {
    const quoteDiv = document.getElementById("quote");
    if (quoteDiv) {
      loadQuote();
    }
  }, 1000);
});
