import type { GeneratedFiles } from '../types';
import { Grid, Paper, Title, Text, Button, Stack } from '@mantine/core';
import classes from './PreviewScreen.module.css';

interface PreviewScreenProps {
  files: GeneratedFiles;
  onReset: () => void;
}

const PreviewScreen: React.FC<PreviewScreenProps> = ({ files, onReset }) => {
  const handleDownload = (file: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${file}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pdfDataUri = `data:application/pdf;base64,${files.pdf}#view=FitV`;

  return (
    <Grid gutter="xl" className={classes.grid}>
      <Grid.Col span={8}>
        <Paper withBorder radius="md" className={classes.pdfPreview}>
          <object data={pdfDataUri} type="application/pdf" width="100%" height="100%">
            <p>
              Your browser does not support PDFs. <a href={pdfDataUri} download="resume.pdf">Download the PDF</a>.
            </p>
          </object>
        </Paper>
      </Grid.Col>
      <Grid.Col span={4}>
        <div className={classes.controls}>
          <div>
            <Title order={2}>Your Resume is Ready</Title>
            <Text c="dimmed" mb="xl">
              Download your resume.
            </Text>
            <Stack>
              <Button onClick={() => handleDownload(files.pdf, 'resume.pdf')} size="lg" fullWidth>
                Download PDF
              </Button>
              <Button onClick={() => handleDownload(files.docx, 'resume.docx')} size="lg" fullWidth>
                Download DOCX
              </Button>
              <Button onClick={() => handleDownload(files.tex, 'resume.tex')} size="lg" fullWidth>
                Download LaTeX
              </Button>
            </Stack>
          </div>
          <Button onClick={onReset} variant="light" color="red" size="lg" fullWidth>
            Start Over
          </Button>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default PreviewScreen;
