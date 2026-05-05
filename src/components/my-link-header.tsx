import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "primereact/button";

export function MyLinkHeader() {
    return (
        <div className="flex flex-row justify-between">
            <h1 className="font-bold text-[18px] text-gray-600">Meus Links</h1>

            <Button className="flex flex-row gap-1 items-center">
                <DownloadSimpleIcon size={16} className="text-gray-500" />
                <span className="font-semibold text-xs text-gray-500">Baixar CSV</span>
            </Button>
        </div>
    )
}

