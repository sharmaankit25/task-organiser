export default (groups,{slug}) => {
    return groups.filter(group => {
      return group.slug === slug;
    })[0];
};