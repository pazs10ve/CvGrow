import { useState } from 'react';
import type { GeneratedFiles } from './types';
import ResumeForm from './components/ResumeForm';
import LoadingScreen from './components/LoadingScreen';
import PreviewScreen from './components/PreviewScreen';
import { MantineProvider, Container, Title, Text, Paper, createTheme } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

function App() {
  const [files, setFiles] = useState<GeneratedFiles | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setFiles(null);
  };

  const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    primaryColor: 'violet',
    headings: {
      fontFamily: 'Greycliff CF, sans-serif',
    },
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Container size="lg" py="xl">
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title order={1} style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-1px' }}>
            CvGrow
          </Title>
          <Text size="xl" c="dimmed" mt="sm">
          Write less, Apply more
          </Text>
        </header>

        <Paper 
          shadow="xl" 
          p="xl" 
          radius="lg"
          style={(theme: MantineTheme) => ({
            backgroundColor: 'rgba(37, 38, 43, 0.7)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.colors.dark[4]}`,
          })}
        >
          {!files && !loading && <ResumeForm setFiles={setFiles} setLoading={setLoading} />}
          {loading && <LoadingScreen />}
          {files && !loading && <PreviewScreen files={files} onReset={handleReset} />}
        </Paper>
      </Container>
    </MantineProvider>
  );
}

export default App;
