import { CreateLink } from "./components/create-link";
import { LogoApp } from "./components/logo-app";
import { MyLink } from "./components/my-link";

export function App() {
  return (
    <main className="lg:max-w-342 lg:place-self-center h-dvh flex flex-col justify-center p-10">
      <div className="self-center lg:self-start">
        <LogoApp></LogoApp>
      </div>
      
      <div className="lg:w-dvh lg:flex lg:flex-row">
        <CreateLink></CreateLink>
        <MyLink></MyLink>
      </div>
    </main>
  )
}