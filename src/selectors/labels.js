export default (labels,{groupSlug}) => {
    return labels.filter(label => {
      return label.groupSlug === groupSlug;
    });
};