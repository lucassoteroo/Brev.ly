
import { useState } from "react";
import { CreateLinkButton } from "./create-link-button";
import { CreateLinkHeader } from "./create-link-header";
import { CreateOriginalLink } from "./create-original-link";
import { CreateShortLink } from "./create-short-link";

export function CreateLink() {
    const [originalLink, setOriginalLink] = useState("");
    const [shortLink, setShortLink] = useState("");
    const [originalLinkError, setOriginalLinkError] = useState("");
    const [shortLinkError, setShortLinkError] = useState("");

    const handleCreate = () => {
        let hasError = false;
        if (!originalLink) {
            setOriginalLinkError("Preencha o link original.");
            hasError = true;
        } else {
            setOriginalLinkError("");
        }
        if (!shortLink) {
            setShortLinkError("Preencha o link encurtado.");
            hasError = true;
        } else {
            setShortLinkError("");
        }
        if (hasError) return;
        // Aqui você pode adicionar a lógica de criação do link
        alert("Link criado com sucesso!");
    };

    return (
        <div className="max-w-91.5 lg:max-w-95 w-full flex flex-col bg-gray-100 rounded-lg p-6 gap-5">
            <CreateLinkHeader />

            <div className="flex flex-col gap-4">
                <CreateOriginalLink value={originalLink} onChange={setOriginalLink} error={originalLinkError} />
                <CreateShortLink value={shortLink} onChange={setShortLink} error={shortLinkError} />
                <CreateLinkButton onClick={handleCreate} />
            </div>
        </div>
    );
}