import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subreddit, setSubreddit] = useState("reactjs");

  const fetchRSS = async (subreddit) => {
    setLoading(true);
    setError(null);
    const parser = new Parser();
    try {
      const feed = await parser.parseURL(`https://www.reddit.com/r/${subreddit}/.rss`);
      setPosts(feed.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSS(subreddit);
  }, [subreddit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSubreddit = form.elements.subreddit.value.trim();
    if (newSubreddit) {
      setSubreddit(newSubreddit);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input name="subreddit" placeholder="Enter subreddit" />
        <Button type="submit">Fetch Posts</Button>
      </form>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        posts.map((post) => (
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
        ))
      )}
    </div>
  );
};

export default Home;