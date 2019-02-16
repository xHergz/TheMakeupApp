import PAGES from './Pages';

export function GetProfileUrl(displayName) {
    return PAGES.CLIENT_PROFILE.LINK.replace(':displayName', displayName);
}

export function GetPortfolioUrl(displayName) {
    return PAGES.ARTIST_PORTFOLIO.LINK.replace(':displayName', displayName);
}

export function GetAccountUrl(displayName) {
    return PAGES.ACCOUNT.LINK.replace(':displayName', displayName);
}
