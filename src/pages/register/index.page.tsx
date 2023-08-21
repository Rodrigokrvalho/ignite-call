import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, Header } from "./styles";
import { ArrowRight } from "phosphor-react";

interface Props {

}

export default function Register({}: Props) {

  return (
    <Container>
      <Header>
        <Heading as="strong">
          Bem-vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep currentStep={1} size={4} />
      </Header>

      <Form as="form">
        <label>
          <Text size="sm">Usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuário" />"
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" />"
        </label>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>

  );
}