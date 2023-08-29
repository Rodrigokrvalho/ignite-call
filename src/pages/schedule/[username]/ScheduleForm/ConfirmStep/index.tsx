import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const confirmFormSchema = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres"),
  email: z.string().email('Digite um e-mail válido'),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data);
  }



  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          data
        </Text>
        <Text>
          <Clock />
          18:00
        </Text>

        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")} />
          {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
        </label>

        <label>
          <Text size="sm">Endereço de e-mail</Text>
          <TextInput placeholder="johndue@gmail.com" {...register("email")} />
          {errors.email && <FormError size="sm">{errors.email.message}</FormError>}
        </label>

        <label>
          <Text size="sm">Observações</Text>
          <TextArea {...register("observations")} />
        </label>

        <FormActions>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => {}}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Confirmar
          </Button>
        </FormActions>
      </FormHeader>
    </ConfirmForm>
  );
}