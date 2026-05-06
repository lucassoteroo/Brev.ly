import { useState } from "react";
import { CreateLink } from "./create-link";
import { LogoApp } from "./logo-app";
import { MyLink } from "./my-link";

export interface LinkData {
    short: string;
    original: string;
    views: number;
}

export function EmptyState() {
    const [links, setLinks] = useState<LinkData[]>([]);

    const addLink = (link: Omit<LinkData, "views">) => {
        setLinks(prev => [
            { ...link, views: 0 },
            ...prev
        ]);
    };

    return (
        <div>
            <div className="self-center lg:self-start">
                <LogoApp />
            </div>
            <div className="lg:w-dvh flex flex-col lg:flex-row gap-5">
                <CreateLink onCreate={addLink} />
                <MyLink links={links} />
            </div>
        </div>
    );
}