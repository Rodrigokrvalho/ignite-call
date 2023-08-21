import { Heading, Text } from '@ignite-ui/react';
import previewImage from '../../assets/calendar.png';
import Image from 'next/image';
import { Container, Hero, Preview } from './styles';
import { ClaimUsernameForm } from './components/ClaimUsernameForm';

export default function Index() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl" as="h1">
          Agendamento descomplicado
        </Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image src={previewImage} alt="Agendamento" height={400} quality={100} priority />
      </Preview>
    </Container>
  );
}
