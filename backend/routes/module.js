function emp(data){
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.DOB = data.DOB;
    this.Salary = data.Salary;
    this.Position = data.Position;
    this.Email = data.Email;
    this.Manager = data.Manager;
  }
  
  // Function to generate a tree structure from the sorted data
  const makeTree = (data) => {
  // Preprocess the data to create a map of parent IDs to children
  const parentChildrenMap = data.reduce((map, item) => {
    const manager = item.Manager;
    if (!map[manager]) {
      map[manager] = [];
    }
    const temp = new emp(item);
    map[manager].push(temp);
    return map;
  }, {});
  
    // Function to convert linear data to nested structure
    const convertToNested = (parentChildrenMap, manager = null) => {
      const children = parentChildrenMap[manager] || [];
      const nested = children.map(child => {
        const nestedChildren = convertToNested(parentChildrenMap, child.id);
        if (nestedChildren.length > 0) {
          child.children = nestedChildren;
        }
        return child;
      });
      return nested;
    };
  
    return convertToNested(parentChildrenMap, null);
  };

  module.exports = makeTree;