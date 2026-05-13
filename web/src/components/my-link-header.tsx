import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";
import type { LinkData } from "./empty-state";

interface Props {
    links: LinkData[];
    onExport: () => void;
}

export function MyLinkHeader({ links, onExport }: Props) {
    return (
        <div className="flex flex-row justify-between">
            <h1 className="font-bold text-[18px] text-gray-600">Meus Links</h1>
            <Button className="flex flex-row gap-1 items-center" disabled={!links || links.length === 0} onClick={() => onExport()}>
                <DownloadSimpleIcon size={16} className="text-gray-500" />
                <span className="font-semibold text-xs text-gray-500">Baixar CSV</span>
            </Button>
        </div>
    )
}

