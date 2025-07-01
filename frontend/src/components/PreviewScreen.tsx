import type { GeneratedFiles } from '../types';

import { Title, Text, Button, Group, Grid, Paper } from '@mantine/core';

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

    const pdfDataUri = `data:application/pdf;base64,${files.pdf}`;

  return (
    <Grid gutter="xl" style={{ width: '100%', height: 'calc(100vh - 160px)' }}>
      <Grid.Col span={8}>
        <Paper withBorder radius="md" style={{ height: '100%', overflow: 'hidden' }}>
          <object data={pdfDataUri} type="application/pdf" width="100%" height="100%">
            <p>Your browser does not support PDFs. <a href={pdfDataUri} download="resume.pdf">Download the PDF</a>.</p>
          </object>
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Title order={2}>Your Resume is Ready!</Title>
          <Text c="dimmed" mt="sm" mb="xl">
            Download your professionally crafted resume in your preferred format or start over.
          </Text>
          <Group style={{ flexDirection: 'column' }}>
            <Button onClick={() => downloadFile(files.pdf, 'resume.pdf')} size="lg" fullWidth>
              Download PDF
            </Button>
            <Button onClick={() => downloadFile(files.docx, 'resume.docx')} variant="outline" size="lg" fullWidth>
              Download DOCX
            </Button>
            <Button onClick={() => downloadFile(files.tex, 'resume.tex')} variant="outline" size="lg" fullWidth>
              Download LaTeX
            </Button>
          </Group>
          <Button onClick={onReset} variant="subtle" mt="xl" fullWidth>
            Create a new resume
          </Button>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default PreviewScreen;
