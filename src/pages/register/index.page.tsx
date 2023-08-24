import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface Props {

}

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, "O Usuário deve ter no mínimo 3 caracteres")
    .regex(/^[a-z\\-]+$/i, "O Usuário deve ter apenas letras e hifens")
    .transform(value => value.toLowerCase()),
  name: z
    .string()
    .min(3, "O Nome deve ter no mínimo 3 caracteres"),

});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register({}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query?.username) {
      setValue("username", router.query.username.toString());
    }
  }
    , [router.query?.username, setValue]);

  async function handleRegisterUser({ name, username }: RegisterFormData) {
    try {
      await api.post("/users", {
        name,
        username
      });

      await router.push("/register/connect-calendar");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data.message) {
        alert(err.response.data.message);
        return;
      }

      console.error(err);
    }
  }

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

      <Form as="form" onSubmit={handleSubmit(handleRegisterUser)}>
        <label>
          <Text size="sm">Usuário</Text>
          <TextInput prefix="ignite.com/" placeholder="seu-usuário"{...register("username")} />
          {errors.username && (<FormError size="sm">{errors.username.message}</FormError>)}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")} />
          {errors.name && (<FormError size="sm">{errors.name.message}</FormError>)}
        </label>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>

  );
}