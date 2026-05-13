
import { useState } from "react";
import { CreateLinkButton } from "./create-link-button";
import { CreateLinkHeader } from "./create-link-header";
import { CreateOriginalLink } from "./create-original-link";
import { CreateShortLink } from "./create-short-link";
import type { LinkData } from "./empty-state";

interface Props {
    onCreate: (link: Omit<LinkData, "views">) => void;
    loading?: boolean;
}

export function CreateLink({ onCreate, loading }: Props) {
    const [originalLink, setOriginalLink] = useState("");
    const [shortLink, setShortLink] = useState("");
    const [originalLinkError, setOriginalLinkError] = useState("");
    const [shortLinkError, setShortLinkError] = useState("");

    const handleCreate = () => {
        let hasError = false;
        if (!originalLink) {
            setOriginalLinkError("Informe uma url válida.");
            hasError = true;
        } else {
            setOriginalLinkError("");
        }
        if (!shortLink) {
            setShortLinkError("Informe uma url minúscula e sem espaço/caracter especial.");
            hasError = true;
        } else {
            setShortLinkError("");
        }
        if (hasError) return;
        onCreate({ short: shortLink, original: originalLink });
        setOriginalLink("");
        setShortLink("");
    };

    return (
        <div className="max-w-91.5 lg:max-w-95 w-full flex flex-col bg-gray-100 rounded-lg p-6 gap-5">
            <CreateLinkHeader />

            <div className="flex flex-col gap-4">
                <CreateOriginalLink value={originalLink} onChange={setOriginalLink} error={originalLinkError} disabled={loading} />
                <CreateShortLink value={shortLink} onChange={setShortLink} error={shortLinkError} disabled={loading} />
                <CreateLinkButton onClick={handleCreate} disabled={loading} />
            </div>
        </div>
    );
}