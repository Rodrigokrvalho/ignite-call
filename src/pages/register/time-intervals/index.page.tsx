import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { FormErrors, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from "./styles";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertTimeStringInMinutes } from "@/utils/conver-time-string-to-minutes";
import { api } from "@/lib/axios";
import { useRouter } from "next/dist/client/router";

const timeIntervalsFormSchema = z.object({
  intervals: z.array(
    z.object({
      weekday: z.number().min(0).max(6),
      enabled: z.boolean(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ).length(7)
    .transform(intervals => intervals.filter(interval => interval.enabled))
    .refine(intervals => intervals.length > 0,
      { message: 'Você precisa selecionar pelo menos um dia da semana' })
    .transform(intervals => intervals.map(
      interval => {
        return {
          weekDay: interval.weekday,
          startTimeInMinutes: convertTimeStringInMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringInMinutes(interval.endTime),
        };
      }))
    .refine(intervals => {
      return intervals.every(interval => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes);
    }, { message: 'O horário de término deve ser pelo menos 1 hora distante do início' })
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<TimeIntervalsFormInput, any, TimeIntervalsFormOutput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekday: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ]
    }
  });

  const router = useRouter();

  const { fields } = useFieldArray({
    name: 'intervals',
    control: control
  });

  const weekDays = getWeekDays();

  const intervals = watch('intervals');

  async function handleSetTimeintervals({ intervals }: TimeIntervalsFormOutput) {
    await api.post('/users/time-intervals', { intervals });

    await router.push('/register/update-profile');
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá...</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeintervals)}>
        <IntervalContainer>
          {fields.map((interval) => (
            <IntervalItem key={interval.id}>
              <IntervalDay>
                <Controller
                  name={`intervals.${interval.weekday}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      checked={field.value}
                    />
                  )}
                />

                <Text>{weekDays[interval.weekday]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[interval.weekday].enabled === false}
                  {...register(`intervals.${interval.weekday}.startTime`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  disabled={intervals[interval.weekday].enabled === false}
                  {...register(`intervals.${interval.weekday}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>))}
        </IntervalContainer>
        {errors.intervals && (
          <FormErrors>
            {errors.intervals.message}
          </FormErrors>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Proximo passo
          <ArrowRight />
        </Button>

      </IntervalBox>
    </Container>
  );
}