import { useEffect, useState } from "react";
import { FetchAllArticlesByTopic } from "./api-logic";
import { Link, useSearchParams } from "react-router-dom";

const ArticlesByTopic = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");

  useEffect(() => {
    setIsLoading(true);
    FetchAllArticlesByTopic(topicQuery).then((body) => {
      setArticles(body);
      setIsLoading(false);
    });
  }, [topicQuery]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <h2 id="topic-h2">{topicQuery}</h2>
      <section id="ArticlesByTopic-article-section">
        {articles.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.title}
              className="links"
            >
              <article className="articles" key={article.article_id}>
                <img
                  src={article.article_img_url}
                  alt={`scene of ${article.topic}`}
                />
                <h4>{article.title}</h4>
              </article>
            </Link>
          );
        })}
      </section>
    </main>
  );
};
export default ArticlesByTopic;
