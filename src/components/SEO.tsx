import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO() {
  return (
    <Helmet>
      <title>CrickQuiz - Daily Cricket Trivia</title>
      <meta name="description" content="Test your cricket knowledge with daily quizzes about historic cricket moments" />
      <meta name="theme-color" content="#1a365d" />
      
      {/* Open Graph */}
      <meta property="og:title" content="CrickQuiz - Daily Cricket Trivia" />
      <meta property="og:description" content="Challenge yourself with daily quizzes about historic cricket moments" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://crickquiz.com" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="CrickQuiz - Daily Cricket Trivia" />
      <meta name="twitter:description" content="Test your cricket knowledge with daily quizzes" />
    </Helmet>
  );
}