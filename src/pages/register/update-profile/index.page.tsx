import { Avatar, Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

interface Props {

}

const updateProfileFormSchema = z.object({
  bio: z.string(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfile({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  });

  const session = useSession();
  const router = useRouter();



  async function handleUpdateProfile({ bio }: UpdateProfileFormData) {
    await api.put("/users/profile", { bio });

    await router.push(`/schedule/${session.data?.user?.username}`);
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
        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de perfil</Text>
          <Avatar src={session.data?.user?.avatar_url} alt={session.data?.user?.name} />
        </label>
        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>

  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session
    }
  };

};