import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>About This Application</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          This application fetches and displays the latest posts from a specified Reddit subreddit using its RSS feed.
          It is designed to provide a user-friendly interface for browsing Reddit posts in a news site format.
        </p>
      </CardContent>
    </Card>
  );
};

export default About;