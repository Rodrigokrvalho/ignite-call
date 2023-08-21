import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {

}

const claimUsernameFormSchema = z.object({
  username: z.string()
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .regex(/^([a-z\\-]+)$/i, "Usuário deve conter apenas letras e hífens")
    .transform(value => value.toLowerCase())

});

type ClaimUsernameFormInputs = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm({}: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<ClaimUsernameFormInputs>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormInputs) {
    console.log(data);
  }

  return (<>
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>

      <TextInput size="sm" prefix="ignite.com/" placeholder="seu usuário" {...register('username')} />
      <Button size="sm" type="submit">
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