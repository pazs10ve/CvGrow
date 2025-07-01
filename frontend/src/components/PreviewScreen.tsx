import type { GeneratedFiles } from '../types';

import { Title, Text, Button, Group, Center } from '@mantine/core';

interface PreviewScreenProps {
  files: GeneratedFiles;
  onReset: () => void;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ files, onReset }) => {
  const downloadFile = (base64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${base64}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Center style={{ height: 400, flexDirection: 'column', textAlign: 'center' }}>
      <Title order={2}>Your Resume is Ready!</Title>
      <Text c="dimmed" mt="sm" mb="xl">
        Download your professionally crafted resume in your preferred format.
      </Text>
      <Group>
        <Button onClick={() => downloadFile(files.pdf, 'resume.pdf')} size="lg">
          Download PDF
        </Button>
        <Button onClick={() => downloadFile(files.docx, 'resume.docx')} variant="outline" size="lg">
          Download DOCX
        </Button>
        <Button onClick={() => downloadFile(files.tex, 'resume.tex')} variant="outline" size="lg">
          Download LaTeX
        </Button>
      </Group>
      <Button onClick={onReset} variant="subtle" mt="xl">
        Create a new resume
      </Button>
    </Center>
  );
};

export default PreviewScreen;
