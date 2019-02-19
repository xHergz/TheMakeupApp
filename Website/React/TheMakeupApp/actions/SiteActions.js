import { setCurrentPageKey } from '../reducers/SiteReducer';

export default function setCurrentPage(pageKey) {
    return (dispatch) => {
        dispatch(setCurrentPageKey(pageKey));
    };
}
