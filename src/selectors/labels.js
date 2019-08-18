export default (labels,{group_id}) => {
    return labels.filter(label => {
      return label.groupId === group_id;
    });
};