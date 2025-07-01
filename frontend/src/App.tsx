import { useState } from 'react';
import type { GeneratedFiles } from './types';
import ResumeForm from './components/ResumeForm';
import LoadingScreen from './components/LoadingScreen';
import PreviewScreen from './components/PreviewScreen';
import { MantineProvider, Container, Title, Text, Paper, createTheme } from '@mantine/core';
import classes from './App.module.css';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'violet',
  headings: {
    fontFamily: 'Greycliff CF, sans-serif',
  },
});

function App() {
  const [files, setFiles] = useState<GeneratedFiles | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFiles(null);
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background: linear-gradient(145deg, #1A1B1E, #2C2E33);
            }
          `,
        }}
      />
      <Container size="lg" py="xl">
        <header className={classes.header}>
          <Title order={1} className={classes.title}>
            CvGrow
          </Title>
          <Text size="xl" c="dimmed" mt="sm">
            Write less, Apply more
          </Text>
        </header>

        <Paper shadow="xl" p="xl" radius="lg" className={classes.paper}>
          {!files && !loading && <ResumeForm setFiles={setFiles} setLoading={setLoading} />}
          {loading && <LoadingScreen />}
          {files && !loading && <PreviewScreen files={files} onReset={handleReset} />}
        </Paper>
      </Container>
    </MantineProvider>
  );
}

export default App;
