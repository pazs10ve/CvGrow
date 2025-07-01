import { useState, useEffect } from 'react';
import { Title, Text } from '@mantine/core';
import classes from './LoadingScreen.module.css';

const subtitles = [
  'Our AI is working its magic...',
  'Crafting the perfect summary...',
  'Polishing your work experience...',
  'Highlighting your key skills...',
  'Almost there...',
];

const LoadingScreen = () => {
  const [subtitle, setSubtitle] = useState(subtitles[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % subtitles.length;
      setSubtitle(subtitles[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.loadingWrapper}>
      <div className={classes.loader}>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </div>
      <Title order={3} className={classes.title}>
        Generating Your Resume
      </Title>
      <Text c="dimmed" className={classes.subtitle}>
        {subtitle}
      </Text>
    </div>
  );
};

export default LoadingScreen;
