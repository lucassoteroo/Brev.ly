import { MyLinkHeader } from "./my-link-header";
import { MyLinkList } from "./my-link-list";
import type { LinkData } from "./empty-state";

interface Props {
    links: LinkData[];
    onDelete: (short: string) => void;
    onCopy: (short: string) => void;
}

export function MyLink({ links, onDelete, onCopy }: Props) {
    return (
        <div className="max-w-91.5 lg:max-w-145 w-full flex flex-col bg-gray-100 rounded-lg p-6 gap-5">
            <MyLinkHeader links={links} />
            <MyLinkList links={links} onDelete={onDelete} onCopy={onCopy} />
        </div>
    );
}