import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";



const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .regex(/^([a-z\\-]+)$/i, "Usuário deve conter apenas letras e hífens")
    .transform(value => value.toLowerCase())

});

type ClaimUsernameFormInputs = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUsernameFormInputs>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormInputs) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>

        <TextInput size="sm" prefix="ignite.com/" placeholder="seu usuário" {...register('username')} />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar usuário
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm" as="span">
          {errors.username ? errors.username.message : 'Digite seu usuário'}
        </Text>
      </FormAnnotation>
    </>
  );
}
