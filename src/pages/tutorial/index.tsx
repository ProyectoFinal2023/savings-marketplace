import { type NextPage } from "next";
import { Layout } from "~/components/Layout/Layout";
import { useRegister } from "~/hooks/useRegister";
import { InputText } from "primereact/inputtext";

const TutorialPage: NextPage = () => {
  const {
    form: { register },
    guarantors,
  } = useRegister();

  return (
    <Layout classname="px-12">
      <main className="flex flex-col items-stretch justify-start gap-4 md:max-w-md">
        <header></header>
        <div className="flex gap-4">
          <div className="flex w-full flex-col items-stretch gap-2">
            <label htmlFor="name">Nombre</label>
            <InputText {...register("name")} placeholder="Jorge" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="surname">Apellido</label>
            <InputText {...register("name")} placeholder="Pérez" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dni">DNI</label>
          <InputText {...register("dni")} placeholder="99999999" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">N. de Celular</label>
          <InputText {...register("phone")} placeholder="+54 9 11 1234-5678" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <InputText {...register("email")} placeholder="ejemplo@gmail.com" />
        </div>
        <h1>Garante(s)</h1>
        {guarantors.fields.map((g, index) => (
          <div key={g.id} className="relative">
            <button
              className="absolute right-4 top-4"
              onClick={() => guarantors.remove(index)}
            >
              <i className="pi pi-times" />
            </button>
            <div className="flex flex-col gap-4 rounded-md border p-4">
              <div className="flex gap-4">
                <div className="flex w-full flex-col items-stretch gap-2">
                  <label htmlFor={`guarantors.${index}.name`}>Nombre</label>
                  <InputText
                    {...register(`guarantors.${index}.name`)}
                    placeholder="Jorge"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor={`guarantors.${index}.name`}>Apellido</label>
                  <InputText
                    {...register(`guarantors.${index}.surname`)}
                    placeholder="Pérez"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`guarantors.${index}.dni`}>DNI</label>
                <InputText
                  {...register(`guarantors.${index}.dni`)}
                  placeholder="99999999"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`guarantors.${index}.phone`}>
                  N. de Celular
                </label>
                <InputText
                  {...register(`guarantors.${index}.phone`)}
                  placeholder="+54 9 11 1234-5678"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`guarantors.${index}.email`}>Email</label>
                <InputText
                  {...register(`guarantors.${index}.email`)}
                  placeholder="ejemplo@gmail.com"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          className="mx-auto max-w-[50%] grow-0 rounded-md bg-green-300 px-4 py-2"
          onClick={() =>
            guarantors.append({
              name: "",
              surname: "",
              dni: "",
              phone: "",
              email: "",
            })
          }
        >
          Agregar un garante
        </button>
      </main>
    </Layout>
  );
};

export default TutorialPage;
