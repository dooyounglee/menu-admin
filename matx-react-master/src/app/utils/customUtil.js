export const menuToTree = (e) => {
  let obj = {};
  e.sort((a, b) => a.order - b.order);
  let arr1 = e.map((x) => ({ ...x, arrOrder: findParent(x) }));
  arr1.sort((a, b) =>
    a.arrOrder < b.arrOrder ? -1 : a.arrOrder > b.arrOrder ? 1 : 0
  );

  function findParent(x) {
    if (!!obj[x.id]) return obj[x.id];
    let str = "" + x.order + x.id;
    if (x.parentId === null) {
      obj[x.id] = str;
      return str;
    }
    let ex = e.findIndex((o) => o.id === x.parentId);
    if (ex === -1) {
      obj[x.id] = str;
      return str;
    }
    obj[x.id] = findParent(e[ex]) + str;
    return findParent(e[ex]) + str;
  }

  return arr1;
};

export const strfor = (n, str) => {
  return n <= 0 ? "" : Array(n).fill(str).join("");
};
