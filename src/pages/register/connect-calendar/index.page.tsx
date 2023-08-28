import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { signIn } from 'next-auth/react';
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {

}


export default function Register({}: Props) {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === 'authenticated';

  async function handleConnectCalendar() {
    await signIn('google');
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">
          Conecte sua agenda!
        </Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep currentStep={2} size={4} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>
            Google Agenda
          </Text>
          {
            isSignedIn
              ? (
                <Button size="sm" disabled>
                  Connectado
                  <Check />
                </Button>
              )
              : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleConnectCalendar}
                >
                  Conectar
                  <ArrowRight />
                </Button>
              )
          }
        </ConnectItem>

        {hasAuthError && <AuthError>
          Falha ao se conectar ao Google, verifique se você deu as permissões de acesso ao Google Calendar.
        </AuthError>}

        <Button onClick={() => router.push('/register/time-intervals')} disabled={!isSignedIn}>
          Proximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>

    </Container >

  );
}