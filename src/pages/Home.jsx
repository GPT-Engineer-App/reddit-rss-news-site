import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSS = async () => {
      setLoading(true);
      setError(null);
      const parser = new Parser();
      try {
        const feed = await parser.parseURL("https://www.reddit.com/r/reactjs/.rss");
        setPosts(feed.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.guid}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Author: {post.author}</p>
            <p>Date: {new Date(post.pubDate).toLocaleDateString()}</p>
            <p>{post.contentSnippet}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Read more
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Home;