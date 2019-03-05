import PAGES from './Pages';

export function GetProfileUrl(displayName) {
    return PAGES.CLIENT_PROFILE.LINK.replace(':displayName', displayName);
}

export function GetProfilePageKey(displayName) {
    return `${PAGES.CLIENT_PROFILE.KEY}/${displayName}`;
}

export function GetPortfolioUrl(displayName) {
    return PAGES.ARTIST_PORTFOLIO.LINK.replace(':displayName', displayName);
}

export function GetPortfolioPageKey(displayName) {
    return `${PAGES.ARTIST_PORTFOLIO.KEY}/${displayName}`;
}

export function GetAccountPageKey(displayName) {
    return `${PAGES.ACCOUNT.KEY}/${displayName}`;
}
