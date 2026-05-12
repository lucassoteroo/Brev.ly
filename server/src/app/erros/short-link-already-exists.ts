export class ShortLinkAlreadyExists extends Error {
    constructor() {
        super(`Short link already exists.`)
    }
}
