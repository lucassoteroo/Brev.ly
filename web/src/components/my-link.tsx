import { MyLinkHeader } from "./my-link-header";
import { MyLinkList } from "./my-link-list";
import type { LinkData } from "./empty-state";

interface Props {
    links: LinkData[];
    isLoading: boolean;
    onDelete: (short: string) => void;
    onCopy: (short: string) => void;
    onAccess: (short: string) => void;
    onExport: () => void;
}

export function MyLink({ links, onDelete, onCopy, onAccess, onExport, isLoading }: Props) {
    return (
        <div className="relative max-w-91.5 max-h-88.25 lg:max-w-145 w-full flex flex-col bg-gray-100 rounded-lg p-6 gap-5 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden rounded-t-lg">
                    <div className="loading-bar h-full bg-[#2C46B1] animate-loading-bar" />
                </div>
            )}
            <MyLinkHeader links={links} onExport={onExport} />
            <MyLinkList links={links} onDelete={onDelete} onCopy={onCopy} onAccess={onAccess} isLoading={isLoading} />
        </div>
    );
}