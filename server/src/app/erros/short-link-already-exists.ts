export class ShortLinkAlreadyExists extends Error {
    constructor(shortLink: string) {
        super(`Short link '${shortLink}' already exists.`)
    }
}
