import { Loader, Title, Text, Center } from '@mantine/core';

const LoadingScreen = () => {
  return (
    <Center style={{ height: 400, flexDirection: 'column' }}>
      <Loader size="xl" variant="bars" />
      <Title order={3} mt="xl">
        Generating Your Resume...
      </Title>
      <Text mt="sm" c="dimmed">
        Our AI is working its magic. Please wait a moment.
      </Text>
    </Center>
  );
};

export default LoadingScreen;
