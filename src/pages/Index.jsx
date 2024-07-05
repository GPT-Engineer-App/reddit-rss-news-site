import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl">Welcome to the RSS News Site</h1>
      <p>Click the button below to view the latest posts from the ReactJS subreddit.</p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default Index;