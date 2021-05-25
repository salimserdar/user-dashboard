import _ from "lodash";

export const sortBy = (term: string, users: any[]) => {
    const sorted = _.sortBy(users, [function(o) { return o[term]; }]);

    return sorted;
}