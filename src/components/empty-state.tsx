import { CreateLink } from "./create-link";
import { LogoApp } from "./logo-app";
import { MyLink } from "./my-link";

export function EmptyState() {
    return (
        <div>
            <div className="self-center lg:self-start">
            <LogoApp></LogoApp>
            </div>
            
            <div className="lg:w-dvh flex flex-col lg:flex-row gap-5">
            <CreateLink></CreateLink>
            <MyLink></MyLink>
            </div>
        </div>
    )
}