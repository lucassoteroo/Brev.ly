import { CreateLinkButton } from "./create-link-button";
import { CreateLinkHeader } from "./create-link-header";
import { CreateOriginalLink } from "./create-original-link";
import { CreateShortLink } from "./create-short-link";

export function CreateLink() {
    return (
        <div className="max-w-91.5 lg:max-w-95 w-full flex flex-col bg-gray-100 rounded-lg p-6 gap-5">
            <CreateLinkHeader></CreateLinkHeader>

            <div className="flex flex-col gap-4">
                <CreateOriginalLink></CreateOriginalLink>
                <CreateShortLink></CreateShortLink>
                <CreateLinkButton></CreateLinkButton>
            </div>
        </div>
    )
}