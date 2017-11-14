import nlp from "compromise";

(() => {
  // ny times api related
  const _apiKey = "?api-key=583c3da73beb40ab8054f1865274adf5";
  const nyAPI = "https://api.nytimes.com/svc/topstories/v2/";

  const sections = [
    "home.json",
    "politics.json",
    "science.json",
    "technology.json",
    "health.json",
    "food.json",
    "fashion.json",
    "travel.json",
    "magazine.json",
    "arts.json"
  ];

  const createPNode = text => {
    let p = document.createElement("p");
    p.innerHTML = text;
    p.className = "news-item";
    return p;
  };

  const createImgNode = url => {
    let img = document.createElement("img");
    img.src = url;
    img.className = "news-image";

    return img;
  };

  const newsRecieved = result => {
    const rNo = Math.round(Math.random() * (result.length - 1));
    const news = result[rNo];
    console.log(`NEWS: \n`, nlp);
    const negatedSentence = nlp(news.abstract).sentences().toNegative().out("text");
    const futureTensed = nlp(negatedSentence).sentences().toFutureTense().out("text");
    // const pluralised = nlp(futureTensed).nouns().toPlural().out("text");
    const imageUrl = news.multimedia.find(item => item.format === "Normal").url;
    let newsBody = document.querySelector("#news-body");

    const newsTitleNode = createPNode(futureTensed);
    newsBody.appendChild(newsTitleNode);

    const newsImageNode = createImgNode(imageUrl);
    newsBody.appendChild(newsImageNode);
  };

  fetch(
    nyAPI +
      sections[Math.round(Math.random() * (sections.length - 1))] +
      _apiKey
  )
    .then(response => response.json())
    .then(response => newsRecieved(response.results));
})();
