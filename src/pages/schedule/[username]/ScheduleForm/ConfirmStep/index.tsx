import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from 'next/router';

const confirmFormSchema = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 3 caracteres"),
  email: z.string().email('Digite um e-mail válido'),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep({ onCancelConfirmation, schedulingDate }: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmScheduling({ email, name, observations }: ConfirmFormData) {
    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate
    });

    onCancelConfirmation();
  }

  const dateWithTime = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY');
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]');

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {dateWithTime}
        </Text>
        <Text>
          <Clock />
          {describedTime}
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
            onClick={onCancelConfirmation}
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