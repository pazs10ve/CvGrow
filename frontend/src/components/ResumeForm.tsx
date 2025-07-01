import { useState } from 'react';
import type { GeneratedFiles, ResumeFormData } from '../types';
import { generateResume } from '../services/api';
import { useForm } from '@mantine/form';
import { Stepper, Button, Group, TextInput, Textarea, Box, Grid, ActionIcon } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

interface ResumeFormProps {
  setLoading: (loading: boolean) => void;
  setFiles: (files: GeneratedFiles | null) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ setLoading, setFiles }) => {
  const [active, setActive] = useState(0);

  const form = useForm<Omit<ResumeFormData, 'technical_skills' | 'soft_skills'> & { technical_skills: string; soft_skills: string; }>({ 
    initialValues: {
      full_name: '',
      email: '',
      phone_number: '',
      address: '',
      linkedin_url: '',
      github_url: '',
      job_title: '',
      passion_statement: '',
      education: [{ university_name: '', degree: '', graduation_date: '' }],
      experience: [{ company_name: '', job_title: '', experience_description: '', experience_responsibilities: '' }],
      projects: [{ project_name: '', project_description: '' }],
      technical_skills: '',
      soft_skills: '',
    },
  });

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const submissionData = {
        ...values,
        technical_skills: values.technical_skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        soft_skills: values.soft_skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      };
      const response = await generateResume(submissionData as unknown as ResumeFormData);
      setFiles(response);
    } catch (error) {
      console.error('Failed to generate resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const educationFields = form.values.education.map((_, index) => (
    <Box key={index} mt="md" p="md" style={(theme: MantineTheme) => ({ backgroundColor: theme.colors.dark[6], borderRadius: theme.radius.sm })}>
      <Grid>
        <Grid.Col span={11}>
          <TextInput label="University" placeholder="MIT" {...form.getInputProps(`education.${index}.university_name`)} />
          <TextInput mt="sm" label="Degree" placeholder="B.S. Computer Science" {...form.getInputProps(`education.${index}.degree`)} />
          <TextInput mt="sm" label="Graduation Date" placeholder="May 2024" {...form.getInputProps(`education.${index}.graduation_date`)} />
        </Grid.Col>
        <Grid.Col span={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ActionIcon color="red" onClick={() => form.removeListItem('education', index)}><IconTrash size={16} /></ActionIcon>
        </Grid.Col>
      </Grid>
    </Box>
  ));

  const experienceFields = form.values.experience.map((_, index) => (
    <Box key={index} mt="md" p="md" style={(theme: MantineTheme) => ({ backgroundColor: theme.colors.dark[6], borderRadius: theme.radius.sm })}>
      <Grid>
        <Grid.Col span={11}>
            <TextInput label="Company Name" placeholder="Google" {...form.getInputProps(`experience.${index}.company_name`)} />
            <TextInput mt="sm" label="Job Title" placeholder="Software Engineer" {...form.getInputProps(`experience.${index}.job_title`)} />
            <Textarea mt="sm" label="Description" placeholder="Worked on..." {...form.getInputProps(`experience.${index}.experience_description`)} />
            <Textarea mt="sm" label="Responsibilities" placeholder="My responsibilities included..." {...form.getInputProps(`experience.${index}.experience_responsibilities`)} />
        </Grid.Col>
        <Grid.Col span={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ActionIcon color="red" onClick={() => form.removeListItem('experience', index)}><IconTrash size={16} /></ActionIcon>
        </Grid.Col>
      </Grid>
    </Box>
  ));

  const projectFields = form.values.projects.map((_, index) => (
    <Box key={index} mt="md" p="md" style={(theme: MantineTheme) => ({ backgroundColor: theme.colors.dark[6], borderRadius: theme.radius.sm })}>
        <Grid>
            <Grid.Col span={11}>
                <TextInput label="Project Name" placeholder="My Awesome App" {...form.getInputProps(`projects.${index}.project_name`)} />
                <Textarea mt="sm" label="Description" placeholder="This project does..." {...form.getInputProps(`projects.${index}.project_description`)} />
            </Grid.Col>
            <Grid.Col span={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ActionIcon color="red" onClick={() => form.removeListItem('projects', index)}><IconTrash size={16} /></ActionIcon>
            </Grid.Col>
        </Grid>
    </Box>
  ));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stepper active={active} onStepClick={setActive} styles={{ stepLabel: { whiteSpace: 'nowrap' } }}>
        <Stepper.Step label="Personal" description="Contact info">
          <TextInput label="Full Name" placeholder="Your full name" {...form.getInputProps('full_name')} />
          <TextInput mt="md" label="Email" placeholder="Your email" {...form.getInputProps('email')} />
          <TextInput mt="md" label="Phone Number" placeholder="Your phone number" {...form.getInputProps('phone_number')} />
          <TextInput mt="md" label="Address" placeholder="City, State" {...form.getInputProps('address')} />
          <TextInput mt="md" label="LinkedIn URL" placeholder="Your LinkedIn profile" {...form.getInputProps('linkedin_url')} />
          <TextInput mt="md" label="GitHub URL" placeholder="Your GitHub profile" {...form.getInputProps('github_url')} />
        </Stepper.Step>
        <Stepper.Step label="Education" description="Your background">
          {educationFields}
          <Group justify="center" mt="md">
            <Button leftSection={<IconPlus size={14} />} variant="subtle" onClick={() => form.insertListItem('education', { university_name: '', degree: '', graduation_date: '' })}>
              Add Education
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="Experience" description="Work history">
          {experienceFields}
          <Group justify="center" mt="md">
            <Button leftSection={<IconPlus size={14} />} variant="subtle" onClick={() => form.insertListItem('experience', { company_name: '', job_title: '', experience_description: '', experience_responsibilities: '' })}>
              Add Experience
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="Projects" description="Your work">
            {projectFields}
            <Group justify="center" mt="md">
                <Button leftSection={<IconPlus size={14} />} variant="subtle" onClick={() => form.insertListItem('projects', { project_name: '', project_description: '' })}>
                    Add Project
                </Button>
            </Group>
        </Stepper.Step>
        <Stepper.Step label="Skills & Goal" description="Final touches">
            <TextInput label="Target Job Title" placeholder="e.g., Software Engineer" {...form.getInputProps('job_title')} />
            <Textarea mt="md" label="Passion Statement / Objective" placeholder="A brief summary of your career goals" {...form.getInputProps('passion_statement')} minRows={3} />
            <TextInput mt="md" label="Technical Skills" placeholder="Comma-separated, e.g., React, Python" {...form.getInputProps('technical_skills')} />
            <TextInput mt="md" label="Soft Skills" placeholder="Comma-separated, e.g., Teamwork, Communication" {...form.getInputProps('soft_skills')} />
        </Stepper.Step>
      </Stepper>

      <Group justify="center" mt="xl">
        {active !== 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
        {active !== 4 && <Button onClick={nextStep}>Next step</Button>}
        {active === 4 && <Button type="submit" size="lg" color="violet">Generate Resume</Button>}
      </Group>
    </form>
  );
};

export default ResumeForm;
