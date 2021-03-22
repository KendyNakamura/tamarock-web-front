

import XMLParser from "xml2js";
  
const fetchFeedXML = async (fetchURL: string): Promise<string | null> => {
  try {
    const response = await fetch(fetchURL);
    const xml = await response.text();

    return xml;
  } catch (err) {
    console.error("GitPress fetch Error", err);

    return null;
  }
};

export const getFeedArticles = async (fetchURL: string, getKey: boolean = false): Promise<object[]> => {
  const xml = await fetchFeedXML(fetchURL);
	const parsed_xml = await XMLParser.parseStringPromise(xml).catch(null);
	if (getKey) {
		var items = parsed_xml["rdf:RDF"].item;
	} else {
		var items = parsed_xml.rss.channel[0].item;
	}
  var articles = items.map((article) => {
    return {
      title: article.title.toString(),
      link: article.link.toString(),
    };
  });

  return articles.slice(0, 5);
};